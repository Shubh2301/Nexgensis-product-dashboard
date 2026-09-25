function EmptyState({ message = "No data found." }) {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow">
      <p className="text-gray-500">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;