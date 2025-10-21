interface Params {
  isError?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  errorMessage?: string;
  captionMessage?: string;
}

enum CaptionClasses {
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default',
}

export const getCaptionOptions = ({ isError, isSuccess, errorMessage, successMessage, captionMessage }: Params) => {
  switch (true) {
    case isError:
      return {
        captionText: errorMessage,
        captionClass: CaptionClasses.ERROR,
      };
    case isSuccess:
      return {
        captionText: successMessage,
        captionClass: CaptionClasses.SUCCESS,
      };
    default: {
      return {
        captionText: captionMessage,
        captionClass: CaptionClasses.DEFAULT,
      };
    }
  }
};

