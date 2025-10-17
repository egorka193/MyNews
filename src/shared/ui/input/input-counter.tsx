import { forwardRef } from 'react';

import { BaseInput, BaseInputProps } from '../input/base-input';

export interface InputCounterProps extends Omit<BaseInputProps, 'isClearable'> {
  maxLength: number;
  maxLengthErrorMessage?: string;
}

export const InputCounter = forwardRef<HTMLInputElement, InputCounterProps>(
  ({ maxLength, maxLengthErrorMessage, ...props }, ref) => {
    const count = props.value ? props.value.toString().length : 0;

    return (
      <BaseInput
        {...props}
        ref={ref}
        maxLength={maxLength}
        contentRight={`${count}/${maxLength}`}
        errorMessage={count > maxLength ? maxLengthErrorMessage : ''}
        hasErrorIcon={false}
      />
    );
  }
);

InputCounter.displayName = `InputCounter`;
