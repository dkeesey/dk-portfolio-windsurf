import { Container } from '@/components/atoms/Container';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/dkeesey',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/deankeesey',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/deankeesey',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:dean@deankeesey.com',
    icon: Mail,
  },
];

const footerNavigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-12">
          {/* Main footer content */}
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand section */}
            <div className="space-y-8">
              <h2 className="text-lg font-bold">Dean Keesey</h2>
              <p className="text-sm text-muted-foreground">
                Software Engineer & Designer building modern web experiences.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation sections */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold">Navigation</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.main.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 border-t pt-8">
            <p className="text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Dean Keesey. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
