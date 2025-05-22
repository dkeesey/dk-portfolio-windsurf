import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ContactSubmission } from '@/lib/supabase-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

export function ContactSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load contact submissions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateSubmissionStatus(id: string, status: string) {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Update local state
      setSubmissions(submissions.map(sub => 
        sub.id === id ? { ...sub, status } : sub
      ));

      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }

      toast({
        title: 'Status Updated',
        description: `Submission status changed to ${status}.`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update submission status.',
        variant: 'destructive',
      });
    }
  }

  // Format date for display
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = searchTerm === '' ||
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="w-full sm:w-1/3">
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-1/4">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="notified">Notified</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={fetchSubmissions} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh'}
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No contact submissions found.
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {formatDate(submission.created_at)}
                  </TableCell>
                  <TableCell>{submission.name}</TableCell>
                  <TableCell>
                    <a 
                      href={`mailto:${submission.email}`} 
                      className="text-blue-600 hover:underline"
                    >
                      {submission.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={submission.subject}>
                      {submission.subject}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      submission.status === 'notified' ? 'bg-purple-100 text-purple-800' :
                      submission.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {submission.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Submission Detail Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        {selectedSubmission && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Contact Submission Details</DialogTitle>
              <DialogDescription>
                Received on {formatDate(selectedSubmission.created_at)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Name:</span>
                <span className="col-span-3">{selectedSubmission.name}</span>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Email:</span>
                <a 
                  href={`mailto:${selectedSubmission.email}`}
                  className="col-span-3 text-blue-600 hover:underline"
                >
                  {selectedSubmission.email}
                </a>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Subject:</span>
                <span className="col-span-3">{selectedSubmission.subject}</span>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <span className="font-medium">Message:</span>
                <div className="col-span-3 whitespace-pre-line bg-gray-50 p-4 rounded-md border">
                  {selectedSubmission.message}
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-medium">Status:</span>
                <Select
                  value={selectedSubmission.status}
                  onValueChange={(value) => updateSubmissionStatus(selectedSubmission.id, value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="notified">Notified</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedSubmission.user_agent && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="font-medium">User Agent:</span>
                  <span className="col-span-3 text-xs text-gray-500 truncate" title={selectedSubmission.user_agent}>
                    {selectedSubmission.user_agent}
                  </span>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  window.location.href = `mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`;
                  updateSubmissionStatus(selectedSubmission.id, 'replied');
                }}
              >
                Reply via Email
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
