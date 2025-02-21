import React from 'react';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">{title}</h2>
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">{children}</div>
  </div>
);

export default function TypographyDemo() {
  return (
    <div className="space-y-12 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 lg:text-5xl">
          Tailwind Typography
        </h1>
        <p className="text-xl text-blue-600">
          Using Tailwind's default type scale with ShadcN UI components
        </p>
      </div>

      <Section title="Headings">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">Heading 1 (text-4xl)</h1>
          <h2 className="text-3xl font-bold text-gray-800">Heading 2 (text-3xl)</h2>
          <h3 className="text-2xl font-semibold text-gray-700">Heading 3 (text-2xl)</h3>
          <h4 className="text-xl font-medium text-gray-600">Heading 4 (text-xl)</h4>
        </div>
      </Section>

      <Section title="Text Sizes">
        <div className="grid gap-4">
          <p className="text-xs bg-blue-50 p-2 rounded">text-xs: The quick brown fox (12px)</p>
          <p className="text-sm bg-blue-100 p-2 rounded">text-sm: The quick brown fox (14px)</p>
          <p className="text-base bg-blue-200 p-2 rounded">text-base: The quick brown fox (16px)</p>
          <p className="text-lg bg-blue-300 p-2 rounded">text-lg: The quick brown fox (18px)</p>
          <p className="text-xl bg-blue-400 p-2 rounded text-white">text-xl: The quick brown fox (20px)</p>
          <p className="text-2xl bg-blue-500 p-2 rounded text-white">text-2xl: The quick brown fox (24px)</p>
        </div>
      </Section>

      <Section title="Font Weights">
        <div className="grid gap-4">
          <p className="text-lg font-thin bg-green-50 p-2 rounded">font-thin: The quick brown fox (100)</p>
          <p className="text-lg font-light bg-green-100 p-2 rounded">font-light: The quick brown fox (300)</p>
          <p className="text-lg font-normal bg-green-200 p-2 rounded">font-normal: The quick brown fox (400)</p>
          <p className="text-lg font-medium bg-green-300 p-2 rounded">font-medium: The quick brown fox (500)</p>
          <p className="text-lg font-semibold bg-green-400 p-2 rounded">font-semibold: The quick brown fox (600)</p>
          <p className="text-lg font-bold bg-green-500 p-2 rounded">font-bold: The quick brown fox (700)</p>
          <p className="text-lg font-extrabold bg-green-600 p-2 rounded text-white">font-extrabold: The quick brown fox (800)</p>
        </div>
      </Section>

      <Section title="Special Styles">
        <div className="space-y-4">
          <p className="text-lg">
            Here's some inline <code className="px-2 py-1 rounded bg-gray-200 font-mono text-sm font-semibold text-pink-500">code</code> within a paragraph.
          </p>
          <blockquote className="pl-4 border-l-4 border-blue-500 italic text-gray-600 bg-blue-50 p-4 rounded">
            "Typography is the art and technique of arranging type to make written
            language legible, readable, and appealing."
          </blockquote>
        </div>
      </Section>
    </div>
  );
}
