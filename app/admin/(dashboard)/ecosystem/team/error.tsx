'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ecosystem Team Admin Error:', error);
  }, [error]);

  return (
    <div className="p-8 bg-background min-h-[500px] flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-destructive">Dashboard Error</h1>
        <p className="text-muted-foreground">
          An exception occurred within the Ecosystem Team module.
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
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default" size="lg">
          Attempt Recovery
        </Button>
        <Button onClick={() => window.location.reload()} variant="outline" size="lg">
          Reload Page
        </Button>
        <Link href="/admin/ecosystem">
          <Button variant="outline" size="lg">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Ecosystem
          </Button>
        </Link>
      </div>
    </div>
  );
}

