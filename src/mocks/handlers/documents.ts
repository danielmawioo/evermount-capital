import { http, HttpResponse } from "msw";

// Mocks for src/lib/api/documents.ts
export const documentsHandlers = [
  http.post("*/documents/upload", () =>
    HttpResponse.json(
      { url: "https://cdn.evermount.co/mock/document.pdf" },
      { status: 201 },
    ),
  ),
];
