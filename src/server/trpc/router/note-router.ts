import {
  protectedProcedure,
  publicProcedure,
  router,
} from "@/server/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const noteRouter = router({
  getCurrentUserNotes: protectedProcedure.query(({ ctx }) =>
    ctx.prisma.note.findMany({
      where: {
        authorUserId: ctx.session.user.id,
      },
    })
  ),
  getNote: publicProcedure
    .input(z.object({ noteId: z.string() }))
    .query(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.findUniqueOrThrow({
        where: {
          id: input.noteId,
        },
        include: {
          author: true,
          allowedViewerUsers: true,
        },
      });

      const userIsListedAsAllowedToView = note.allowedViewerUsers.some(
        (item) => item.userId === ctx.session?.user?.id
      );

      if (note.public || userIsListedAsAllowedToView) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this note",
        });
      }

      return note;
    }),
  createNewNote: publicProcedure.mutation(({ ctx }) =>
    ctx.prisma.note.create({
      data: {
        title: "New Note",
        content: "New Note Content",
        public: false,
        authorUserId: ctx.session?.user?.id,
      },
    })
  ),
  saveNote: publicProcedure
    .input(
      z.object({
        noteId: z.string(),
        content: z.string().optional(),
        title: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const note = await ctx.prisma.note.findUniqueOrThrow({
        where: {
          id: input.noteId,
        },
      });

      if (note.authorUserId && note.authorUserId !== ctx.session?.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to edit this note",
        });
      }

      return ctx.prisma.note.update({
        where: {
          id: input.noteId,
        },
        data: {
          content: input.content,
          title: input.title,
        },
      });
    }),
});
