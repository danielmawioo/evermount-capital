import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@/lib/api-client";
import InvestorKYCPage from "./page";

function makeFile(name = "id.png") {
  return new File(["content"], name, { type: "image/png" });
}

// FileUpload only calls its onUpload prop once the file is selected *and*
// the component's own internal "Upload Files" button is clicked, so drive
// both steps to get identityDocument/proofOfAddress/selfie set on the page.
async function uploadInto(
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  file: File
) {
  const heading = screen.getByText(label);
  const container = heading.closest("div")!.parentElement as HTMLElement;
  const input = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  await user.upload(input, file);

  const uploadButton = await within(container).findByRole("button", {
    name: "Upload Files",
  });
  await user.click(uploadButton);
  await waitFor(() =>
    expect(
      within(container).queryByRole("button", { name: "Upload Files" })
    ).not.toBeInTheDocument()
  );
}

describe("InvestorKYCPage", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  afterEach(() => {
    mock.restore();
  });

  it("shows the upload form when there is no existing KYC status", async () => {
    mock.onGet("/kyc/status").reply(404);

    render(<InvestorKYCPage />);

    expect(
      await screen.findByRole("heading", { name: "KYC Verification" })
    ).toBeInTheDocument();
  });

  it("shows the verified state", async () => {
    mock.onGet("/kyc/status").reply(200, { status: "verified" });

    render(<InvestorKYCPage />);

    expect(
      await screen.findByRole("heading", { name: "KYC Verified" })
    ).toBeInTheDocument();
  });

  it("shows the pending review state", async () => {
    mock.onGet("/kyc/status").reply(200, { status: "pending" });

    render(<InvestorKYCPage />);

    expect(
      await screen.findByRole("heading", { name: "KYC Under Review" })
    ).toBeInTheDocument();
  });

  it("shows the rejected state with the rejection reason", async () => {
    mock.onGet("/kyc/status").reply(200, {
      status: "rejected",
      rejectionReason: "Blurry document photo",
    });

    render(<InvestorKYCPage />);

    expect(
      await screen.findByRole("heading", { name: "Verification Rejected" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Blurry document photo/)).toBeInTheDocument();
  });

  it("submits all three documents to the KYC endpoint", async () => {
    mock.onGet("/kyc/status").reply(404);
    mock.onPost("/kyc/submit").reply(200, {});

    const user = userEvent.setup();
    render(<InvestorKYCPage />);

    await screen.findByRole("heading", { name: "KYC Verification" });

    await uploadInto(
      user,
      "Identity Document (ID/Passport)",
      makeFile("id.png")
    );
    await uploadInto(user, "Proof of Address", makeFile("address.png"));
    await uploadInto(user, "Selfie with ID", makeFile("selfie.png"));

    const submitButton = await screen.findByRole("button", {
      name: "Submit Verification",
    });
    expect(submitButton).toBeEnabled();
    await user.click(submitButton);

    await waitFor(() => {
      expect(mock.history.post).toHaveLength(1);
    });
    expect(mock.history.post[0].url).toBe("/kyc/submit");
  });
});
