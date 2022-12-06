import { useRouter } from "next/router";

export const useCallbackUrl = () => {
  const { query } = useRouter();

  if (!query.callbackUrl) return undefined;
  if (Array.isArray(query.callbackUrl)) return query.callbackUrl[0];
  return query.callbackUrl;
};
