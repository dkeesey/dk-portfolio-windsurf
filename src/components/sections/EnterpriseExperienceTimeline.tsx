import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Trophy, TrendingUp } from 'lucide-react';

interface ExperienceItemProps {
  period: string;
  title: string;
  company: string;
  companySize?: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  index: number;
  isEnterprise?: boolean;
  logoPath?: string;
  dualLogos?: { primary: string; secondary: string }; // For companies with two logos
  clientLogos?: string[]; // For agencies showing client work
  companyType?: 'fortune500' | 'unicorn' | 'enterprise' | 'consulting';
}

function ExperienceItem({ 
  period, 
  title, 
  company, 
  companySize,
  location, 
  description, 
  achievements, 
  technologies, 
  index, 
  isEnterprise = false,
  logoPath,
  dualLogos,
  clientLogos,
  companyType
}: ExperienceItemProps) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  const getCompanyTypeIcon = () => {
    switch (companyType) {
      case 'fortune500':
        return <Building2 className="h-4 w-4 text-blue-600" />;
      case 'unicorn':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      case 'enterprise':
        return <Building2 className="h-4 w-4 text-green-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative border-l-2 pl-8 pb-12 last:pb-0 ${
        isEnterprise ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      {/* Timeline dot */}
      <div className={`absolute -left-2 top-0 h-4 w-4 rounded-full border-2 ${
        isEnterprise 
          ? 'bg-blue-500 border-blue-500' 
          : 'bg-white border-gray-300'
      }`} />

      {/* Enterprise highlight */}
      {isEnterprise && (
        <div className="mb-3">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 pointer-events-none">
            <Trophy className="h-3 w-3 mr-1" />
            Enterprise Experience
          </Badge>
        </div>
      )}

      <div className="bg-white rounded-lg border shadow-sm p-6 hover:shadow-md transition-shadow">
        {/* Header Section - 2-column on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column: Title, Company, Date */}
          <div className="order-2 lg:order-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-1 flex-wrap">
              {getCompanyTypeIcon()}
              <span className="font-medium">{company}</span>
            </div>
            {companySize && (
              <div className="mb-2">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {companySize}
                </span>
              </div>
            )}
            <div className="text-sm text-gray-500">
              {period} • {location}
            </div>
          </div>

          {/* Right Column: Logos */}
          <div className="order-1 lg:order-2">
            {(dualLogos || logoPath || clientLogos) && (
              <div className="flex justify-center items-center rounded-lg p-6 min-h-[120px] lg:min-h-[140px] bg-white border border-gray-200">
                {dualLogos ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
                    <img 
                      src={dualLogos.primary} 
                      alt={`${company.split(' ')[0]} logo`} 
                      className="h-12 md:h-16 w-auto max-w-[140px] md:max-w-[120px] object-contain"
                    />
                    <div className="flex md:flex-col items-center gap-2 md:gap-1">
                      <div className="h-px md:h-4 md:w-px bg-gray-300 w-6 md:w-0"></div>
                      <span className="text-gray-400 text-xs whitespace-nowrap">part of</span>
                      <div className="h-px md:h-4 md:w-px bg-gray-300 w-6 md:w-0"></div>
                    </div>
                    <img 
                      src={dualLogos.secondary} 
                      alt={`${company.split('(')[1]?.replace(')', '') || 'parent company'} logo`} 
                      className="h-10 md:h-14 w-auto max-w-[120px] md:max-w-[100px] object-contain"
                    />
                  </div>
                ) : clientLogos ? (
                  <div className="flex flex-col items-center justify-center gap-4 w-full">
                    {/* Agency Logo */}
                    <div className="flex items-center justify-center">
                      <img 
                        src={logoPath} 
                        alt={`${company.split(' ')[0]} logo`} 
                        className="h-16 md:h-20 w-auto max-w-[200px] md:max-w-[260px] object-contain"
                      />
                    </div>
                    {/* Client Logos */}
                    <div className="flex flex-col items-center gap-2 w-full">
                      <span className="text-gray-400 text-xs font-medium">Enterprise Clients</span>
                      <div className="flex items-center justify-center gap-4 flex-wrap">
                        {clientLogos.map((clientLogo, idx) => (
                          <img 
                            key={idx}
                            src={clientLogo} 
                            alt={`Client ${idx + 1} logo`} 
                            className="h-8 md:h-10 w-auto max-w-[80px] md:max-w-[100px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : logoPath && (
                  <div className="flex items-center justify-center w-full h-full">
                    <img 
                      src={logoPath} 
                      alt={`${company} logo`} 
                      className={
                        logoPath === '/images/companies/agency-com-cropped.svg' 
                          ? "h-20 md:h-24 w-auto max-w-[200px] md:max-w-[260px] object-contain" // Larger width for horizontal logo
                          : "h-20 md:h-24 w-auto max-w-[180px] md:max-w-[240px] object-contain" // Standard sizing
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Section - Full width below header */}
        <div>
          <p className="text-gray-700 mb-4">{description}</p>

          {achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Key Achievements:</h4>
              <ul className="space-y-1">
                {achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EnterpriseExperienceTimeline() {
  const experiences = [
    // Recent Consulting Work
    {
      period: '2022 - Present',
      title: 'Senior Frontend Engineer & Consultant',
      company: 'Independent Practice',
      location: 'Oakland, CA',
      description: 'Full-stack development and SEO optimization for diverse clients, focusing on modern React ecosystems and performance optimization.',
      achievements: [
        'Delivered 20+ web solutions with 90+ Lighthouse performance scores',
        'Achieved page 1 Google rankings for competitive local search terms',
        'Modernized legacy art portfolio with Astro framework and scroll-based UX'
      ],
      technologies: ['React', 'Next.js', 'Astro', 'TypeScript', 'SEO', 'WordPress'],
      index: 0,
      companyType: 'consulting' as const
    },
    
    // Support Logic
    {
      period: 'Sep 2021 - Apr 2022',
      title: 'Senior UI Engineer',
      company: 'Support Logic (AI-Powered Customer Success)',
      companySize: 'Series B Startup',
      location: 'San Jose, CA',
      description: 'Led frontend development for AI-powered customer success platform using Natural Language Processing for sentiment analysis.',
      achievements: [
        'Developed alpha version of Agent Support Experience (ASX) product',
        'Built React components connecting to Salesforce API for enterprise customers',
        'Collaborated with Product Owners and UX designers using Agile methodologies'
      ],
      technologies: ['React', 'TypeScript', 'React Query', 'Styled Components', 'Redux', 'Salesforce API'],
      index: 1,
      isEnterprise: true,
      companyType: 'unicorn' as const,
      logoPath: '/images/companies/support-logic-logo.svg'
    },

    // Masumi Hayashi Foundation
    {
      period: 'Jun 2016 - Present',
      title: 'Founder & Technical Director',
      company: 'Masumi Hayashi Foundation',
      location: 'Oakland, CA',
      description: 'Founded nonprofit to preserve and promote globally renowned Japanese-American artist\'s legacy through digital platforms and art book publishing.',
      achievements: [
        'Built Progressive Web Application with 90+ Google Lighthouse score',
        'Implemented CI/CD pipeline with Gatsby Cloud, Netlify, and GitHub',
        'Placed artwork in major museums: SF MOMA, LACMA, Smithsonian Asian Art',
        'Granted digital rights for Apple Film "Swan Song" starring Mahershala Ali'
      ],
      technologies: ['React', 'Gatsby.js', 'GraphQL', 'Styled Components', 'Netlify', 'Node.js'],
      index: 2,
      companyType: 'consulting' as const
    },

    // SuccessFactors/SAP
    {
      period: 'Jul 2014 - May 2016',
      title: 'Senior UI Engineer',
      company: 'SuccessFactors (SAP)',
      companySize: 'Fortune 50',
      location: 'San Francisco, CA',
      description: 'Developed enterprise HR platform features for Fortune 500 companies using SAP\'s proprietary UI framework.',
      achievements: [
        'Designed "Action Search" feature with 2-phase auto-complete functionality',
        'Successfully integrated search feature across all suite SPA product pages',
        'Delivered admin control panels moving SSH key config to user-based controls',
        'Worked with SAP UI5 component framework for enterprise-scale applications'
      ],
      technologies: ['SAP UI5', 'JavaScript (ES5)', 'jQuery', 'SCSS', 'CSS3', 'HTML5'],
      index: 3,
      isEnterprise: true,
      companyType: 'fortune500' as const,
      dualLogos: {
        primary: '/images/companies/success-factors-logo.png',
        secondary: '/images/companies/sap-logo.svg'
      }
    },

    // Guidewire
    {
      period: 'Apr 2013 - Nov 2013',
      title: 'Software Engineer (Contract)',
      company: 'Guidewire Software',
      companySize: 'Insurance Technology Leader',
      location: 'Foster City, CA',
      description: 'Principal SCSS/CSS Engineer for 2013 Guidewire Suite serving insurance industry enterprises.',
      achievements: [
        'Created custom Ext.js theme for Policy Center, Claims Center, and Billing Center',
        'Delivered complete suite on time, surpassing customer expectations',
        'Filled critical internal team skill gap in advanced CSS architecture'
      ],
      technologies: ['Ext.js', 'SCSS', 'CSS3', 'JavaScript', 'Agile Methodologies'],
      index: 4,
      isEnterprise: true,
      companyType: 'enterprise' as const,
      logoPath: '/images/companies/guidewire-logo.svg'
    },

    // GreatSchools
    {
      period: 'Oct 2012 - Nov 2012',
      title: 'Frontend Engineer',
      company: 'GreatSchools.org',
      companySize: '1M+ Daily Visitors',
      location: 'San Francisco, CA',
      description: 'Led major site redesign for leading education platform serving millions of parents and educators.',
      achievements: [
        'Delivered complete site redesign on high-traffic education platform',
        'Worked with HTML5, CSS3, and jQuery for responsive user experience'
      ],
      technologies: ['HTML5', 'CSS3', 'jQuery', 'JavaScript', 'JSP', 'JST'],
      index: 5,
      isEnterprise: true,
      companyType: 'enterprise' as const,
      logoPath: '/images/companies/great-schools-logo.png'
    },

    // EA/Maxis
    {
      period: 'Oct 2008 - Sep 2009',
      title: 'Software Engineer II (Frontend)',
      company: 'Maxis Studio (Electronic Arts)',
      companySize: 'Fortune 200',
      location: 'Emeryville, CA',
      description: 'Staff Frontend Engineer for EA\'s premier simulation game studio, working on Spore.com digital ecosystem.',
      achievements: [
        'Built single-page applications for Sporepedia and MySpore platforms',
        'Delivered pixel-perfect marketing pages for AAA game launch',
        'Worked with millions of user-generated content pieces in gaming ecosystem'
      ],
      technologies: ['JavaScript', 'YUI', 'jQuery', 'HTML', 'CSS', 'Java', 'JSP', 'Direct Web Remoting'],
      index: 6,
      isEnterprise: true,
      companyType: 'fortune500' as const,
      dualLogos: {
        primary: '/images/companies/Maxis_2012_logo.svg',
        secondary: '/images/companies/ea-logo.svg'
      }
    },

    // iKnowMed
    {
      period: 'Apr 2006 - Oct 2008',
      title: 'Software Engineer II - UI',
      company: 'iKnowMed (US Oncology/McKesson)',
      companySize: 'Healthcare Technology',
      location: 'Berkeley, CA',
      description: 'Developed electronic medical records applications for cancer treatment used by nationwide oncology network.',
      achievements: [
        'Built UI for oncology-focused enterprise EMR system',
        'Collaborated with engineering team for life-critical medical software',
        'Delivered applications used by cancer treatment professionals nationwide'
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'JSP', 'JSTL', 'Java'],
      index: 7,
      isEnterprise: true,
      companyType: 'enterprise' as const,
      dualLogos: {
        primary: '/images/companies/iknowmed-80.jpg',
        secondary: '/images/companies/McKesson_Logo.svg'
      }
    },

    // Agency.com - Leadership Experience
    {
      period: '2000 - 2001',
      title: 'Frontend Team Manager',
      company: 'Agency.com (Goldman Sachs Digital)',
      companySize: 'Digital Agency for Fortune 100',
      location: 'New York City, NY',
      description: 'Managed frontend development teams building large-scale client websites including first Goldman Sachs High Net Worth platform.',
      achievements: [
        'Led client-facing supervision of multiple coding teams',
        'Built Goldman Sachs High Net Worth Investors website and research platform',
        'Managed $1M+ client website projects for Sprint, Cushman & Wakefield',
        'Performed management duties including performance reviews and recruiting'
      ],
      technologies: ['HTML', 'JavaScript', 'JSP', 'ASP', 'Flash', 'Team Leadership'],
      index: 8,
      isEnterprise: true,
      companyType: 'fortune500' as const,
      logoPath: '/images/companies/agency-com-cropped.svg',
      clientLogos: [
        '/images/companies/Goldman_Sachs.svg',
        '/images/companies/Sprint_Corporation_Logo.svg',
        '/images/companies/Cushman_&_Wakefield_logo.svg'
      ]
    },

    // Prudential
    {
      period: '1998 - 2000',
      title: 'Team Leader - Internet Strategy & Development',
      company: 'Prudential Investments',
      companySize: 'Fortune 50',
      location: 'Newark, NJ',
      description: 'Team Leader for Prudential\'s Internet Strategy and Development Group, managing digital transformation initiatives.',
      achievements: [
        'Advanced from Developer to Business Analyst to Team Leader in 2 years',
        'Automated content delivery systems for public website and intranets',
        'Managed production and distribution of financial product prospectuses',
        'Trained incoming Director of Internet Strategy on group processes'
      ],
      technologies: ['HTML', 'JavaScript', 'Perl', 'Process Automation', 'Team Leadership'],
      index: 9,
      isEnterprise: true,
      companyType: 'fortune500' as const,
      logoPath: '/images/companies/prudential-financial-cropped.svg'
    },

    // Oracle
    {
      period: '1994 - 1995',
      title: 'Field Sales Contracts Specialist',
      company: 'Oracle Corporation',
      companySize: 'Fortune 100',
      location: 'Redwood Shores, CA',
      description: 'Developed complex enterprise software licensing contracts for Oracle database and tools across multiple US regions.',
      achievements: [
        'Assembled licensing contracts ranging from $500K to $4.5M',
        'Supported Field Sales Representatives across Northeast, Central, and Southeast regions',
        'Ensured compliance with internal legal policy and executive approval structures'
      ],
      technologies: ['Oracle Database', 'Enterprise Software Licensing', 'Contract Management'],
      index: 10,
      isEnterprise: true,
      companyType: 'fortune500' as const,
      logoPath: '/images/companies/Oracle_logo.svg'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              15+ years building enterprise software at Fortune 500 companies, 
              from financial services to gaming, healthcare to SaaS platforms
            </p>
            <div className="mt-6 flex justify-center">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 pointer-events-none">
                <Building2 className="h-4 w-4 mr-2" />
                Enterprise-Scale Frontend Engineering
              </Badge>
            </div>
          </div>

          <div className="space-y-0">
            {experiences.map((experience, index) => (
              <ExperienceItem key={index} {...experience} />
            ))}
          </div>

          {/* Enterprise Credentials Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enterprise Portfolio Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                <div className="text-gray-700">Fortune 500 Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-700">Years Enterprise Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$1M+</div>
                <div className="text-gray-700">Project Values Delivered</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
