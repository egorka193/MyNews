import * as React from "react";
import type { SVGProps } from "react";
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#5C3BFE"
      d="M21.398 40 39.33 0h-6.607L14.792 40zM6.516 40 24.202 0h-6.516L0 40z"
    />
  </svg>
);
export default SvgLogo;
