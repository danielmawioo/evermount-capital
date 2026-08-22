import { render } from "@testing-library/react";
import Analytics from "./Analytics";

describe("Analytics", () => {
  it("mounts without throwing and injects the gtag scripts into the document", () => {
    render(<Analytics />);

    // next/script injects afterInteractive scripts directly into document.body,
    // outside of the React render container.
    const inlineScript = document.body.querySelector("#google-analytics");
    expect(inlineScript).toBeInTheDocument();
    expect(inlineScript?.innerHTML).toContain("gtag('config', 'G-CK2PDMGDEG')");

    const gtagLoader = document.body.querySelector(
      'script[src="https://www.googletagmanager.com/gtag/js?id=G-CK2PDMGDEG"]',
    );
    expect(gtagLoader).toBeInTheDocument();
  });
});
