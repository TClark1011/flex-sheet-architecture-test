import { createParsedPageParamHook } from "@/hooks/use-parsed-page-params";
import { z } from "zod";

export const notePageParamSchema = z.object({
  noteId: z.string(),
});

export const useNotePageParams = createParsedPageParamHook(notePageParamSchema);
