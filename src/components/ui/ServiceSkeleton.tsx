export default function ServiceSkeleton() {
  return (
    <div className="flex-shrink-0 w-[300px] glass-medium border border-neon-primary/20 rounded-xl p-6 animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-slate-700/50 rounded-lg mr-4" />
        <div className="h-6 bg-slate-700/50 rounded w-32" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-700/30 rounded w-full" />
        <div className="h-4 bg-slate-700/30 rounded w-5/6" />
        <div className="h-4 bg-slate-700/30 rounded w-4/6" />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="h-8 bg-slate-700/40 rounded w-24" />
        <div className="h-8 w-8 bg-slate-700/30 rounded-full" />
      </div>
    </div>
  );
}