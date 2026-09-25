function ErrorMessage({
  message = "Something went wrong.",
  fullPage = true,
}) {
  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          {message}
        </p>
      </div>
    );
  }

  return (
    <p className="text-sm text-red-500">
      {message}
    </p>
  );
}

export default ErrorMessage;