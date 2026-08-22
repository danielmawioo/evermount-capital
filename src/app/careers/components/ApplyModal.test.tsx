import { render, screen, fireEvent } from "@testing-library/react";
import ApplyModal from "./ApplyModal";
import type { JobOpening } from "./openings";

const fullJob: JobOpening = {
  id: "frontend-engineer",
  title: "Frontend Engineer",
  type: "Full-Time",
  location: "Remote",
  department: "Engineering",
  description: "A great role building great things.",
  responsibilities: ["Build things"],
  requirements: ["3+ years experience"],
  niceToHave: ["Fintech experience"],
  benefits: ["Remote-first"],
  salary: "$90,000 - $130,000",
  experience: "Mid-Level",
  linkedinUrl: "https://www.linkedin.com/jobs/view/1234567890",
  indeedUrl: "https://www.indeed.com/viewjob?jk=abc123def456",
  applyEmail: "careers@evermount.co",
};

const minimalJob: JobOpening = {
  id: "product-designer",
  title: "Product Designer",
  type: "Contract",
  location: "Hybrid - London",
  department: "Design",
  description: "Design intuitive interfaces.",
  responsibilities: ["Design things"],
  requirements: ["4+ years experience"],
  niceToHave: [],
  benefits: [],
  experience: "Senior",
  applyEmail: "careers@evermount.co",
};

describe("ApplyModal", () => {
  it("renders all apply links with correct hrefs when the job has all URLs", () => {
    const onClose = jest.fn();
    render(<ApplyModal job={fullJob} onClose={onClose} />);

    expect(
      screen.getByRole("heading", { name: "Apply for Frontend Engineer" }),
    ).toBeInTheDocument();

    const emailLink = screen.getByRole("link", { name: "Apply via Email" });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:careers@evermount.co?subject=Application for Frontend Engineer",
    );

    const linkedinLink = screen.getByRole("link", {
      name: "Apply on LinkedIn",
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/jobs/view/1234567890",
    );

    const indeedLink = screen.getByRole("link", { name: "Apply on Indeed" });
    expect(indeedLink).toHaveAttribute(
      "href",
      "https://www.indeed.com/viewjob?jk=abc123def456",
    );
  });

  it("only renders the email link when linkedinUrl and indeedUrl are absent", () => {
    const onClose = jest.fn();
    render(<ApplyModal job={minimalJob} onClose={onClose} />);

    expect(
      screen.getByRole("heading", { name: "Apply for Product Designer" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Apply via Email" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Apply on LinkedIn" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Apply on Indeed" }),
    ).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = jest.fn();
    render(<ApplyModal job={fullJob} onClose={onClose} />);

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
