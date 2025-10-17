export type CommonTypes = {
  className?: string;
};

export type Sizes = 'large' | 'medium' | 'small';

export type TypeWithoutClassName<T> = Omit<T, 'className'>;

export enum InputStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
