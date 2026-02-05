'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Events Page Error:', error);
  }, [error]);

  return (
    <div className="p-8 bg-background min-h-[500px] flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-destructive">Dashboard Error</h1>
        <p className="text-muted-foreground">
          An exception occurred within the Events module. 
        </p>
      </div>

      <div className="p-6 rounded-xl bg-slate-950 text-slate-50 font-mono text-sm overflow-auto border border-slate-800 shadow-2xl">
        <div className="grid gap-6">
          <div>
            <span className="text-red-400 font-bold uppercase tracking-wider text-xs block mb-2">Error Message</span>
            <p className="text-lg leading-relaxed text-red-50 font-semibold border-l-4 border-red-500 pl-4">
              {error.message || "Unknown Error"}
            </p>
          </div>
          
          {error.digest && (
             <div>
              <span className="text-blue-400 font-bold uppercase tracking-wider text-xs block mb-2">Digest ID</span>
              <p className="font-mono text-blue-200 bg-blue-500/10 p-2 rounded w-fit">{error.digest}</p>
            </div>
          )}

          <div>
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs block mb-2">Stack Trace</span>
            <div className="bg-black/50 p-4 rounded-lg overflow-x-auto">
              <pre className="whitespace-pre-wrap text-slate-400 leading-6 text-xs">
                {error.stack || "No stack trace available in production"}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default" size="lg">
          Attempt Recovery
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline" size="lg">
          Reload Page
        </Button>
      </div>
    </div>
  );
}
