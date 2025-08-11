export default function BlogLoading() {
  return (
    <div className="pt-20 pb-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400">Loading blog content...</p>
    </div>
  )
}
