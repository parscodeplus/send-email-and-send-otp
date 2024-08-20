'use client'

import Link from 'next/link'
import {
  resetServiceWorker,
  unregisterServiceWorkers,
} from '@/utils/sw/service-worker'
import { Button } from '@/components/ui/button'

export default function DebugActions() {
  return (
    <>
      <h3 className={'text-center text-black'}>Debug actions</h3>
      <Button onClick={resetServiceWorker} className={''}>
        Reset SW
      </Button>
      <Button onClick={unregisterServiceWorkers} className={''}>
        Remove SW
      </Button>
      <Link href="/">Back to home</Link>
    </>
  )
}
