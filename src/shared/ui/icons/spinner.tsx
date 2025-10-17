import { FC, SVGProps } from 'react';
const SvgSpinner: FC<SVGProps<SVGSVGElement>> = ({ color = 'var(--text-primary)', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 25 24" {...props}>
      <g id="Icon" fill={color}>
        <path
          id="opacity (Stroke)"
          fillRule="evenodd"
          d="M12.5 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z"
          clipRule="evenodd"
          opacity={0.2}
        />
        <path id="spinner" d="M2.5 12c0-5.523 4.477-10 10-10v3a7 7 0 0 0-7 7h-3Z" />
      </g>
    </svg>
  );
};
export default SvgSpinner;
