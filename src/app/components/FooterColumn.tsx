import Link from "next/link";
import type { FooterColumnData } from "./footerColumns";

export default function FooterColumn({
  title,
  headingClassName,
  links,
}: FooterColumnData) {
  return (
    <div>
      <h4 className={headingClassName}>{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link href={link.href} className={link.className}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
