import { Link } from 'wouter';
import { Keyboard, Calculator, Zap, ArrowRight, HelpCircle, ChevronDown, Target } from 'lucide-react';
import { useSEO, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const PAGE_FAQS = [
  {
    question: "What is CPM in typing?",
    answer: "CPM stands for Characters Per Minute. It measures how many individual characters (letters, numbers, symbols, spaces) you type per minute. CPM is more granular than WPM and useful for precision measurement."
  },
  {
    question: "How do I convert CPM to WPM?",
    answer: "To convert CPM to WPM, divide by 5. The standard 'word' in typing is defined as 5 characters. So 300 CPM = 60 WPM, 400 CPM = 80 WPM, and so on."
  },
  {
    question: "Why use CPM instead of WPM?",
    answer: "CPM is more precise for measuring raw typing speed and is commonly used in data entry testing. WPM normalizes character count to provide a consistent metric across different texts."
  },
  {
    question: "What is a good CPM score?",
    answer: "Average CPM is around 200 (40 WPM). 250-350 CPM is good, 350-450 CPM is very good, and 500+ CPM is excellent. Professional typists can exceed 600 CPM."
  },
  {
    question: "Does CPM include errors?",
    answer: "Gross CPM includes all characters typed. Net CPM (or corrected CPM) subtracts errors. TypeMasterAI shows both metrics for complete accuracy assessment."
  }
];

export default function CpmTestPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: 'CPM Test | Characters Per Minute Typing Speed Test - TypeMasterAI',
    description: 'Take a free CPM (Characters Per Minute) typing test. Measure your character-level typing speed with precision. Convert CPM to WPM instantly. Perfect for data entry practice.',
    keywords: 'cpm test, characters per minute test, cpm typing test, cpm calculator, cpm to wpm, typing cpm, character speed test, data entry cpm test, cpm typing speed',
    canonical: 'https://typemasterai.com/cpm-test',
    ogUrl: 'https://typemasterai.com/cpm-test',
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          'name': 'TypeMasterAI CPM Test',
          'description': 'Characters Per Minute typing speed test with real-time CPM calculation and WPM conversion.',
          'applicationCategory': 'EducationalApplication',
          'operatingSystem': 'Web Browser',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
        },
        getBreadcrumbSchema([
          { name: 'Home', url: 'https://typemasterai.com' },
          { name: 'CPM Test', url: 'https://typemasterai.com/cpm-test' }
        ]),
        getFAQSchema(PAGE_FAQS)
      ]
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <Breadcrumbs items={[{ label: 'CPM Test', href: '/cpm-test' }]} />

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center pt-8 pb-16">
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-6 border border-purple-500/30">
            <Calculator className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm text-purple-300">Precision Measurement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            CPM Typing <span className="text-purple-400">Speed Test</span>
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
            Measure your typing speed in Characters Per Minute (CPM)
          </p>
          <p className="text-lg text-slate-400 mb-8">
            More precise than WPM for data entry and professional typing assessment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700">
                <Keyboard className="mr-2 h-5 w-5" />
                Start CPM Test
              </Button>
            </Link>
            <Link href="/wpm-test">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                WPM Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* CPM vs WPM Comparison */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            CPM vs WPM: Understanding the Difference
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  CPM (Characters Per Minute)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-3">
                <p>Measures individual characters typed per minute</p>
                <p>More precise for raw speed measurement</p>
                <p>Common in data entry and transcription</p>
                <p>Average: 200 CPM</p>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  WPM (Words Per Minute)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-3">
                <p>Standard: 1 word = 5 characters</p>
                <p>Normalized metric for comparison</p>
                <p>Industry standard for typing speed</p>
                <p>Average: 40 WPM (= 200 CPM)</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Conversion Formula */}
          <div className="mt-8 p-6 bg-slate-800/50 rounded-lg border border-slate-700 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Quick Conversion Formula</h3>
            <div className="text-2xl font-mono text-cyan-400">
              WPM = CPM ÷ 5
            </div>
            <p className="text-slate-400 mt-3">
              Example: 350 CPM ÷ 5 = <strong className="text-white">70 WPM</strong>
            </p>
          </div>
        </section>

        {/* CPM Benchmarks */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            CPM Speed Benchmarks
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: 'Beginner', cpm: '100-200', wpm: '20-40', color: 'text-slate-400' },
              { level: 'Average', cpm: '200-300', wpm: '40-60', color: 'text-blue-400' },
              { level: 'Good', cpm: '300-400', wpm: '60-80', color: 'text-green-400' },
              { level: 'Expert', cpm: '500+', wpm: '100+', color: 'text-purple-400' },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700 text-center">
                <CardContent className="pt-6">
                  <p className={`text-lg font-bold ${item.color}`}>{item.level}</p>
                  <p className="text-3xl font-bold text-white mt-2">{item.cpm}</p>
                  <p className="text-sm text-slate-500">CPM</p>
                  <p className="text-slate-400 mt-2">({item.wpm} WPM)</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {PAGE_FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between bg-slate-800/50 hover:bg-slate-800"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  <ChevronDown className={cn('w-5 h-5 text-slate-400 transition-transform', openFaq === i && 'rotate-180')} />
                </button>
                {openFaq === i && (
                  <div className="p-4 bg-slate-900/50 text-slate-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Test Your CPM Now
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get precise character-level typing speed measurement
          </p>
          <Link href="/">
            <Button size="lg" className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Keyboard className="mr-2 h-5 w-5" />
              Start CPM Test
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

