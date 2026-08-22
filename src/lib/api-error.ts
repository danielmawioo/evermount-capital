export type ApiError = {
  response?: {
    data?: {
      error?: { message?: string };
      message?: string;
    };
  };
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") return fallback;
  const err = error as ApiError;
  return (
    err.response?.data?.error?.message ||
    err.response?.data?.message ||
    fallback
  );
}
