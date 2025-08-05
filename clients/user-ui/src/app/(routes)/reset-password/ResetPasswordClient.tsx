'use client'

import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';


export default function Page() {
  return (
    <Suspense fallback={null /* atau skeleton/loading kecil */}>
      <ResetPasswordClient />
    </Suspense>
  );
}