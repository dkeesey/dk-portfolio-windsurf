import React from 'react';

export default function DesignDemo() {
  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Design System Demo</h1>
        <p className="text-muted-foreground">This showcases our design system components and colors</p>
      </section>

      <div className="grid gap-4">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90">
          Primary Button
        </button>
        
        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90">
          Secondary Button
        </button>

        <div className="p-4 bg-card text-card-foreground rounded-md border border-border">
          Card Component
        </div>

        <div className="p-4 bg-muted text-muted-foreground rounded-md">
          Muted Content
        </div>

        <div className="p-4 bg-accent text-accent-foreground rounded-md">
          Accent Section
        </div>
      </div>
    </div>
  );
}
