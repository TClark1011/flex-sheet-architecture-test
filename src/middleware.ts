/**
 * We use the `next-auth` middleware to "protect" certain
 * pages so that they can only be visited by authenticated
 * users. If an unauthenticated user tries to visit a page
 * that is protected by this middleware, they will be
 * redirected to the login page. Once they have successfully
 * logged in, they will be redirected back to the page they
 * were trying to visit.
 */

export { default as middleware } from "next-auth/middleware";

type ValidConfigMatcherPath = `/${string}`; // Nextjs middleware path must start with "/"

type MiddlewareConfig = {
  matcher: ValidConfigMatcherPath[];
};

export const config: MiddlewareConfig = {
  // define URLs we want to be protected
  matcher: ["/notes"],
};
