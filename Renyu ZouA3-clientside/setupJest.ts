import 'jest-preset-angular/setup-jest'; 

const noop = (x: number, y: number) => {
  document.documentElement.scrollTop = y;
};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
