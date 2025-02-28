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
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            A minimalist color system focusing on clarity and readability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-3">
              <div className="h-16 rounded-lg border bg-white"></div>
              <div className="text-sm font-medium">White</div>
              <div className="font-mono text-xs text-muted-foreground">
                #ffffff
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-[#eee]"></div>
              <div className="text-sm font-medium">Light Gray</div>
              <div className="font-mono text-xs text-muted-foreground">
                #eeeeee
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-primary"></div>
              <div className="text-sm font-medium">Primary</div>
              <div className="font-mono text-xs text-muted-foreground">
                Tailwind Primary
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-16 rounded-lg bg-gray-300"></div>
              <div className="text-sm font-medium">Border</div>
              <div className="font-mono text-xs text-muted-foreground">
                #d1d5db
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
          <CardTitle>Typography</CardTitle>
          <CardDescription>
            Clean, readable type scale using Inter font.
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
                  <div className="text-4xl font-bold">Large Heading</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-4xl font-bold
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold">Medium Heading</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-3xl font-semibold
                  </div>
                </div>
                <div>
                  <div className="text-xl font-medium">Small Heading</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-xl font-medium
                  </div>
                </div>
                <div>
                  <div className="text-base">Body Text</div>
                  <div className="mt-1 font-mono text-sm text-muted-foreground">
                    text-base
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
];

export const componentsTabs: TabItem[] = [
  {
    value: 'badges',
    label: 'Badges',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Badge Variants</CardTitle>
          <CardDescription>
            Different badge styles for various contexts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="mb-4 text-sm text-muted-foreground">Variants</div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="skill">Skill</Badge>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="mb-4 text-sm text-muted-foreground">
              Practical Examples
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Frontend</Badge>
              <Badge variant="skill">React</Badge>
              <Badge variant="outline">SEO</Badge>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    ),
  },
  {
    value: 'cards',
    label: 'Cards',
    content: (
      <Card>
        <CardHeader>
          <CardTitle>Card Styles</CardTitle>
          <CardDescription>
            Flexible card layouts with hover effects
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Project Card</CardTitle>
              <CardDescription>Interactive project showcase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge variant="skill">Astro</Badge>
                <Badge variant="skill">React</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Skill Card</CardTitle>
              <CardDescription>Skill level representation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div className="h-full bg-primary rounded-full w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    ),
  },
]; 