import * as React from 'react';
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
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList>
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
  );
} 