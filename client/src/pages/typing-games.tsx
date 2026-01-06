import { Link } from 'wouter';
import { Gamepad2, Users, Trophy, Zap, ArrowRight, Swords, Target, Timer, Star, Flame } from 'lucide-react';
import { useSEO, SEO_CONFIGS, getSoftwareAppSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function TypingGamesPage() {
  useSEO({
    ...SEO_CONFIGS.typingGames,
    structuredData: getSoftwareAppSchema(
      'TypeMasterAI Typing Games',
      'Free online typing games to improve your speed while having fun',
      ['Multiplayer Racing', 'Stress Test Challenge', 'Daily Challenges', 'Leaderboards', 'Achievements']
    ),
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <Breadcrumbs items={[{ label: 'Typing Games', href: '/typing-games' }]} />
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6">
            Free Typing Games Online
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Improve your typing speed while having fun
          </p>
          <p className="text-lg text-muted-foreground/80 mb-8">
            Race against others, complete challenges, and climb the leaderboard
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/multiplayer">
              <Button size="lg" className="text-lg px-8 py-6">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Play Multiplayer Race
              </Button>
            </Link>
            <Link href="/stress-test">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Stress Test Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Game Modes */}
        <section className="max-w-6xl mx-auto py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Choose Your Game Mode
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/multiplayer">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Swords className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multiplayer Race</CardTitle>
                  <CardDescription>Real-time competition</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">Race against other players in real-time. See live WPM updates for all participants.</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Up to 10 players per race</li>
                    <li>• ELO rating system</li>
                    <li>• Private rooms available</li>
                    <li>• Anti-cheat protection</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/stress-test">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Flame className="h-10 w-10 text-orange-500 mb-2" />
                  <CardTitle>Stress Test</CardTitle>
                  <CardDescription>Type under pressure</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">Test your focus with visual distractions, screen shake, and other challenges.</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Multiple difficulty levels</li>
                    <li>• Visual effects challenge</li>
                    <li>• Separate leaderboard</li>
                    <li>• Unlockable modes</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Timer className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Speed Challenge</CardTitle>
                  <CardDescription>Beat your personal best</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">Race against the clock in timed challenges. Try to beat your high score!</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Multiple time options</li>
                    <li>• Personal records tracked</li>
                    <li>• Achievement badges</li>
                    <li>• Progress charts</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/code-mode">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Zap className="h-10 w-10 text-green-500 mb-2" />
                  <CardTitle>Code Typing</CardTitle>
                  <CardDescription>For developers</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">Type real code snippets in 20+ programming languages with syntax highlighting.</p>
                  <ul className="space-y-1 text-sm">
                    <li>• JavaScript, Python, Java</li>
                    <li>• Special character practice</li>
                    <li>• Developer leaderboard</li>
                    <li>• Code-specific stats</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/leaderboard">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Trophy className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>Leaderboards</CardTitle>
                  <CardDescription>Compete globally</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">See how you rank against typists worldwide. Filter by mode and language.</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Global rankings</li>
                    <li>• Daily/weekly/all-time</li>
                    <li>• Multiple categories</li>
                    <li>• Country rankings</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dictation-mode">
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <Target className="h-10 w-10 text-purple-500 mb-2" />
                  <CardTitle>Dictation Mode</CardTitle>
                  <CardDescription>Listen and type</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p className="mb-4">Hear sentences spoken aloud and type what you hear. Improves listening skills too!</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Audio playback</li>
                    <li>• Multiple voices</li>
                    <li>• Adjustable speed</li>
                    <li>• Transcription practice</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Why Games? */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Learn Typing Through Games?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Star className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Fun & Engaging</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Games make practice enjoyable. You'll want to come back and play more, leading to faster improvement.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Social Competition</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Competing against real people adds excitement. See live results and climb the ranks together.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Rewards & Motivation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Earn achievements, badges, and certificates. Daily challenges keep you coming back for more.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Faster Results</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Studies show gamified learning improves retention and skill development compared to boring drills.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto py-16">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Free Typing Games for All Ages</h2>
            <p>
              Whether you're a beginner learning to type or an expert looking for a challenge, our <strong>free typing games</strong> offer something for everyone. No downloads, no signup required - just pure typing fun.
            </p>

            <h3>Typing Games for Kids</h3>
            <p>
              Our games are suitable for children learning to type. The colorful interface, achievement system, and non-violent competition make it perfect for young learners.
            </p>

            <h3>Typing Games for Adults</h3>
            <p>
              Professionals can use our games to maintain and improve their typing skills. The multiplayer racing feature is especially popular for office competitions.
            </p>

            <h3>Benefits of Typing Games</h3>
            <ul>
              <li>Learn without feeling like you're practicing</li>
              <li>Build muscle memory through repetition</li>
              <li>Get instant feedback on your performance</li>
              <li>Track improvement over time</li>
              <li>Compete with friends and family</li>
            </ul>
          </article>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-muted-foreground mb-8">
            Jump into a multiplayer race right now - no signup needed!
          </p>
          <Link href="/multiplayer">
            <Button size="lg" className="text-lg px-12 py-6">
              <Gamepad2 className="mr-2 h-6 w-6" />
              Start Playing Now
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

