import { useState, useEffect } from 'react';
import { useNavigate } from '@/lib/hooks/useNavigate';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { getCollection } from 'astro:content';
import { FileText, FolderGit2 } from 'lucide-react';

type SearchableItem = {
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'project';
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchableItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      getCollection('blog'),
      getCollection('projects')
    ]).then(([posts, projects]) => {
      setItems([
        ...posts.map((post) => ({
          title: post.data.title,
          description: post.data.description,
          url: `/blog/${post.id}`,
          type: 'blog' as const,
        })),
        ...projects.map((project) => ({
          title: project.data.title,
          description: project.data.description,
          url: `/projects/${project.id}`,
          type: 'project' as const,
        })),
      ]);
    });
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-muted-foreground hover:bg-accent"
      >
        <span>Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts and projects..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Blog Posts">
            {items
              .filter((item) => item.type === 'blog')
              .map((item) => (
                <CommandItem
                  key={item.url}
                  value={item.title}
                  onSelect={() => {
                    navigate(item.url);
                    setOpen(false);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Projects">
            {items
              .filter((item) => item.type === 'project')
              .map((item) => (
                <CommandItem
                  key={item.url}
                  value={item.title}
                  onSelect={() => {
                    navigate(item.url);
                    setOpen(false);
                  }}
                >
                  <FolderGit2 className="mr-2 h-4 w-4" />
                  {item.title}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
} 