'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardListContainer from './list/dashboard-list.container';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <DashboardListContainer />
    </>
  );
}
