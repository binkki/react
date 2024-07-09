import React, { ReactNode } from 'react';
import NotFound from '../NotFound/NotFound';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

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
    return this.state.hasError ? <NotFound /> : this.props.children;
  }
}
