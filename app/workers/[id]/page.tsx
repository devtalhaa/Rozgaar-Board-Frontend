import WorkerProfile from '@/components/profile/WorkerProfile';

export default function Page({ params }: { params: { id: string } }) {
  return <WorkerProfile workerId={params.id} />;
}
