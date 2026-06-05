export default function TestimonialSkeleton() {
  return (
    <div className="w-full max-w-2xl glass-medium border border-neon-primary/20 rounded-2xl p-8 animate-pulse">
      <div className="flex items-start mb-6">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full mr-4" />
        <div className="flex-1">
          <div className="h-6 bg-slate-700/50 rounded w-48 mb-2" />
          <div className="h-4 bg-slate-700/30 rounded w-32" />
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-slate-700/40 rounded-sm" />
          ))}
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-slate-700/30 rounded w-full" />
          <div className="h-4 bg-slate-700/30 rounded w-5/6" />
          <div className="h-4 bg-slate-700/30 rounded w-4/6" />
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-slate-700/30">
        <div>
          <div className="h-5 bg-slate-700/40 rounded w-32 mb-2" />
          <div className="h-4 bg-slate-700/30 rounded w-24" />
        </div>
        <div className="h-8 bg-slate-700/30 rounded w-20" />
      </div>
    </div>
  );
}