function Container({ children, className = "" }) {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-[1400px]
        px-6
        sm:px-8
        lg:px-12
        xl:px-16
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Container;
