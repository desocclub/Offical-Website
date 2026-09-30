export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return inputs
    .flatMap((x) => {
      if (!x) return [];
      if (typeof x === 'string') return [x];
      if (typeof x === 'object') {
        return Object.entries(x)
          .filter(([, v]) => Boolean(v))
          .map(([k]) => k);
      }
      return [];
    })
    .join(' ');
}
