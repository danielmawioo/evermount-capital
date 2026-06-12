export type ApiError = {
  response?: {
    data?: {
      error?: { message?: string };
      message?: string;
    };
  };
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const err = error as ApiError;
  return (
    err.response?.data?.error?.message ||
    err.response?.data?.message ||
    fallback
  );
}
