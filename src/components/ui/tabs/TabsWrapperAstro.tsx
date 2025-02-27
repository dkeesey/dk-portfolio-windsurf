import * as React from 'react';
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsWrapperProps {
  defaultValue: string;
  className?: string;
  items: TabItem[];
}

export default function TabsWrapperAstro({ defaultValue, className, items }: TabsWrapperProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Find the default tab
  const defaultTabIndex = items.findIndex(item => item.value === defaultValue);
  const activeIndex = defaultTabIndex >= 0 ? defaultTabIndex : 0;
  
  // Use a simple indicator when not mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={className}>
        <div className="w-full">
          <div className="border-b">
            <div className="flex flex-wrap -mb-px gap-2">
              {items.map((item, i) => (
                <div key={item.value} className={`py-2 px-4 text-sm font-medium ${i === activeIndex ? 'border-b-2 border-primary' : ''}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <div className="h-32 w-full animate-pulse bg-muted rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Use the full Tabs component when mounted
  return (
    <div className={className}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="w-full justify-start">
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 