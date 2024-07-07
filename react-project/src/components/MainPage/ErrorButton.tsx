import { Component } from 'react';
import { ERROR_BUTTON_MESSAGE } from '../../utils/constants';

type State = {
  isError: boolean;
};

class ErrorButton extends Component<object, State> {
  state = { isError: false };

  componentDidUpdate() {
    if (this.state.isError) {
      throw new Error(ERROR_BUTTON_MESSAGE);
    }
  }

  makeError = () => {
    this.setState({ isError: true });
  };

  render() {
    return (
      <input
        type="button"
        className="search-submit"
        value="Error Button"
        onClick={this.makeError}
      />
    );
  }
}

export default ErrorButton;
