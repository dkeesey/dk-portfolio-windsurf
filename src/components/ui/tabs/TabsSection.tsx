import * as React from 'react';
import { Tabs } from '@/components/ui/tabs';

interface TabsSectionProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsSection({ defaultValue, className, children }: TabsSectionProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className}>
      {children}
    </Tabs>
  );
} 