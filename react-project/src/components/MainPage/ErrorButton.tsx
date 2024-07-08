import { useEffect, useState } from 'react';
import { ERROR_BUTTON_MESSAGE } from '../../utils/constants';

const ErrorButton = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error(ERROR_BUTTON_MESSAGE);
    }
  }, [error]);

  const makeError = () => {
    setError(true);
  };

  return (
    <input
      type="button"
      className="search-submit"
      value="Error Button"
      onClick={makeError}
    />
  );
};

export default ErrorButton;
