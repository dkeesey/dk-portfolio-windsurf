import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

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
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
              <input
                className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type a command or search..."
              />
            </Command>
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            <Command.Group heading="Suggestions">
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.location.href = "/";
                }}
                className="flex cursor-pointer items-center px-2 py-1 text-sm"
              >
                <span>Home</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setOpen(false);
                  window.location.href = "/about";
                }}
                className="flex cursor-pointer items-center px-2 py-1 text-sm"
              >
                <span>About</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </DialogContent>
      </Dialog>
    </>
  );
} 