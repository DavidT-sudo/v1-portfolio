type SectionHeadingProps = {
  index: string;
  title: string;
  caption?: string;
};

/**
 * Spec-sheet section header: [01] // TITLE ———— OOL-01 / REV.01
 */
export default function SectionHeading({
  index,
  title,
  caption,
}: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4">
        <span
          className="font-mono text-2xs tracking-[0.25em] text-volt"
          aria-hidden
        >
          [{index}]
        </span>
        <h2 className="font-display text-lg font-bold uppercase tracking-[0.3em] text-porcelain sm:text-xl">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line" aria-hidden />
        <span
          className="hidden font-mono text-2xs tracking-widest text-sage-500 sm:inline"
          aria-hidden
        >
          OOL-{index} / REV.01
        </span>
      </div>
      {caption && (
        <p className="mt-3 pl-12 text-sm text-sage-400">{caption}</p>
      )}
    </div>
  );
}
