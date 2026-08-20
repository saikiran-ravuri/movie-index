import { Component } from "react";
import { TriangleAlert, RotateCcw } from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#f8f4ec] p-6">
          <div className="w-full max-w-md rounded-2xl border border-[#e6dcc8] bg-white px-6 py-12 text-center shadow-md">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#e6dcc8] bg-[#f8f4ec] text-[#b8862d]">
              <TriangleAlert size={22} aria-hidden="true" />
            </div>

            <h1 className="mt-4 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1f2329]">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-stone-600">
              We encountered an unexpected error. Please try reloading the page or go back home.
            </p>

            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#b8862d] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#9b6417]"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
