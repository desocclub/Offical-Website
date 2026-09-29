'use client';

const items = [
  ['Top', 'committee-top'],
  ['Faculty', 'faculty'],
  ['Core', 'core'],
  ['Events', 'event-management'],
  ['Technical', 'technical'],
  ['Design', 'design'],
  ['Editorial', 'editorial'],
  ['T&P', 'tp'],
  ['GDA', 'gda'],
] as const;

export default function CommitteeQuickNav() {
  return (
    <>
      <nav aria-label="Committee sections" className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="flex w-8 flex-col items-center gap-2 border border-[#bc0034]/40 bg-black/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          {items.map(([label, id]) => (
            <a key={id} href={`#${id}`} aria-label={`Go to ${label}`} className="group relative flex h-5 w-5 items-center justify-center outline-none">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bc0034] transition-all duration-300 group-hover:scale-150 group-hover:bg-[#ef3b67] group-focus-visible:scale-150 group-focus-visible:bg-[#ef3b67]" />
              <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap border border-[#bc0034]/45 bg-black px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      <details className="fixed bottom-4 right-4 z-40 lg:hidden">
        <summary className="cursor-pointer list-none border border-[#bc0034]/60 bg-black/95 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] outline-none marker:hidden focus-visible:border-[#ef3b67]">
          Sections
        </summary>
        <nav aria-label="Committee sections" className="absolute bottom-full right-0 mb-2 w-48 border border-[#bc0034]/45 bg-black/95 p-2 shadow-[0_12px_35px_rgba(0,0,0,0.55)]">
          <ul className="max-h-[55vh] space-y-1 overflow-y-auto">
            {items.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="block border-l border-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-300 transition-colors hover:border-[#ef3b67] hover:bg-[#bc0034]/15 hover:text-white focus-visible:border-[#ef3b67] focus-visible:bg-[#bc0034]/15 focus-visible:text-white focus-visible:outline-none">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  );
}
