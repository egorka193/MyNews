import SvgSpinner from '../icons/spinner';
import React, { FC } from 'react';
import { CommonTypes } from '@/types';

import { getClasses } from './styles/get-classes';

export type SpinnerSize = 'extraLarge' | 'large' | 'medium' | 'small';
export type SpinnerVariant = 'default' | 'contrast' | 'accent';

export interface SpinnerProps extends CommonTypes {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
}

const iconSize: Record<SpinnerSize, number> = {
  extraLarge: 40,
  large: 24,
  medium: 20,
  small: 16,
};

const iconColor: Record<SpinnerVariant, string> = {
  default: 'var(--icon-primary)',
  contrast: 'var(--icon-contrast)',
  accent: 'var(--icon-accent)',
};

const Spinner: FC<SpinnerProps> = ({ className, size = 'large', variant = 'default', color }) => {
  const { cnRoot } = getClasses({ className });

  const spinnerColor = color ? color : iconColor[variant];

  return (
    <div className={cnRoot}>
      <SvgSpinner width={iconSize[size]} height={iconSize[size]} color={spinnerColor} />
    </div>
  );
};

export default Spinner;
