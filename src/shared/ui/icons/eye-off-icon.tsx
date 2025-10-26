import { FC, SVGProps } from 'react';

export const EyeOffIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 10S4 4 10 4s9 6 9 6-3 6-9 6-9-6-9-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4 4l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
};