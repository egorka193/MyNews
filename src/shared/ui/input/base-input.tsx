import Spinner from '../spinner/spinner';
import { getCaptionOptions } from '../../lib/helpers/get-caption-options';
import SvgCrossCircled from '../icons/cross-circled';
import SvgWarningCircle from '../icons/warning-circle';
import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, useId, useState } from 'react';
import { CommonTypes, Sizes, TypeWithoutClassName } from '../../../types';

import { getClasses } from './styles/get-classes';

export interface BaseInputProps
  extends Omit<TypeWithoutClassName<InputHTMLAttributes<HTMLInputElement>>, 'size'>,
    CommonTypes {
  size?: Sizes;
  classNameOuter?: string;
  classNameField?: string;
  label?: string;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  successMessage?: string;
  errorMessage?: string;
  captionMessage?: string;
  isLoading?: boolean;
  isClearable?: boolean;
  hasErrorIcon?: boolean;
  hasError?: boolean;
  hasSuccess?: boolean;
}

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      size = 'large',
      className,
      classNameOuter,
      classNameField,
      id,
      value,
      label,
      onChange,
      contentLeft,
      contentRight,
      type = 'text',
      disabled = false,
      successMessage,
      errorMessage,
      captionMessage,
      isLoading,
      isClearable,
      hasErrorIcon = true,
      hasError,
      hasSuccess,
      ...props
    },
    ref
  ) => {
    const ownId = useId();
    const inputId = id || ownId;

    const [isFocused, setIsFocused] = useState(false);

    const stringValue = value !== undefined ? value.toString() : '';

    const isError = Boolean(errorMessage) || hasError;
    const isSuccess = Boolean(successMessage) || hasSuccess;
    const isShowClearButton =
      isClearable && !isLoading && !isError && !contentRight && !disabled && stringValue.length >= 1;

    const isShowErrorIcon = isError && !isFocused && !isLoading && hasErrorIcon;
    const isShowContentRight = ((!isError && !isLoading) || isFocused) && contentRight;

    const { captionText, captionClass } = getCaptionOptions({
      isError,
      isSuccess,
      errorMessage,
      successMessage,
      captionMessage,
    });

    const hasCaption = Boolean(captionText);

    const { cnRoot, cnLabel, cnOuter, cnContentLeft, cnField, cnContentRight, cnCaption } = getClasses({
      size,
      className,
      classNameOuter,
      classNameField,
      disabled,
      isError,
      isSuccess,
      captionClass,
      hasCaption,
      contentLeft,
      contentRight,
      isClearable,
      isLoading,
    });

    const handleClear = () => {
      onChange?.({ target: { value: '', focus: () => {} } } as ChangeEvent<HTMLInputElement>);
    };

    return (
      <label className={cnRoot}>
        {label && <p className={cnLabel}>{label}</p>}

        <div className={cnOuter}>
          {contentLeft && <div className={cnContentLeft}>{contentLeft}</div>}

          <input
            {...props}
            className={cnField}
            type={type}
            disabled={disabled || isLoading}
            value={value}
            id={inputId}
            onChange={onChange}
            ref={ref}
            onBlur={e => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
          />

          {isLoading && (
            <div className={cnContentRight}>
              <Spinner variant="default" />
            </div>
          )}

          {isShowContentRight && <div className={cnContentRight}>{contentRight}</div>}

          {isShowErrorIcon && (
            <div className={cnContentRight}>
              <SvgWarningCircle color={'var(--system-error)'} width={16} height={16} />
            </div>
          )}

          {isShowClearButton && (
            <button type="button" className={cnContentRight} onClick={handleClear}>
              <SvgCrossCircled width={16} height={16} />
            </button>
          )}
        </div>

        {hasCaption && <p className={cnCaption}>{captionText}</p>}
      </label>
    );
  }
);

BaseInput.displayName = `BaseInput`;
