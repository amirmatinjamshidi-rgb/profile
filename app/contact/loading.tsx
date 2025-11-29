export default function Loading() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="space-y-8 animate-pulse">
          <div className="h-12 bg-gray-800 rounded w-64" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-800 rounded" />
            <div className="h-6 bg-gray-800 rounded" />
            <div className="h-6 bg-gray-800 rounded" />
          </div>
        </div>
        <div className="space-y-6 animate-pulse">
          <div className="h-12 bg-gray-700 rounded" />
          <div className="h-12 bg-gray-700 rounded" />
          <div className="h-48 bg-gray-700 rounded" />
          <div className="h-14 bg-green-800 rounded" />
        </div>
      </div>
    </section>
  );
}