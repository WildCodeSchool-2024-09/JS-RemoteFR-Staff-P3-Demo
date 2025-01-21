export function isDatabaseError(
  error: unknown,
): error is { code: string; sqlMessage?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string" &&
    "sqlMessage" in error &&
    (typeof (error as { sqlMessage?: unknown }).sqlMessage === "string" ||
      (error as { sqlMessage?: unknown }).sqlMessage === undefined)
  );
}
