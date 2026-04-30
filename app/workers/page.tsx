import { Suspense } from 'react';
import WorkersPage from '@/components/workers/WorkersPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading workers...</div>}>
      <WorkersPage />
    </Suspense>
  );
}
