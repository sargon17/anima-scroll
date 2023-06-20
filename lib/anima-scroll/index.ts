import { error } from "console";

type tlTypes = {
  ref: React.MutableRefObject<HTMLElement | null>;
};

function inView({ ref }: tlTypes) {
  if (!ref.current) return false;

  const { innerHeight } = window;
  const { top, bottom } = ref.current.getBoundingClientRect();

  if (top > innerHeight) return false;
  if (bottom < 0) return false;

  return true;
}

// tl functions are useful to create animations based on the scroll position of an element in the viewport

class TL {
  ref: React.MutableRefObject<HTMLElement> = null as any;
  viewportHeight: number = window.innerHeight;
  elementTop: number = 0;
  elementBottom: number = 0;

  elementHeight: number = 0; // considered as 100%

  viewportBottom: number = this.viewportHeight;

  constructor({ ref }: tlTypes) {
    if (!ref.current) {
      return;
    }

    this.ref = ref as React.MutableRefObject<HTMLElement>;

    const { top, bottom } = ref.current.getBoundingClientRect();

    this.elementTop = top;
    this.elementBottom = bottom;

    this.elementHeight = this.elementBottom - this.elementTop;

    this.viewportBottom = this.viewportHeight;
  }

  // return the percentage of the element that has entered the viewport
  entering(): number {
    // if the bottom of the element is above the bottom of the window exit early
    if (this.elementBottom - this.viewportHeight < 0) return 100;
    return Math.round(((this.viewportBottom - this.elementTop) / this.elementHeight) * 100);
  }

  tillExit() {
    // when the element is smaller then the height of the viewport is this function is useful to understand how much space is left in the viewport before the element is out of view
    // Example: if the total free space is 1000px and the top of the element is at 800px then the function will return 20% (200px)
    // 20% is the portion of already scrolled space
    // todo: finish this function
  }

  fullMotion() {
    // starts when the top enter the viewport and ends when the bottom exit the viewport
    const fullMotionHeight = this.elementHeight + this.viewportHeight;

    return Math.round(((this.viewportBottom - this.elementTop) / fullMotionHeight) * 100);
  }

  exiting(): number {
    if (this.elementTop > this.viewportHeight) return 100;
    return Math.round((-this.elementTop / this.elementHeight) * 100);
  }
}

export { inView, TL };

// TODO: make tl functions work with the offset

// TODO: add tl functions that takes the parent element too to make animations based on the scroll position inside the parent element (make sense?)

// todo: transform tl functions in a class with all the methods to make it easier to use
