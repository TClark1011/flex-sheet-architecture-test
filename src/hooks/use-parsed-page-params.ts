import { useRouter } from "next/router";
import type { z } from "zod";

export const useParsedPageParams = <Schema extends z.ZodTypeAny>(
  schema: Schema
): z.infer<Schema> => {
  const { query } = useRouter();
  const parsed = schema.parse(query);

  return parsed;
};

export const createParsedPageParamHook =
  <Schema extends z.ZodTypeAny>(schema: Schema) =>
  () =>
    useParsedPageParams(schema);
