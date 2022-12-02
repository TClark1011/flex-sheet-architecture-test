export type ExcludeNullFromValues<T> = {
  [K in keyof T]: Exclude<T[K], null>;
};

export type EmptyObject = Record<never, never>;
