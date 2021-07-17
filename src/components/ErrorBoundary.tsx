import { Component, PropsWithChildren, ReactElement } from "react";

type FallbackRender = (props: { error: Error | null }) => ReactElement;
type IErrorBoundaryProps = PropsWithChildren<{
  fallbackRender: FallbackRender;
}>;

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
