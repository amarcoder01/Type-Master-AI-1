import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { ChevronDown, Keyboard, HelpCircle, Zap, Code, Users, Globe, Trophy, Shield, Headphones, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useSEO } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedLinks?: { label: string; href: string }[];
}

const FAQ_ITEMS: FAQItem[] = [
  // Getting Started
  {
    id: "how-to-test-typing-speed",
    category: "Getting Started",
    question: "How do I test my typing speed?",
    answer: "Simply visit TypeMasterAI and start typing the displayed text. Your WPM (words per minute) and accuracy will be calculated in real-time. The test takes 60 seconds by default, but you can choose 15s, 30s, 1min, 3min, or 5min durations from the settings.",
    relatedLinks: [
      { label: "Take Typing Test", href: "/" },
      { label: "What is WPM?", href: "/what-is-wpm" }
    ]
  },
  {
    id: "need-account",
    category: "Getting Started",
    question: "Do I need to create an account to use TypeMasterAI?",
    answer: "No! You can take unlimited typing tests without signing up. However, creating a free account allows you to save your progress, track your improvement over time, compete on leaderboards, and earn achievements."
  },
  {
    id: "is-free",
    category: "Getting Started",
    question: "Is TypeMasterAI completely free?",
    answer: "Yes! TypeMasterAI is 100% free forever. All features including typing tests, code mode, multiplayer racing, AI analytics, certificates, and 23+ language support are available at no cost. No hidden fees, no premium tier."
  },
  {
    id: "best-test-duration",
    category: "Getting Started",
    question: "What test duration should I use?",
    answer: "For casual practice, 1 minute is ideal. For accurate speed measurement, use 3 or 5 minutes. Job applications typically require 5-minute tests. Short 15-30 second tests are great for warm-ups."
  },
  // Typing Speed
  {
    id: "good-typing-speed",
    category: "Typing Speed",
    question: "What is a good typing speed?",
    answer: "The average typing speed is around 40 WPM. 50-80 WPM is considered good for most office jobs. 80-95 WPM is very good and suitable for data entry or transcription work. 95+ WPM is excellent, and professional typists often exceed 120 WPM. The world record is over 200 WPM.",
    relatedLinks: [
      { label: "Average Typing Speed", href: "/average-typing-speed" },
      { label: "Typing Speed Chart", href: "/typing-speed-chart" }
    ]
  },
  {
    id: "wpm-calculation",
    category: "Typing Speed",
    question: "How is WPM (Words Per Minute) calculated?",
    answer: "TypeMasterAI uses the industry-standard WPM formula: (total characters typed / 5) / minutes elapsed. We divide by 5 because the average word length is 5 characters. This ensures our WPM results are comparable with other typing tests and official typing certifications.",
    relatedLinks: [
      { label: "What is WPM?", href: "/what-is-wpm" }
    ]
  },
  {
    id: "wpm-varies",
    category: "Typing Speed",
    question: "Why is my WPM different on different tests?",
    answer: "WPM can vary based on several factors: the complexity of the text (common words vs. technical terms), your familiarity with the content, test duration (longer tests are more accurate), and even the time of day. For the most accurate results, take a 1-minute or longer test."
  },
  {
    id: "improve-speed",
    category: "Typing Speed",
    question: "How can I improve my typing speed?",
    answer: "Practice regularly with proper technique: keep your fingers on the home row (ASDF JKL;), look at the screen instead of the keyboard, focus on accuracy before speed, and use all your fingers. Our AI analytics can identify your weak keys and provide personalized practice recommendations.",
    relatedLinks: [
      { label: "How to Type Faster", href: "/how-to-type-faster" },
      { label: "Touch Typing Guide", href: "/touch-typing" }
    ]
  },
  {
    id: "typing-speed-jobs",
    category: "Typing Speed",
    question: "What typing speed do I need for a job?",
    answer: "Most office jobs require 40-50 WPM. Data entry positions typically need 60-80 WPM with high accuracy. Medical transcriptionists need 80+ WPM. Court reporters use stenography and reach 180-225 WPM. Always check specific job requirements.",
    relatedLinks: [
      { label: "Typing Test for Jobs", href: "/typing-test-jobs" },
      { label: "Data Entry Test", href: "/data-entry-typing-test" }
    ]
  },
  // Features
  {
    id: "code-mode",
    category: "Features",
    question: "What is Code Typing Mode?",
    answer: "Code Typing Mode is a specialized feature for programmers to practice typing code snippets in 20+ programming languages including JavaScript, Python, Java, C++, TypeScript, Go, Rust, Ruby, and more. It includes syntax highlighting and tracks coding-specific metrics like special character accuracy.",
    relatedLinks: [
      { label: "Try Code Mode", href: "/code-mode" }
    ]
  },
  {
    id: "multiplayer",
    category: "Features",
    question: "How does Multiplayer Racing work?",
    answer: "Join a race room and compete against other players in real-time. Everyone types the same paragraph simultaneously, and you can see live WPM updates for all participants. Features include ELO-based matchmaking, private rooms for friends, AI ghost racers, and anti-cheat protection.",
    relatedLinks: [
      { label: "Play Multiplayer", href: "/multiplayer" }
    ]
  },
  {
    id: "analytics",
    category: "Features",
    question: "What analytics does TypeMasterAI provide?",
    answer: "Our AI-powered analytics include: keystroke heatmaps showing your speed and accuracy per key, finger usage statistics, hand balance analysis, WPM trends over time, error pattern detection, consistency metrics, and personalized AI recommendations for improvement.",
    relatedLinks: [
      { label: "View Analytics", href: "/analytics" }
    ]
  },
  {
    id: "stress-test",
    category: "Features",
    question: "What is Stress Test Mode?",
    answer: "Stress Test Mode challenges you with visual distractions while you type, including screen shake, color shifts, glitch effects, text scrambling, and more. It's designed to test your focus and typing consistency under pressure with multiple difficulty levels from beginner to impossible.",
    relatedLinks: [
      { label: "Try Stress Test", href: "/stress-test" }
    ]
  },
  {
    id: "dictation-mode",
    category: "Features",
    question: "What is Dictation Mode?",
    answer: "Dictation Mode uses AI-powered text-to-speech to read sentences aloud. You listen and type what you hear, improving both listening comprehension and typing skills. It's great for transcription practice, language learning, and accessibility training.",
    relatedLinks: [
      { label: "Try Dictation Mode", href: "/dictation-mode" }
    ]
  },
  {
    id: "typing-games",
    category: "Features",
    question: "Are there typing games available?",
    answer: "Yes! TypeMasterAI offers multiple game modes including multiplayer racing, stress test challenges, and achievement hunting. The gamified experience includes XP, levels, streaks, and unlockable badges to make practice fun.",
    relatedLinks: [
      { label: "Typing Games", href: "/typing-games" }
    ]
  },
  // Languages
  {
    id: "supported-languages",
    category: "Languages",
    question: "What languages are supported?",
    answer: "TypeMasterAI supports 23+ languages including English, Spanish, French, German, Portuguese, Italian, Russian, Chinese (Simplified & Traditional), Japanese, Korean, Arabic, Hindi, Turkish, Dutch, Polish, Swedish, Czech, Romanian, Hungarian, Greek, Thai, Vietnamese, and Indonesian."
  },
  {
    id: "multiple-languages",
    category: "Languages",
    question: "Can I practice typing in multiple languages?",
    answer: "Yes! You can switch between languages at any time from the language selector in the typing test. Each language uses native text generated by AI, not just translated content, ensuring natural and contextually appropriate practice material."
  },
  // Account & Progress
  {
    id: "track-progress",
    category: "Account & Progress",
    question: "How do I track my progress?",
    answer: "Create a free account to save all your test results automatically. Visit your Profile to see your typing history, or the Analytics page for detailed charts, trends, and AI-powered insights about your improvement over time.",
    relatedLinks: [
      { label: "View Analytics", href: "/analytics" }
    ]
  },
  {
    id: "typing-certificate",
    category: "Account & Progress",
    question: "Can I get a typing certificate?",
    answer: "Yes! After completing a typing test, you can generate a downloadable PDF certificate showing your WPM, accuracy, and test date. Each certificate includes a unique verification ID that can be validated on our Verify page for authenticity.",
    relatedLinks: [
      { label: "Get Certificate", href: "/typing-certificate" },
      { label: "Verify Certificate", href: "/verify" }
    ]
  },
  {
    id: "achievements",
    category: "Account & Progress",
    question: "How do achievements and badges work?",
    answer: "Earn achievements by reaching milestones like your first test, WPM goals (50, 75, 100+ WPM), accuracy targets, streak days, and more. Badges are displayed on your profile and leaderboard entries. Check your Profile to see available achievements."
  },
  // Technical
  {
    id: "offline",
    category: "Technical",
    question: "Can I use TypeMasterAI offline?",
    answer: "TypeMasterAI is a Progressive Web App (PWA) that you can install on your device. While basic functionality works offline, an internet connection is required for AI-generated content, multiplayer racing, saving results, and syncing progress across devices."
  },
  {
    id: "browsers",
    category: "Technical",
    question: "What browsers are supported?",
    answer: "TypeMasterAI works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of Chrome or Firefox. The site is fully responsive and works on desktops, tablets, and mobile devices.",
    relatedLinks: [
      { label: "Mobile Typing Test", href: "/mobile-typing-test" }
    ]
  },
  {
    id: "data-security",
    category: "Technical",
    question: "Is my data secure?",
    answer: "Yes! We use industry-standard encryption (HTTPS/TLS) for all data transmission. Passwords are hashed using bcrypt. We never sell or share your personal data. Read our Privacy Policy for complete details on data handling and protection.",
    relatedLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" }
    ]
  },
  {
    id: "keyboard-issues",
    category: "Technical",
    question: "Some keys aren't working in the test. What should I do?",
    answer: "First, test your keyboard using our keyboard tester. If keys work there but not in the test, try: refreshing the page, clearing browser cache, disabling browser extensions, or trying a different browser. Some special keyboard layouts may need configuration.",
    relatedLinks: [
      { label: "Keyboard Tester", href: "/keyboard-test" }
    ]
  },
  // Comparison
  {
    id: "vs-monkeytype",
    category: "Comparison",
    question: "How is TypeMasterAI different from Monkeytype?",
    answer: "TypeMasterAI offers all features of Monkeytype plus: AI-powered analytics with personalized recommendations, code typing mode for 20+ programming languages, real-time multiplayer racing, keystroke heatmaps, verifiable certificates, push notifications, and more advanced gamification.",
    relatedLinks: [
      { label: "Compare with Monkeytype", href: "/monkeytype-alternative" }
    ]
  },
  {
    id: "vs-typeracer",
    category: "Comparison",
    question: "Is TypeMasterAI better than Typeracer?",
    answer: "TypeMasterAI is a modern alternative to Typeracer with instant matchmaking (no waiting for races), ad-free experience, AI-generated content for unlimited variety, comprehensive analytics, code typing mode, and support for 23+ languages beyond just English.",
    relatedLinks: [
      { label: "Compare with Typeracer", href: "/typeracer-alternative" }
    ]
  },
  // Learning
  {
    id: "learn-touch-typing",
    category: "Learning",
    question: "How do I learn touch typing?",
    answer: "Touch typing means typing without looking at the keyboard. Start by learning the home row (ASDF JKL;), then gradually add other rows. Practice daily for 15-20 minutes, focus on accuracy before speed, and never look down. Our Learn page has a complete guide.",
    relatedLinks: [
      { label: "Touch Typing Guide", href: "/touch-typing" },
      { label: "Typing for Beginners", href: "/typing-for-beginners" }
    ]
  },
  {
    id: "kids-typing",
    category: "Learning",
    question: "Is TypeMasterAI suitable for children?",
    answer: "Yes! TypeMasterAI is ad-free and safe for kids. Children as young as 6-7 can start learning typing basics. We offer achievement badges and progress tracking to keep kids motivated. For best results, supervise practice and limit sessions to 10-15 minutes.",
    relatedLinks: [
      { label: "Typing Test for Kids", href: "/typing-test-for-kids" }
    ]
  },
  {
    id: "keyboard-layout",
    category: "Learning",
    question: "Should I switch from QWERTY to Dvorak or Colemak?",
    answer: "QWERTY is fine for most people. Alternative layouts like Dvorak and Colemak can reduce finger movement by 30-50%, but require weeks of relearning. Only consider switching if you have RSI concerns or want to optimize. Focus on technique first.",
    relatedLinks: [
      { label: "Keyboard Layouts Guide", href: "/keyboard-layouts" }
    ]
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
  "Learning": Sparkles,
};

