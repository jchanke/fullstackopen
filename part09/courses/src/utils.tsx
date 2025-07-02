export const assertNever = (obj: never): never => {
  throw new Error(
    `unhandled discriminated union member: ${JSON.stringify(obj)}`
  );
};
