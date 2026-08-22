import MockAdapter from "axios-mock-adapter";
import { apiClient } from "./client";
import { kyc } from "./kyc";

describe("kyc api", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("submit posts identity, proof of address and selfie as multipart form data", async () => {
    const identityDocument = new File(["id"], "id.png", { type: "image/png" });
    const proofOfAddress = new File(["poa"], "poa.png", { type: "image/png" });
    const selfie = new File(["selfie"], "selfie.png", { type: "image/png" });
    mock.onPost("/kyc/submit").reply(201, { status: "pending" });

    const response = await kyc.submit({
      identityDocument,
      proofOfAddress,
      selfie,
    });

    expect(response.data).toEqual({ status: "pending" });

    const request = mock.history.post[0];
    expect(request.headers?.["Content-Type"]).toBe("multipart/form-data");
    expect(request.data).toBeInstanceOf(FormData);
    const formData = request.data as FormData;
    expect(formData.get("identityDocument")).toBe(identityDocument);
    expect(formData.get("proofOfAddress")).toBe(proofOfAddress);
    expect(formData.get("selfie")).toBe(selfie);
  });

  it("getStatus resolves with the kyc status", async () => {
    mock.onGet("/kyc/status").reply(200, { status: "approved" });

    const response = await kyc.getStatus();

    expect(response.data).toEqual({ status: "approved" });
  });
});
