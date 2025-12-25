"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

const contentSections = [
  {
    title: "Beyond the Countdown",
    content:
      "This countdown isn't just about marking time until you leave a job. It's a tool for reflection, a catalyst for intentional planning. True freedom isn't found in the moment you walk out the door—it's cultivated in the choices you make every day leading up to it. Are you running away from something, or running toward something meaningful?",
  },
  {
    title: "Freedom FROM vs Freedom TO",
    content:
      "There's a crucial distinction between negative freedom (freedom from constraints) and positive freedom (freedom to pursue meaning). Leaving a job gives you freedom from deadlines, office politics, and someone else's agenda. But what about freedom to create, to explore, to build the life you actually want? The latter requires intention, courage, and clarity about what truly matters to you.",
  },
  {
    title: "Autonomy and Choice",
    content:
      "True freedom involves making conscious choices rather than defaulting to what's expected. Paradoxically, having too many options can be paralyzing—endless possibilities without a framework for decision-making. Sometimes we find freedom not in unlimited choices, but in intentional limitations that align with our values. What constraints are you willing to embrace to pursue what matters most?",
  },
  {
    title: "Freedom as Responsibility",
    content:
      "With freedom comes the weight of self-determination. No one else to blame for the direction of your life. No structure to hide behind. This can be liberating and terrifying in equal measure. The countdown reminds us that time is finite—how will you steward the freedom you're counting down toward? Freedom isn't just about escaping constraints; it's about accepting responsibility for your own path.",
  },
  {
    title: "Daily Freedom",
    content:
      "While you wait for the big moment of departure, freedom exists in the present too. Small acts of agency: choosing to say no, protecting your boundaries, finding moments of joy even in imperfect circumstances. The countdown isn't just about the future—it's about awareness in the now. Can you find pockets of freedom today, or are you putting all your hope in a future date?",
  },
];

export default function FreedomPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* Navigation */}
      <div className="absolute top-4 left-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/" aria-label="Back to home">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <main className="max-w-3xl w-full space-y-12 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            What is Freedom?
          </h1>
          <p className="text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold">
            Beyond the countdown
          </p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {contentSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Sparkles className="w-5 h-5 text-primary/60" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center pt-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground mb-4">
            Use the countdown not as an escape hatch, but as a compass.
          </p>
          <Button variant="link" asChild>
            <Link href="/" className="text-muted-foreground">
              ← Back to countdown
            </Link>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
