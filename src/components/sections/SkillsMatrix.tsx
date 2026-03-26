import { motion } from 'framer-motion';

const builds = [
  'Multi-agent orchestration systems',
  'LLM pipelines & RAG infrastructure',
  'MCP servers & Claude integrations',
  'Cloudflare edge APIs & TypeScript backends',
  'React & Astro frontends',
];

const advises = [
  'Which processes to automate vs keep human',
  'Build vs buy for AI tooling',
  'AI readiness & adoption sequencing',
  'Governance, safety & audit trail design',
  'Enterprise stakeholder alignment',
];

function Column({ title, items, delay = 0 }: { title: string; items: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-purple-600">
        {title}
      </h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-gray-700">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function SkillsMatrix() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-3xl font-bold text-gray-900"
        >
          What I Do
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <Column title="I Build" items={builds} delay={0.1} />
          <Column title="I Advise On" items={advises} delay={0.2} />
        </div>
      </div>
    </section>
  );
}
