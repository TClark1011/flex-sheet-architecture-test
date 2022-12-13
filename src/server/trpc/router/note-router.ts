import {
	protectedProcedure,
	publicProcedure,
	router,
} from "@/server/trpc/trpc";
import type { FullNote } from "@/types/extra-entity-types";
import type { ContentPermission } from "@/types/utility-types";
import type { Note, Tag } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const throwIfUserCanNotEditNote = (note: Note, userId: string | undefined) => {
	if (note.authorUserId !== userId) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not authorized to edit this note",
		});
	}
};

type GetNoteResult = {
	permission: ContentPermission;
	note: FullNote;
};

// Just the props we when we show the list  of notes

export const noteRouter = router({
	getCurrentUserNotes: protectedProcedure.query(
		({ ctx }): Promise<Omit<FullNote, "author">[]> =>
			ctx.prisma.note.findMany({
				where: {
					authorUserId: ctx.session.user.id,
				},
				include: {
					tags: true,
				},
			})
	),
	getNote: publicProcedure
		.input(z.object({ noteId: z.string() }))
		.query(async ({ ctx, input }): Promise<GetNoteResult> => {
			const note = await ctx.prisma.note.findUniqueOrThrow({
				where: {
					id: input.noteId,
				},
				include: {
					author: true,
					tags: true,
				},
			});

			const userIsAuthor = note.authorUserId === ctx.session?.user?.id;

			const userIsAllowedToView = note.public || userIsAuthor;

			if (!userIsAllowedToView) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to view this note",
				});
			}

			return {
				permission: userIsAuthor ? "edit" : "view",
				note,
			};
		}),
	createNewNote: publicProcedure.mutation(
		({ ctx }): Promise<Note> =>
			ctx.prisma.note.create({
				data: {
					title: "New Note",
					content: "New Note Content",
					public: false,
					authorUserId: ctx.session?.user?.id,
				},
			})
	),
	deleteNote: protectedProcedure
		.input(z.object({ noteId: z.string() }))
		.mutation(async ({ ctx, input }): Promise<Note> => {
			const note = await ctx.prisma.note.findFirstOrThrow({
				where: {
					id: input.noteId,
					authorUserId: ctx.session.user.id,
				},
			});
			// Will throw an error if user is not the author
			// of the target note

			return ctx.prisma.note.delete({
				where: {
					id: note.id,
				},
			});
		}),
	saveNote: publicProcedure
		.input(
			z.object({
				noteId: z.string(),
				data: z
					.object({
						content: z.string(),
						title: z.string(),
						public: z.boolean(),
					})
					.partial(),
			})
		)
		.mutation(async ({ ctx, input }): Promise<Note> => {
			const note = await ctx.prisma.note.findUniqueOrThrow({
				where: {
					id: input.noteId,
				},
			});

			throwIfUserCanNotEditNote(note, ctx.session?.user?.id);

			return ctx.prisma.note.update({
				where: {
					id: input.noteId,
				},
				data: input.data,
			});
		}),
	addTagToNote: protectedProcedure
		.input(z.object({ noteId: z.string(), tagText: z.string() }))
		.mutation(async ({ ctx, input }): Promise<Tag> => {
			const note = await ctx.prisma.note.findUniqueOrThrow({
				where: {
					id: input.noteId,
				},
			});

			throwIfUserCanNotEditNote(note, ctx.session.user.id);

			return ctx.prisma.tag.create({
				data: {
					name: input.tagText,
					noteId: input.noteId,
				},
			});
		}),
	removeTagFromNote: protectedProcedure
		.input(z.object({ noteId: z.string(), tagId: z.string() }))
		.mutation(async ({ ctx, input }): Promise<Tag> => {
			const note = await ctx.prisma.note.findUniqueOrThrow({
				where: {
					id: input.noteId,
				},
			});

			throwIfUserCanNotEditNote(note, ctx.session.user.id);

			return ctx.prisma.tag.delete({
				where: {
					id: input.tagId,
				},
			});
		}),
});
