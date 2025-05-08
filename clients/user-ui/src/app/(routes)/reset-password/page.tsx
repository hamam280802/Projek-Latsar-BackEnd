'use client'

import { useSearchParams } from 'next/navigation';
import ResetPassword from '@/src/shared/Auth/ResetPassword';

const Page = () => {
  const searchParams = useSearchParams();
  const activationToken = searchParams.get("verify") ?? "";

  return (
    <div>
      <ResetPassword activationToken={activationToken} />
    </div>
  );
};

export default Page;
