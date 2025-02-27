import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export const designTokensTabs: TabItem[] = [
  {
    value: 'colors',
    label: 'Colors',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Color System</CardTitle>
          <CardDescription>
            Our color palette is designed for accessibility and consistency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-3">
              <div className="h-16 rounded-lg border bg-background"></div>
              <div className="text-sm font-medium">Background</div>
              <div className="font-mono text-xs text-muted-foreground">
                bg-background
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-primary"></div>
              <div className="text-sm font-medium">Primary</div>
              <div className="font-mono text-xs text-muted-foreground">
                bg-primary
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-secondary"></div>
              <div className="text-sm font-medium">Secondary</div>
              <div className="font-mono text-xs text-muted-foreground">
                bg-secondary
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-muted"></div>
              <div className="text-sm font-medium">Muted</div>
              <div className="font-mono text-xs text-muted-foreground">
                bg-muted
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    value: 'typography',
    label: 'Typography',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Typography Scale</CardTitle>
          <CardDescription>
            Type scale for consistent text hierarchy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <div className="mb-4 text-sm text-muted-foreground">
                Font Family: Inter
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold">Heading 1</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-4xl font-bold
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">Heading 2</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-3xl font-semibold
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">Heading 3</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-2xl font-semibold
                  </div>
                </div>
                <div>
                  <div className="text-xl font-medium">Heading 4</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-xl font-medium
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    value: 'spacing',
    label: 'Spacing',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Spacing Scale</CardTitle>
          <CardDescription>
            8-point grid system for consistent spacing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 bg-primary"></div>
              <div>Space 4 (1rem)</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 bg-primary"></div>
              <div>Space 8 (2rem)</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-primary"></div>
              <div>Space 12 (3rem)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
];

export const componentsTabs: TabItem[] = [
  {
    value: 'buttons',
    label: 'Buttons',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>
            Interactive button components with multiple variants and states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mb-4 text-sm text-muted-foreground">Style Variants</div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Primary actions and critical operations
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Secondary and tertiary actions
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="mb-4 text-sm text-muted-foreground">Size Variants</div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Different sizes for various contexts and hierarchies
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="mb-4 text-sm text-muted-foreground">States</div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button disabled>Disabled</Button>
              <div className="space-y-2">
                <Button className="w-full cursor-not-allowed opacity-50">
                  <span className="mr-2">Loading</span>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                </Button>
                <div className="text-xs text-muted-foreground">
                  Loading state with spinner
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full cursor-not-allowed opacity-50">
                  <span className="mr-2">Processing</span>
                  <div className="h-4 w-4 animate-pulse rounded-full bg-current"></div>
                </Button>
                <div className="text-xs text-muted-foreground">
                  Processing state with pulse
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <p className="text-sm text-muted-foreground">
              Import from{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                @/components/ui/button
              </code>
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Radix UI Button primitive and styled with Tailwind CSS
            </p>
          </div>
        </CardFooter>
      </Card>
    ),
  },
  {
    value: 'badges',
    label: 'Badges',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Badge Variants</CardTitle>
          <CardDescription>
            Status indicators and labels with different styles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="mb-4 text-sm text-muted-foreground">Style Variants</div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Primary status indicators and labels
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="outline" className="bg-background">
                    <span className="mr-1">✓</span> Completed
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    <span className="mr-1">⚠</span> Warning
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Subtle status indicators and tags
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="mb-4 text-sm text-muted-foreground">
              Common Use Cases
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">New</Badge>
                <Badge variant="outline">Documentation</Badge>
                <Badge variant="destructive">Breaking Change</Badge>
                <Badge>Feature</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Examples of badges in a real-world context
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full space-y-2">
            <p className="text-sm text-muted-foreground">
              Import from{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                @/components/ui/badge
              </code>
            </p>
            <p className="text-xs text-muted-foreground">
              Built with Radix UI Badge primitive and styled with Tailwind CSS
            </p>
          </div>
        </CardFooter>
      </Card>
    ),
  },
  {
    value: 'cards',
    label: 'Cards',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Card Examples</CardTitle>
          <CardDescription>
            Different card layouts and use cases
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card layout</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a basic card example showing the standard layout.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>With multiple actions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                This card demonstrates multiple interactive elements.
              </p>
              <div className="flex gap-2">
                <Badge>Featured</Badge>
                <Badge variant="secondary">New</Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </CardContent>
      </Card>
    ),
  },
]; 