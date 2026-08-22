import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { documents } from "./documents";

describe("documents api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("upload posts the file as multipart form data", async () => {
    const file = new File(["file-contents"], "id.png", { type: "image/png" });
    mock.onPost("/documents/upload").reply(201, { url: "https://cdn/id.png" });

    const response = await documents.upload(file);

    expect(response.data).toEqual({ url: "https://cdn/id.png" });

    const request = mock.history.post[0];
    expect(request.headers?.["Content-Type"]).toBe("multipart/form-data");
    expect(request.data).toBeInstanceOf(FormData);
    expect((request.data as FormData).get("file")).toBe(file);
  });
});
