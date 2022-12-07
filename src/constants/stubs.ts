import type { FullNote } from "@/types/extra-entity-types";
import type { Note, User } from "@prisma/client";

export const STUB_USER: User = {
  email: "",
  emailVerified: null,
  id: "",
  image: "",
  name: "",
};

export const NOTE_STUB: Note = {
  id: "",
  authorUserId: "",
  content: "",
  createdAt: new Date(),
  public: false,
  title: "",
  updatedAt: new Date(),
};

export const FULL_NOTE_STUB: FullNote = {
  ...NOTE_STUB,
  author: null,
  allowedViewerUsers: [],
};
