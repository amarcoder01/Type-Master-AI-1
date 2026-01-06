import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronDown, Keyboard, HelpCircle, Zap, Code, Users, Globe, Trophy, Shield, Headphones } from 'lucide-react';
import { useSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "How do I test my typing speed?",
    answer: "Simply visit TypeMasterAI and start typing the displayed text. Your WPM (words per minute) and accuracy will be calculated in real-time. The test takes 60 seconds by default, but you can choose 15s, 30s, 1min, 3min, or 5min durations from the settings."
  },
  {
    category: "Getting Started",
    question: "Do I need to create an account to use TypeMasterAI?",
    answer: "No! You can take unlimited typing tests without signing up. However, creating a free account allows you to save your progress, track your improvement over time, compete on leaderboards, and earn achievements."
  },
  {
    category: "Getting Started",
    question: "Is TypeMasterAI completely free?",
    answer: "Yes! TypeMasterAI is 100% free forever. All features including typing tests, code mode, multiplayer racing, AI analytics, certificates, and 23+ language support are available at no cost. No hidden fees, no premium tier."
  },
  // Typing Speed
  {
    category: "Typing Speed",
    question: "What is a good typing speed?",
    answer: "The average typing speed is around 40 WPM. 50-80 WPM is considered good for most office jobs. 80-95 WPM is very good and suitable for data entry or transcription work. 95+ WPM is excellent, and professional typists often exceed 120 WPM. The world record is over 200 WPM."
  },
  {
    category: "Typing Speed",
    question: "How is WPM (Words Per Minute) calculated?",
    answer: "TypeMasterAI uses the industry-standard WPM formula: (total characters typed / 5) / minutes elapsed. We divide by 5 because the average word length is 5 characters. This ensures our WPM results are comparable with other typing tests and official typing certifications."
  },
  {
    category: "Typing Speed",
    question: "Why is my WPM different on different tests?",
    answer: "WPM can vary based on several factors: the complexity of the text (common words vs. technical terms), your familiarity with the content, test duration (longer tests are more accurate), and even the time of day. For the most accurate results, take a 1-minute or longer test."
  },
  {
    category: "Typing Speed",
    question: "How can I improve my typing speed?",
    answer: "Practice regularly with proper technique: keep your fingers on the home row (ASDF JKL;), look at the screen instead of the keyboard, focus on accuracy before speed, and use all your fingers. Our AI analytics can identify your weak keys and provide personalized practice recommendations."
  },
  // Features
  {
    category: "Features",
    question: "What is Code Typing Mode?",
    answer: "Code Typing Mode is a specialized feature for programmers to practice typing code snippets in 20+ programming languages including JavaScript, Python, Java, C++, TypeScript, Go, Rust, Ruby, and more. It includes syntax highlighting and tracks coding-specific metrics like special character accuracy."
  },
  {
    category: "Features",
    question: "How does Multiplayer Racing work?",
    answer: "Join a race room and compete against other players in real-time. Everyone types the same paragraph simultaneously, and you can see live WPM updates for all participants. Features include ELO-based matchmaking, private rooms for friends, AI ghost racers, and anti-cheat protection."
  },
  {
    category: "Features",
    question: "What analytics does TypeMasterAI provide?",
    answer: "Our AI-powered analytics include: keystroke heatmaps showing your speed and accuracy per key, finger usage statistics, hand balance analysis, WPM trends over time, error pattern detection, consistency metrics, and personalized AI recommendations for improvement."
  },
  {
    category: "Features",
    question: "What is Stress Test Mode?",
    answer: "Stress Test Mode challenges you with visual distractions while you type, including screen shake, color shifts, glitch effects, text scrambling, and more. It's designed to test your focus and typing consistency under pressure with multiple difficulty levels from beginner to impossible."
  },
  {
    category: "Features",
    question: "What is Dictation Mode?",
    answer: "Dictation Mode uses AI-powered text-to-speech to read sentences aloud. You listen and type what you hear, improving both listening comprehension and typing skills. It's great for transcription practice, language learning, and accessibility training."
  },
  // Languages
  {
    category: "Languages",
    question: "What languages are supported?",
    answer: "TypeMasterAI supports 23+ languages including English, Spanish, French, German, Portuguese, Italian, Russian, Chinese (Simplified & Traditional), Japanese, Korean, Arabic, Hindi, Turkish, Dutch, Polish, Swedish, Czech, Romanian, Hungarian, Greek, Thai, Vietnamese, and Indonesian."
  },
  {
    category: "Languages",
    question: "Can I practice typing in multiple languages?",
    answer: "Yes! You can switch between languages at any time from the language selector in the typing test. Each language uses native text generated by AI, not just translated content, ensuring natural and contextually appropriate practice material."
  },
  // Account & Progress
  {
    category: "Account & Progress",
    question: "How do I track my progress?",
    answer: "Create a free account to save all your test results automatically. Visit your Profile to see your typing history, or the Analytics page for detailed charts, trends, and AI-powered insights about your improvement over time."
  },
  {
    category: "Account & Progress",
    question: "Can I get a typing certificate?",
    answer: "Yes! After completing a typing test, you can generate a downloadable PDF certificate showing your WPM, accuracy, and test date. Each certificate includes a unique verification ID that can be validated on our Verify page for authenticity."
  },
  {
    category: "Account & Progress",
    question: "How do achievements and badges work?",
    answer: "Earn achievements by reaching milestones like your first test, WPM goals (50, 75, 100+ WPM), accuracy targets, streak days, and more. Badges are displayed on your profile and leaderboard entries. Check your Profile to see available achievements."
  },
  // Technical
  {
    category: "Technical",
    question: "Can I use TypeMasterAI offline?",
    answer: "TypeMasterAI is a Progressive Web App (PWA) that you can install on your device. While basic functionality works offline, an internet connection is required for AI-generated content, multiplayer racing, saving results, and syncing progress across devices."
  },
  {
    category: "Technical",
    question: "What browsers are supported?",
    answer: "TypeMasterAI works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of Chrome or Firefox. The site is fully responsive and works on desktops, tablets, and mobile devices."
  },
  {
    category: "Technical",
    question: "Is my data secure?",
    answer: "Yes! We use industry-standard encryption (HTTPS/TLS) for all data transmission. Passwords are hashed using bcrypt. We never sell or share your personal data. Read our Privacy Policy for complete details on data handling and protection."
  },
  // Comparison
  {
    category: "Comparison",
    question: "How is TypeMasterAI different from Monkeytype?",
    answer: "TypeMasterAI offers all features of Monkeytype plus: AI-powered analytics with personalized recommendations, code typing mode for 20+ programming languages, real-time multiplayer racing, keystroke heatmaps, verifiable certificates, push notifications, and more advanced gamification."
  },
  {
    category: "Comparison",
    question: "Is TypeMasterAI better than Typeracer?",
    answer: "TypeMasterAI is a modern alternative to Typeracer with instant matchmaking (no waiting for races), ad-free experience, AI-generated content for unlimited variety, comprehensive analytics, code typing mode, and support for 23+ languages beyond just English."
  },
];

