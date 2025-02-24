import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "h-9 w-9 px-0"
        )}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Command.Input
                placeholder="Search..."
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group heading="Projects">
                <Command.Item onSelect={() => window.location.href = "/projects"}>
                  All Projects
                </Command.Item>
              </Command.Group>
              <Command.Group heading="Pages">
                <Command.Item onSelect={() => window.location.href = "/blog"}>
                  Blog
                </Command.Item>
                <Command.Item onSelect={() => window.location.href = "/design-system"}>
                  Design System
                </Command.Item>
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
} 