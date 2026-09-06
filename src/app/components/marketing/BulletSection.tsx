interface BulletSectionProps {
  id?: string;
  title: string;
  body?: string;
  items: string[];
}

export default function BulletSection({
  id,
  title,
  body,
  items,
}: BulletSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h2>
      {body ? (
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          {body}
        </p>
      ) : null}
      <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
