type inViewTypes = {
  ref: React.MutableRefObject<HTMLElement | null>;
};

function inView({ ref }: inViewTypes) {
  if (!ref.current) return false;

  const { innerHeight } = window;
  const { top, bottom } = ref.current.getBoundingClientRect();

  if (top > innerHeight) return false;
  if (bottom < 0) return false;

  return true;
}

function scrolledTL({ ref }: inViewTypes) {
  // returns the percentage of the element scrolled
  // Example: 0% = the top of the element is at the bottom of the window
  // Example: 100% = the bottom of the element is at the bottom of the window

  // TODO: add a way to set the offset
  // TODO: stop at 100% and 0%
  // TODO: understand how to get the timeline after 100%

  if (!ref.current) return false;

  const { innerHeight } = window;
  const { top, bottom } = ref.current.getBoundingClientRect();

  const height = bottom - top; // as 100%

  const windowBottom = innerHeight;

  const scrolled = ((windowBottom - top) / height) * 100;

  return scrolled.toFixed();
}

export { inView, scrolledTL };
