import classNames from 'classnames/bind';

import { SpinnerProps } from '../spinner';
import classes from './spinner.module.scss';

type PickedSpinnerProps = Pick<SpinnerProps, 'className' | 'size'>;

const cn = classNames.bind(classes);

export const getClasses = ({ className, size }: PickedSpinnerProps) => {
  const cnRoot = cn('spinner', className, `spinner--${size}`);

  return {
    cnRoot,
  };
};
