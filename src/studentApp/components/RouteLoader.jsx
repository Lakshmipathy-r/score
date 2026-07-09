/**
 * RouteLoader — lightweight fallback shown by <Suspense> while a lazy
 * route chunk is being downloaded over the network.
 *
 * Kept intentionally minimal: no timers, no animations that would distract
 * the user for the ~50-200ms it takes to fetch a cached chunk.
 */
const RouteLoader = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center font-mono">
    {/* Pulsing bar — matches the app's neon aesthetic */}
    <div className="flex flex-col items-center gap-4">
      <div className="h-[2px] w-48 bg-surface overflow-hidden relative">
        <div className="absolute h-full bg-primary animate-[shimmer_1s_ease-in-out_infinite]" style={{ width: '40%', animation: 'shimmer 1s ease-in-out infinite' }} />
      </div>
      <span className="text-[10px] text-text-muted uppercase tracking-[0.4em]">Loading module...</span>
    </div>
  </div>
);

export default RouteLoader;
