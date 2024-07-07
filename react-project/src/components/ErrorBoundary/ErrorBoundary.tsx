import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types';

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.log(error.message);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render() {
    return this.state.hasError ? (
      <div className="error-wrapper">
        <span>Some Error</span>
        <input
          type="button"
          className="search-submit"
          value="Go home"
          onClick={this.resetErrorBoundary}
        />
      </div>
    ) : (
      this.props.children
    );
  }
}
