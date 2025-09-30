"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountdownForm } from "@/components/CountdownForm";
import { CountdownDisplay } from "@/components/CountdownDisplay";

const STORAGE_KEY = "exitDate";

export default function Home() {
	const [targetDate, setTargetDate] = useState<Date | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			setTargetDate(new Date(stored));
		}
		setIsLoaded(true);
	}, []);

	const handleDateSubmit = (date: Date) => {
		setTargetDate(date);
		localStorage.setItem(STORAGE_KEY, date.toISOString());
	};

	const handleReset = () => {
		setTargetDate(null);
		localStorage.removeItem(STORAGE_KEY);
	};

	if (!isLoaded) {
		return null;
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8">
			<main className="max-w-4xl w-full space-y-12">
				<motion.div
					className="text-center space-y-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-5xl font-bold tracking-tight">Days at Work--</h1>
					<p className="text-muted-foreground text-lg">
						Count down to your freedom
					</p>
				</motion.div>

				<AnimatePresence mode="wait">
					{targetDate ? (
						<motion.div
							key="countdown"
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.4 }}
							className="space-y-8"
						>
							<CountdownDisplay targetDate={targetDate} />
							<motion.div
								className="flex justify-center"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							>
								<button
									type="button"
									onClick={handleReset}
									className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
								>
									Change date
								</button>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="form"
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 100 }}
							transition={{ duration: 0.4 }}
							className="max-w-md mx-auto"
						>
							<CountdownForm onSubmit={handleDateSubmit} />
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}