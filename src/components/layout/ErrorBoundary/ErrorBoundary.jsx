import { Component } from 'react';
import ErrorState from '@/components/ui/ErrorState/ErrorState';

// Catches render errors in the page below it so one broken screen does not
// blank the whole app. `resetKey` (the current path) clears the error when
// the user navigates elsewhere.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.className}>
          <ErrorState
            title="This page hit a problem"
            message="Reload the page to try again. Your cart is saved."
            onRetry={() => window.location.reload()}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
