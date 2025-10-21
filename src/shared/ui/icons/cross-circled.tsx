import { FC, SVGProps } from 'react';
const SvgCrossCircled: FC<SVGProps<SVGSVGElement>> = ({ color = 'var(--text-primary)', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="#AFB5C0"
        fillRule="evenodd"
        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm11.2 3.2a.533.533 0 0 1-.754 0L8 8.754 5.554 11.2a.533.533 0 1 1-.754-.754L7.246 8 4.8 5.554a.533.533 0 0 1 .754-.754L8 7.246 10.446 4.8a.533.533 0 1 1 .754.754L8.754 8l2.446 2.446a.533.533 0 0 1 0 .754Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export default SvgCrossCircled;
