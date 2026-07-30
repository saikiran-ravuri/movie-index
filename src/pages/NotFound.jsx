function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F7F2E9] px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9B6417]">
          Error 404
        </p>

        <h1 className="mt-4 font-serif text-5xl font-bold text-stone-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-stone-600">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}

export default NotFound;
