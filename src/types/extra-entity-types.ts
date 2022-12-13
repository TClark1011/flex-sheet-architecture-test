import type { Prisma } from "@prisma/client";

export type NoteWithAuthor = Prisma.NoteGetPayload<{
  include: {
    author: true;
  };
}>;

export type FullNote = Prisma.NoteGetPayload<{
  include: {
    author: true;
    tags: true;
  };
}>;
