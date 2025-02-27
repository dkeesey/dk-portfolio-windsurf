import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { designTokensTabs, componentsTabs } from './design-system-tabs';

// Used for type checking the tabItems array structure
interface TabsItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsClientRendererProps {
  defaultValue: string;
  className?: string;
  tabsType: 'designTokens' | 'components';
}

export default function TabsClientRenderer({ 
  defaultValue, 
  className, 
  tabsType 
}: TabsClientRendererProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the appropriate tabs based on the type
  const tabItems = tabsType === 'designTokens' ? designTokensTabs : componentsTabs;
  
  // Get just the metadata (without content property) for the server render
  const tabsMeta = tabItems.map(({ value, label }) => ({ value, label }));
  
  // Find the default tab index
  const defaultTabIndex = tabsMeta.findIndex(item => item.value === defaultValue);
  const activeIndex = defaultTabIndex >= 0 ? defaultTabIndex : 0;
  
  // Use a simple indicator when not mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={className}>
        <div className="w-full">
          <div className="border-b">
            <div className="flex flex-wrap -mb-px gap-2">
              {tabsMeta.map((item, i) => (
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
  
  // Use the full Tabs component when mounted, with content from the appropriate source
  return (
    <div className={className}>
      <Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="w-full justify-start">
          {tabsMeta.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabItems.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            {item.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
} 