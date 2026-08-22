import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobListings from "./JobListings";
import type { JobOpening } from "./openings";

const job: JobOpening = {
  id: "test-role",
  title: "Test Role",
  type: "Full-Time",
  location: "Remote",
  department: "Engineering",
  description: "A role used for isolated component testing.",
  responsibilities: ["Do the thing"],
  requirements: ["Know the thing"],
  niceToHave: [],
  benefits: ["Great benefits"],
  experience: "Mid-Level",
  applyEmail: "careers@evermount.co",
};

describe("JobListings", () => {
  it("stays collapsed until expandedJob matches the job id, then calls onToggleJob when clicked", async () => {
    const user = userEvent.setup();
    const onToggleJob = jest.fn();
    const onApply = jest.fn();

    const { rerender } = render(
      <JobListings
        openings={[job]}
        expandedJob={null}
        onToggleJob={onToggleJob}
        onApply={onApply}
      />
    );

    expect(screen.queryByText(/about the role/i)).not.toBeInTheDocument();

    const headerButton = screen
      .getByRole("heading", { name: /test role/i })
      .closest("button")!;
    await user.click(headerButton);

    expect(onToggleJob).toHaveBeenCalledWith("test-role");

    // Simulate the parent updating expandedJob in response to the callback.
    rerender(
      <JobListings
        openings={[job]}
        expandedJob="test-role"
        onToggleJob={onToggleJob}
        onApply={onApply}
      />
    );

    expect(screen.getByText(/about the role/i)).toBeInTheDocument();
  });

  it("calls onApply with the job when Apply Now is clicked", async () => {
    const user = userEvent.setup();
    const onToggleJob = jest.fn();
    const onApply = jest.fn();

    render(
      <JobListings
        openings={[job]}
        expandedJob="test-role"
        onToggleJob={onToggleJob}
        onApply={onApply}
      />
    );

    await user.click(screen.getByRole("button", { name: /apply now/i }));

    expect(onApply).toHaveBeenCalledWith(job);
  });

  it("collapses again when expandedJob no longer matches", async () => {
    const onToggleJob = jest.fn();
    const onApply = jest.fn();

    const { rerender } = render(
      <JobListings
        openings={[job]}
        expandedJob="test-role"
        onToggleJob={onToggleJob}
        onApply={onApply}
      />
    );

    expect(screen.getByText(/about the role/i)).toBeInTheDocument();

    rerender(
      <JobListings
        openings={[job]}
        expandedJob={null}
        onToggleJob={onToggleJob}
        onApply={onApply}
      />
    );

    await waitFor(() =>
      expect(screen.queryByText(/about the role/i)).not.toBeInTheDocument()
    );
  });
});