// Popular questions for quick access
const POPULAR_QUESTION_IDS = [
  "good-typing-speed",
  "improve-speed",
  "wpm-calculation",
  "typing-certificate",
  "code-mode"
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useSEO({
    title: 'FAQ | Frequently Asked Questions - TypeMasterAI',
    description: 'Find answers to common questions about TypeMasterAI typing tests. Learn about WPM calculation, typing speed improvement, features, languages, and more.',
    keywords: 'typing test faq, wpm questions, typing speed help, how to type faster, monkeytype alternative questions, typing test help, typing questions answered',
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

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFAQs = useMemo(() => {
    let items = FAQ_ITEMS;
    
    if (activeCategory) {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query)
      );
    }
    
    return items;
  }, [activeCategory, searchQuery]);

  const popularQuestions = FAQ_ITEMS.filter(item => POPULAR_QUESTION_IDS.includes(item.id));

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />

        {/* Header */}
        <header className="text-center mb-10 pt-4">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <HelpCircle className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm text-muted-foreground">Help Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about TypeMasterAI typing tests, features, and how to improve your typing speed.
          </p>
        </header>

        {/* Search Box */}
        <section className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg bg-card/50 border-border/50"
            />
          </div>
        </section>

        {/* Popular Questions */}
        {!searchQuery && !activeCategory && (
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Popular Questions
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {popularQuestions.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setOpenItems(new Set([item.id]));
                    document.getElementById(`faq-${item.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="text-left p-4 bg-card/30 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <span className="text-sm font-medium">{item.question}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card"
            )}
          >
            All ({FAQ_ITEMS.length})
          </button>
          {FAQ_CATEGORIES.map(category => {
            const Icon = CATEGORY_ICONS[category] || HelpCircle;
            const count = FAQ_ITEMS.filter(i => i.category === category).length;
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
                <span className="text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="text-center mb-6 text-muted-foreground">
            Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQs.map((item) => {
            const isOpen = openItems.has(item.id);

            return (
              <div
                key={item.id}
                id={`faq-${item.id}`}
                className="border border-border/50 rounded-xl overflow-hidden bg-card/30"
              >
                <button
                  onClick={() => toggleItem(item.id)}
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
                  <div className="px-5 pb-5 border-t border-border/30 pt-4">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {item.answer}
                    </p>
                    {item.relatedLinks && item.relatedLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                        {item.relatedLinks.map((link, idx) => (
                          <Link key={idx} href={link.href}>
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                              {link.label}
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No questions found</p>
            <p className="text-sm">Try a different search term or browse by category</p>
          </div>
        )}

        {/* Still Have Questions */}
        <section className="mt-12 text-center p-8 bg-card/30 rounded-2xl border border-border/50">
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Chat with our AI assistant for instant help, or contact our support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/chat">
              <Button size="lg" className="gap-2">
                <Headphones className="w-5 h-5" />
                Ask AI Assistant
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                Contact Support
              </Button>
            </Link>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Explore More</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <Link href="/">
              <Card className="bg-card/30 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <Keyboard className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">Typing Test</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/learn">
              <Card className="bg-card/30 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">Learn Typing</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/what-is-wpm">
              <Card className="bg-card/30 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">What is WPM?</div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/about">
              <Card className="bg-card/30 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold text-sm">About Us</div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
