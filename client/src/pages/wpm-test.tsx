import { Link } from 'wouter';
import { Gauge, Timer, Target, TrendingUp, Zap, ArrowRight, CheckCircle, Calculator, BarChart3 } from 'lucide-react';
import { useSEO, SEO_CONFIGS, getHowToSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function WPMTestPage() {
  useSEO({
    ...SEO_CONFIGS.wpmTest,
    structuredData: getHowToSchema(
      'How to Calculate Your WPM (Words Per Minute)',
      'Learn how to measure your typing speed in words per minute using our free WPM test',
      [
        { name: 'Start the WPM Test', text: 'Click the Start button to begin the timed typing test' },
        { name: 'Type the Displayed Text', text: 'Type the paragraph shown as quickly and accurately as possible' },
        { name: 'View Your WPM Score', text: 'Your words per minute score is calculated using the standard formula: (characters / 5) / minutes' },
        { name: 'Analyze Your Results', text: 'Review accuracy, error rate, and keystroke analytics to identify areas for improvement' },
      ],
      'PT2M'
    ),
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <Breadcrumbs items={[{ label: 'WPM Test', href: '/wpm-test' }]} />
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6">
            Free WPM Test Online
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Measure your typing speed in Words Per Minute
          </p>
          <p className="text-lg text-muted-foreground/80 mb-8">
            Professional-grade WPM calculator with real-time tracking and detailed analytics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-6">
                <Gauge className="mr-2 h-5 w-5" />
                Start WPM Test
              </Button>
            </Link>
            <Link href="/1-minute-typing-test">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                1 Minute Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* WPM Benchmarks */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What's a Good WPM Score?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-card/50 border-border/50 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-red-400">20-30</CardTitle>
                <CardDescription>Beginner</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-orange-400">40-50</CardTitle>
                <CardDescription>Average</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-yellow-400">60-80</CardTitle>
                <CardDescription>Good</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-green-400">80-100</CardTitle>
                <CardDescription>Professional</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-primary">100+</CardTitle>
                <CardDescription>Expert</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* WPM Calculation */}
        <section className="max-w-4xl mx-auto py-16">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-2" />
              <CardTitle className="text-2xl">How is WPM Calculated?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                WPM (Words Per Minute) is calculated using the industry-standard formula:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <code className="text-lg font-mono">WPM = (Total Characters Typed ÷ 5) ÷ Minutes Elapsed</code>
              </div>
              <p className="text-muted-foreground">
                A "word" is standardized as 5 characters (including spaces). This ensures consistent measurements regardless of the actual word lengths in the text.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-green-500/10 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Gross WPM</h4>
                  <p className="text-sm text-muted-foreground">Total characters divided by 5, regardless of errors</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Net WPM</h4>
                  <p className="text-sm text-muted-foreground">Gross WPM minus penalty for uncorrected errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our WPM Test Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Timer className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Multiple Durations</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Choose from 15 seconds, 30 seconds, 1 minute, 3 minutes, or 5 minutes based on your preference.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Watch your WPM update live as you type. See accuracy percentage and error count instantly.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                View keystroke heatmaps, finger usage stats, and WPM graphs to understand your typing patterns.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto py-16">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Understanding Your WPM Score</h2>
            <p>
              Your <strong>WPM (Words Per Minute)</strong> score is the most common measure of typing speed. It tells you how many "standard words" you can type in one minute.
            </p>

            <h3>Why WPM Matters</h3>
            <ul>
              <li><strong>Job Requirements:</strong> Many positions require minimum typing speeds (40-60 WPM for data entry, 80+ for transcription)</li>
              <li><strong>Productivity:</strong> Higher WPM means you complete work faster</li>
              <li><strong>Communication:</strong> Fast typing helps in chat, emails, and real-time collaboration</li>
            </ul>

            <h3>How to Improve Your WPM</h3>
            <ol>
              <li>Practice touch typing - never look at the keyboard</li>
              <li>Focus on accuracy first, then speed</li>
              <li>Take regular breaks to avoid fatigue</li>
              <li>Use proper ergonomics and posture</li>
              <li>Practice with varied content (our AI generates fresh text every time)</li>
            </ol>

            <h3>WPM Test Best Practices</h3>
            <p>
              For the most accurate WPM measurement:
            </p>
            <ul>
              <li>Take tests in a quiet environment</li>
              <li>Use a comfortable keyboard</li>
              <li>Complete at least 3 tests and average the results</li>
              <li>Try both 1-minute and 3-minute tests for different perspectives</li>
            </ul>
          </article>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Check Your WPM Now</h2>
          <p className="text-muted-foreground mb-8">
            Free, instant, no signup required. Get your WPM score in under a minute.
          </p>
          <Link href="/">
            <Button size="lg" className="text-lg px-12 py-6">
              <Gauge className="mr-2 h-6 w-6" />
              Start Free WPM Test
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

