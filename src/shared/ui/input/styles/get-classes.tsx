import classNames from 'classnames/bind';

import { BaseInputProps } from '../base-input';
import classes from './base-input.module.scss';

type PickedBaseProps = Pick<
  BaseInputProps,
  | 'size'
  | 'className'
  | 'classNameOuter'
  | 'classNameField'
  | 'disabled'
  | 'contentLeft'
  | 'contentRight'
  | 'isClearable'
  | 'isLoading'
>;

interface Props extends PickedBaseProps {
  isError?: boolean;
  isSuccess?: boolean;
  captionClass?: string;
  hasCaption?: boolean;
}

const cn = classNames.bind(classes);

export const getClasses = ({
  size,
  className,
  classNameOuter,
  classNameField,
  disabled,
  isError,
  isSuccess,
  hasCaption,
  captionClass,
  contentLeft,
  contentRight,
  isClearable,
  isLoading,
}: Props) => {
  const hasContentLeft = Boolean(contentLeft);
  const hasContentRight = Boolean(contentRight) || isError || isLoading || isClearable;

  const cnRoot = cn('input', className);

  const cnLabel = cn('input__label', {
    'input__label--disabled': disabled,
  });

  const cnOuter = cn(
    'input__outer',
    {
      ['input__outer--disabled']: disabled,
      [`input__outer--${captionClass}`]: isError || isSuccess || hasCaption,
      loading: isLoading,
    },
    classNameOuter
  );

  const cnContentLeft = cn('input-content-left', {
    ['input-content-left--disabled']: disabled,
  });

  const cnField = cn('input__field', classNameField, `input__field--${size}`, {
    [`input__field--${captionClass}`]: isError || isSuccess || hasCaption,
    'input__field--content-left': hasContentLeft,
    'input__field--content-right': hasContentRight,
    loading: isLoading,
  });

  const cnContentRight = cn('input-content-right', {
    ['input-content-right--disabled']: disabled,
    'input-content-right--error': isError,
  });

  const cnCaption = cn('input__caption', { [`input__caption--${captionClass}`]: hasCaption });

  return {
    cnRoot,
    cnLabel,
    cnOuter,
    cnContentLeft,
    cnField,
    cnContentRight,
    cnCaption,
  };
};
