import classNames from 'classnames/bind';

import { ButtonProps } from '../button';
import classes from './button.module.scss';

const cn = classNames.bind(classes);

type PickedButtonProps = Pick<
  ButtonProps,
  'className' | 'variant' | 'size' | 'isLoading' | 'enabledDefaultIconColor' | 'isFullWidth'
>;

export const getClasses = ({
  className,
  variant,
  size,
  isLoading,
  enabledDefaultIconColor,
  isFullWidth,
}: PickedButtonProps) => {
  const cnButton = cn('button', className, `button--${variant}`, `button--${size}`, {
    'button--full-width': isFullWidth,
    loading: isLoading,
  });

  const cnContent = cn(classes.button__content, {
    'button__content--default-icon-color': enabledDefaultIconColor,
    loading: isLoading,
  });

  const cnContentText = cn('button__content-text');

  const cnSpinner = cn('button__spinner');

  return {
    cnButton,
    cnContent,
    cnSpinner,
    cnContentText,
  };
};
