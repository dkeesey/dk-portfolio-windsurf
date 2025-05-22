import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      // First, submit to Supabase
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            user_agent: navigator.userAgent,
          }
        ]);

      if (supabaseError) {
        throw new Error(`Supabase error: ${supabaseError.message}`);
      }

      // For production: still submit to Netlify if deployed
      if (import.meta.env.PROD) {
        try {
          // Get the form element from the DOM
          const formElement = document.querySelector('form[name="contact"]') as HTMLFormElement;
          if (!formElement) throw new Error('Form not found');

          // Create form data from the form element (this preserves hidden fields)
          const formData = new FormData(formElement);

          // Ensure all data from our validated React form is included
          Object.entries(data).forEach(([key, value]) => {
            formData.set(key, value as string);
          });

          // Submit to Netlify Forms as a backup
          await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
          });
        } catch (netlifyError) {
          // Log but don't fail since Supabase submission was successful
          console.warn('Netlify submission failed:', netlifyError);
        }
      }

      // Success message
      toast({
        title: 'Message sent!',
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or use the direct email link.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  }

  return (
    <div>
      <Form {...form}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Hidden fields for Netlify Forms */}
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              Don't fill this out if you're human: <input name="bot-field" />
            </label>
          </p>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="What's this about?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message..."
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="mb-4 text-muted-foreground">
          Prefer to schedule a quick call?
        </p>
        <Button
          variant="outline"
          asChild
          className="w-full"
        >
          <a
            href="https://calendly.com/dean-keesey/15min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Schedule a 15-Minute Call
          </a>
        </Button>
      </div>


    </div>
  );
}
