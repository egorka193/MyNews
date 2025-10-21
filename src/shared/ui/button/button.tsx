import Spinner from '../spinner/spinner';
import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from 'react';

import { CommonTypes, Sizes } from '../../../types';
import { getClasses } from './styles/get-classes';

export type ButtonVariant = 'primary' | 'tinted' | 'secondary' | 'outline' | 'ghost' | 'destructive';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CommonTypes {
  text: string;
  variant?: ButtonVariant;
  size?: Sizes;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  enabledDefaultIconColor?: boolean;
  isFullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'large',
  text,
  leftIcon,
  rightIcon,
  disabled,
  isLoading = false,
  isFullWidth = false,
  enabledDefaultIconColor = true,
  type = 'button',
  onClick,
  ...props
}) => {
  const { cnButton, cnContent, cnContentText, cnSpinner } = getClasses({
    className,
    variant,
    size,
    isLoading,
    enabledDefaultIconColor,
    isFullWidth,
  });

  const isDisabled = disabled || isLoading;

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = event => {
    event.currentTarget.blur();
    onClick?.(event);
  };

  return (
    <button className={cnButton} type={type} disabled={isDisabled} onClick={onClickHandler} {...props}>
      <span className={cnContent}>
        {leftIcon && <span>{leftIcon}</span>}

        {text && <span className={cnContentText}>{text}</span>}

        {rightIcon && <span>{rightIcon}</span>}
      </span>

      {isLoading && <Spinner className={cnSpinner} size={size} color="currentColor" />}
    </button>
  );
};

export default Button;
