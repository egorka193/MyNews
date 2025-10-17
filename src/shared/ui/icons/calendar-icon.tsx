import { FC, SVGProps } from 'react';
const SvgCalendarIcon: FC<SVGProps<SVGSVGElement>> = ({ color = 'var(--text-primary)', ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
      <g clipPath="url(#clip0_4487_80)" opacity={0.8}>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 8h16m-4-6v2M8 2v2m-.8 0h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 5.52 20 6.08 20 7.2v9.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C18.48 20 17.92 20 16.8 20H7.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C4 18.48 4 17.92 4 16.8V7.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 4 6.08 4 7.2 4Z"
        />
      </g>
      <defs>
        <clipPath id="clip0_4487_80">
          <path fill={color} d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default SvgCalendarIcon;
