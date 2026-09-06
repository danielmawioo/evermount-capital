"use client";

import TranslateTree from "@/app/components/TranslateTree";

export default function LegalNotice() {
  return (
    <TranslateTree>
      <p className="text-sm text-gray-500 dark:text-gray-400 border-l-4 border-[#00a76f] pl-4">
        This page is a product-facing summary and is not legal advice. Legal and
        regulatory terms should be reviewed and approved by qualified counsel
        before publication. Evermount does not claim SEC, FCA, CMA, MiFID, or
        similar authorization unless separately and expressly stated by the
        company.
      </p>
    </TranslateTree>
  );
}
