import { animate, style, transition, trigger } from '@angular/animations';

export const transitionHeight = trigger('transitionHeight', [
  transition(':enter', [
    style({ height: '0', overflow: 'hidden', opacity: 0 }),
    animate(120, style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    animate(120, style({ height: '0', overflow: 'hidden', opacity: 0 })),
  ]),
]);
