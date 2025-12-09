import { FC, SVGProps } from 'react';
const SvgWarningCircle: FC<SVGProps<SVGSVGElement>> = ({ color = 'var(--text-primary)', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="#E10918"
        fillRule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8 .533A.533.533 0 0 1 7.467 8V4.8a.533.533 0 0 1 1.066 0V8A.533.533 0 0 1 8 8.533Zm0 2.134a.538.538 0 0 1 0 1.077.538.538 0 0 1 0-1.077Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default SvgWarningCircle;
