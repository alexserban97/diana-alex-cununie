import { useEffect, useState } from 'react';
import { usePageTracking } from '@/hooks/usePageTracking';
import { Button } from "@/components/ui/button"

const Index = () => {
  // Add page tracking
  usePageTracking();

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background lg:space-x-0">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Acesta este un landing page
          </h2>
          <div className="space-x-2">
            <Button>
              Vezi documentatia
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Index;
