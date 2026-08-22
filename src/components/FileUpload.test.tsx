import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import toast from "react-hot-toast";
import FileUpload from "./FileUpload";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: { error: jest.fn(), success: jest.fn() },
}));

function makeFile(name: string, sizeBytes: number, type = "text/plain"): File {
  const file = new File(["a".repeat(Math.min(sizeBytes, 1024))], name, {
    type,
  });
  Object.defineProperty(file, "size", { value: sizeBytes });
  return file;
}

describe("FileUpload", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the label, description, and max size", () => {
    render(
      <FileUpload
        label="Upload ID"
        description="Upload a clear photo of your ID"
        maxSize={5}
        onUpload={jest.fn()}
      />,
    );

    expect(screen.getByText("Upload ID")).toBeInTheDocument();
    expect(
      screen.getByText("Upload a clear photo of your ID"),
    ).toBeInTheDocument();
    expect(screen.getByText("Max size: 5MB")).toBeInTheDocument();
  });

  it("adds a valid selected file to the list", () => {
    const { container } = render(<FileUpload onUpload={jest.fn()} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = makeFile("document.pdf", 1024);
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("Selected Files (1)")).toBeInTheDocument();
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
  });

  it("rejects a file that exceeds maxSize and shows an error toast", () => {
    const { container } = render(
      <FileUpload onUpload={jest.fn()} maxSize={1} />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const bigFile = makeFile("big.pdf", 2 * 1024 * 1024);
    fireEvent.change(input, { target: { files: [bigFile] } });

    expect(toast.error).toHaveBeenCalledWith("File size must be less than 1MB");
    expect(screen.queryByText("Selected Files (1)")).not.toBeInTheDocument();
  });

  it("uploads the selected file and clears the list on success", async () => {
    const onUpload = jest.fn().mockResolvedValue(undefined);
    const { container } = render(<FileUpload onUpload={onUpload} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = makeFile("doc.pdf", 1024);
    fireEvent.change(input, { target: { files: [file] } });

    fireEvent.click(screen.getByRole("button", { name: "Upload Files" }));

    await waitFor(() => expect(onUpload).toHaveBeenCalledWith([file]));
    await waitFor(() =>
      expect(screen.queryByText("Selected Files (1)")).not.toBeInTheDocument(),
    );
    expect(toast.success).toHaveBeenCalledWith("Files uploaded successfully");
  });

  it("shows an error toast when onUpload rejects", async () => {
    const onUpload = jest.fn().mockRejectedValue(new Error("boom"));
    const { container } = render(<FileUpload onUpload={onUpload} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const file = makeFile("doc.pdf", 1024);
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByRole("button", { name: "Upload Files" }));

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith("Upload failed"),
    );
  });
});
