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
        d="M8.56666 8.56667C8.21213 8.92119 8.00081 9.40406 8 9.91C7.99919 10.4159 8.20863 10.8995 8.56182 11.2552C8.91502 11.6108 9.39722 11.8238 9.90312 11.8267C10.409 11.8295 10.8935 11.622 11.25 11.27M12.82 12.82C11.8705 13.4987 10.6953 13.8343 9.5 13.7733C7.3 13.6733 5.27333 12.2733 4 10C4.52 9.04 5.17 8.19 5.94 7.48C6.71333 6.76667 7.6 6.2 8.55 5.8L12.82 12.82Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 13.8333C8.07 14.12 8.69 14.3333 9.33333 14.44M12.5 12.5L16.6667 16.6667M3.33333 3.33333L7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};