// Group FAQs by category
const FAQ_CATEGORIES = Array.from(new Set(FAQ_ITEMS.map(item => item.category)));

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Getting Started": HelpCircle,
  "Typing Speed": Zap,
  "Features": Keyboard,
  "Languages": Globe,
  "Account & Progress": Trophy,
  "Technical": Shield,
  "Comparison": Users,
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useSEO({
    title: 'FAQ | Frequently Asked Questions - TypeMasterAI',
    description: 'Find answers to common questions about TypeMasterAI typing tests. Learn about WPM calculation, typing speed improvement, features, languages, and more.',
    keywords: 'typing test faq, wpm questions, typing speed help, how to type faster, monkeytype alternative questions, typing test help',
    canonical: 'https://typemasterai.com/faq',
    ogUrl: 'https://typemasterai.com/faq',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const filteredFAQs = activeCategory
    ? FAQ_ITEMS.filter(item => item.category === activeCategory)
    : FAQ_ITEMS;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />

      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find answers to common questions about TypeMasterAI typing tests, features, and how to improve your typing speed.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card"
          )}
        >
          All
        </button>
        {FAQ_CATEGORIES.map(category => {
          const Icon = CATEGORY_ICONS[category] || HelpCircle;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              <Icon className="w-4 h-4" />
              {category}
            </button>
          );
        })}
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((item, index) => {
          const globalIndex = FAQ_ITEMS.indexOf(item);
          const isOpen = openItems.has(globalIndex);

          return (
            <div
              key={globalIndex}
              className="border border-border/50 rounded-xl overflow-hidden bg-card/30"
            >
              <button
                onClick={() => toggleItem(globalIndex)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-card/50 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1 block">
                    {item.category}
                  </span>
                  <span className="font-semibold text-base sm:text-lg pr-4 block">
                    {item.question}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200",
                  isOpen && "rotate-180"
                )} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-border/30 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions */}
      <section className="mt-16 text-center p-8 bg-card/30 rounded-2xl border border-border/50">
        <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Can't find what you're looking for? Chat with our AI assistant for instant help, or contact our support team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/chat">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
              <Headphones className="w-5 h-5" />
              Ask AI Assistant
            </button>
          </Link>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors">
              Contact Support
            </button>
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="mt-12 grid sm:grid-cols-3 gap-4">
        <Link href="/">
          <div className="p-4 bg-card/30 rounded-xl border border-border/50 hover:border-primary/50 transition-colors text-center cursor-pointer">
            <Keyboard className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="font-semibold">Start Typing Test</div>
          </div>
        </Link>
        <Link href="/learn">
          <div className="p-4 bg-card/30 rounded-xl border border-border/50 hover:border-primary/50 transition-colors text-center cursor-pointer">
            <HelpCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="font-semibold">Learn Touch Typing</div>
          </div>
        </Link>
        <Link href="/about">
          <div className="p-4 bg-card/30 rounded-xl border border-border/50 hover:border-primary/50 transition-colors text-center cursor-pointer">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="font-semibold">About TypeMasterAI</div>
          </div>
        </Link>
      </section>
    </div>
  );
}

