import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="glass-panel p-6 rounded-2xl animate-pulse">
      <div className="flex gap-4">
        {}
        <div className="w-10 h-24 bg-slate-200 dark:bg-neutral-800 rounded-xl"></div>
        
        {}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between">
            <div className="w-20 h-6 bg-slate-200 dark:bg-neutral-800 rounded-full"></div>
            <div className="w-16 h-4 bg-slate-200 dark:bg-neutral-800 rounded"></div>
          </div>
          <div className="w-3/4 h-8 bg-slate-200 dark:bg-neutral-800 rounded"></div>
          <div className="w-full h-16 bg-slate-200 dark:bg-neutral-800 rounded"></div>
          <div className="flex gap-2">
            <div className="w-12 h-6 bg-slate-200 dark:bg-neutral-800 rounded"></div>
            <div className="w-12 h-6 bg-slate-200 dark:bg-neutral-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}