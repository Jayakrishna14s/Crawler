export default function LoadingDots() {
  return (
    <div className="flex space-x-3 text-gray-600 ml-2 mt-2">
      <span className="animate-loading-dot text-3xl">•</span>
      <span className="animate-loading-dot text-3xl delay-150">•</span>
      <span className="animate-loading-dot text-3xl delay-300">•</span>
    </div>
  );
}
