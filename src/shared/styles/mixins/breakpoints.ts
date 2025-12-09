import breakpoints from './_breakpoints.module.scss';

type BreakpointKeys =
  | 'mobile-s'
  | 'mobile-m'
  | 'mobile-l'
  | 'tablet'
  | 'laptop-s'
  | 'laptop-m'
  | 'laptop-l'
  | 'desktop';

type BreakpointValues = Readonly<Record<`min-${BreakpointKeys}` | `max-${BreakpointKeys}`, string>>;

export const BREAKPOINTS = {
  ...breakpoints,
} as BreakpointValues;

