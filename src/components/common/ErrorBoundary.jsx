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
        <div className="flex min-h-screen items-center justify-center bg-[#F7F2E9] p-6">
          <div className="w-full max-w-md rounded-3xl border border-[#E2D3BC] bg-white px-6 py-14 text-center shadow-[0_8px_24px_rgba(67,52,35,0.06)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E8DBC7] bg-[#F7F0E4] text-[#B8862D]">
              <TriangleAlert size={24} aria-hidden="true" />
            </div>

            <h1 className="mt-5 font-['Cormorant_Garamond'] text-3xl font-bold text-[#1F2329] sm:text-4xl">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
              We encountered an unexpected error. Please try reloading the page or go back home.
            </p>

            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#B8862D] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#9F7225] focus:outline-none focus:ring-4 focus:ring-[#B8862D]/25"
            >
              <RotateCcw size={17} aria-hidden="true" />
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
