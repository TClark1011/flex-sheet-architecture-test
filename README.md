## Authenticated Pages

Add to `matcher` array in `middleware.ts` config object.

Use the `ssr-utils` protects `getServerSideProps` stuff to get the session data in SSR

## Changes From Base T3

- Switch to `jwt` sessions, delete verification token model
