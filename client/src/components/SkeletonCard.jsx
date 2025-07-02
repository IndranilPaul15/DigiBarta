export default function SkeletonCard({ small = false }) {
  return (
    <div
      className={`animate-pulse my-2 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${
        small ? "flex gap-3 h-28" : "flex-col"
      } bg-white dark:bg-gray-800 shadow`}
    >
      <div
        className={`${
          small ? "w-28 h-full" : "w-full aspect-[16/9]"
        } bg-gray-300 dark:bg-gray-700`}
      ></div>
      <div className="p-3 space-y-2 w-full">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}
