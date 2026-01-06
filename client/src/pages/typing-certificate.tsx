import { Link } from 'wouter';
import { Award, Shield, Download, CheckCircle, Share2, FileCheck, ArrowRight, Star } from 'lucide-react';
import { useSEO, SEO_CONFIGS, getSoftwareAppSchema } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function TypingCertificatePage() {
  useSEO({
    ...SEO_CONFIGS.typingCertificate,
    structuredData: getSoftwareAppSchema(
      'TypeMasterAI Typing Certificate',
      'Earn verified typing speed certificates with your WPM and accuracy scores',
      ['Verified certificates', 'QR code verification', 'PDF download', 'Shareable links', 'Professional format']
    ),
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-20 pb-16">
        <Breadcrumbs items={[{ label: 'Typing Certificate', href: '/typing-certificate' }]} />
        
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center pt-8 pb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 mb-6">
            Typing Speed Certificate
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Earn verified certificates for your typing achievements
          </p>
          <p className="text-lg text-muted-foreground/80 mb-8">
            Professional certificates with QR verification for jobs, schools, and personal records
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-6">
                <Award className="mr-2 h-5 w-5" />
                Take Test & Earn Certificate
              </Button>
            </Link>
            <Link href="/verify">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Verify a Certificate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Certificate Features */}
        <section className="max-w-6xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Certificate Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified & Authentic</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Each certificate has a unique verification ID and QR code that anyone can use to verify authenticity.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Download className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Downloadable PDF</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Download your certificate as a high-quality PDF. Print it or attach it to job applications.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Share2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Shareable Link</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Get a unique verification link to share with employers, teachers, or on social media.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <FileCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Professional Format</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Clean, professional design suitable for official use. Includes your name, WPM, accuracy, and date.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Anti-Cheat Protected</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our tests use anti-cheat measures to ensure your certificate reflects genuine typing ability.
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Star className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multiple Levels</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Earn Bronze (40+ WPM), Silver (60+ WPM), Gold (80+ WPM), or Platinum (100+ WPM) certificates.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Earn */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            How to Earn Your Certificate
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Take a Typing Test</h3>
              <p className="text-muted-foreground text-sm">
                Complete a 1-minute or longer typing test to measure your speed and accuracy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Meet Requirements</h3>
              <p className="text-muted-foreground text-sm">
                Achieve at least 40 WPM with 90%+ accuracy to qualify for a certificate.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Download & Share</h3>
              <p className="text-muted-foreground text-sm">
                Generate your certificate, download the PDF, and share it anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Certificate Levels */}
        <section className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Certificate Levels
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-amber-900/30 to-amber-800/10 border-amber-600/50">
              <CardHeader className="text-center pb-2">
                <Award className="h-12 w-12 text-amber-600 mx-auto mb-2" />
                <CardTitle className="text-amber-500">Bronze</CardTitle>
                <CardDescription>40-59 WPM</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Good typing speed
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-400/30 to-gray-300/10 border-gray-400/50">
              <CardHeader className="text-center pb-2">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <CardTitle className="text-gray-300">Silver</CardTitle>
                <CardDescription>60-79 WPM</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Above average speed
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/30 to-yellow-400/10 border-yellow-500/50">
              <CardHeader className="text-center pb-2">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <CardTitle className="text-yellow-400">Gold</CardTitle>
                <CardDescription>80-99 WPM</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Professional level
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/30 to-cyan-400/10 border-cyan-500/50">
              <CardHeader className="text-center pb-2">
                <Award className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                <CardTitle className="text-cyan-300">Platinum</CardTitle>
                <CardDescription>100+ WPM</CardDescription>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Expert typist
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto py-16">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h2>Why Get a Typing Certificate?</h2>
            <p>
              A <strong>typing speed certificate</strong> is valuable proof of your keyboard proficiency. Here's why you might need one:
            </p>

            <h3>For Job Applications</h3>
            <p>
              Many employers require typing speed verification for data entry, administrative, and customer service positions. Our certificates provide verifiable proof of your typing ability.
            </p>

            <h3>For School & Education</h3>
            <p>
              Students often need to demonstrate typing proficiency for computer classes, exams, or scholarship applications.
            </p>

            <h3>For Personal Achievement</h3>
            <p>
              Track your progress and celebrate milestones as you improve from Bronze to Platinum level.
            </p>

            <h3>Certificate Verification</h3>
            <p>
              Anyone can verify your certificate's authenticity using the unique verification ID or QR code. This prevents fraud and ensures your certificate is trusted.
            </p>
          </article>
        </section>

        {/* CTA */}
        <section className="max-w-2xl mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Earn Your Certificate?</h2>
          <p className="text-muted-foreground mb-8">
            Take a typing test now and earn your verified certificate in minutes.
          </p>
          <Link href="/">
            <Button size="lg" className="text-lg px-12 py-6">
              <Award className="mr-2 h-6 w-6" />
              Start Typing Test
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

