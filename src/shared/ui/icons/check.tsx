import { FC, SVGProps } from 'react';
const SvgCheck: FC<SVGProps<SVGSVGElement>> = ({ color = 'var(--text-primary)', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <g clipPath="url(#clip0_1_643)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m6 12 4.243 4.243 8.484-8.485"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_643">
          <path fill={color} d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default SvgCheck;
