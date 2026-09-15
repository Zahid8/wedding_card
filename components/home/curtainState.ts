/** Tiny shared flag: has the invitation curtain fully opened? (Navbar hides the brand once it has.) */
let open = false;
const listeners = new Set<() => void>();
export const curtain = {
  get: () => open,
  set(v: boolean) {
    if (open === v) return;
    open = v;
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};
