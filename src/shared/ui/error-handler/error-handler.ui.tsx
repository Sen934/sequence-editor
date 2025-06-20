type ErrorHandlerProps = {
  error: Error;
  resetErrorBoundary?: (...args: unknown[]) => void;
};

export const ErrorHandler = (props: ErrorHandlerProps) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div>
      <h3>Something went wrong.</h3>
      {import.meta.env.DEV && (
        <>
          <ul className="error-messages">
            <li key={error.message}>{error.message}</li>
          </ul>
          <pre>{error.stack}</pre>
        </>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
