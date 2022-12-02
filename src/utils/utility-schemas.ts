import { z } from "zod";
import type { errorUtil } from "zod/lib/helpers/errorUtil";

export const zNonEmptyString = (
  message: errorUtil.ErrMessage = "Cannot be empty"
) => z.string().min(1, message);
