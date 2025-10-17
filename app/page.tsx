"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountdownForm } from "@/components/CountdownForm";
import { CountdownDisplay } from "@/components/CountdownDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";

const STORAGE_EXIT_KEY = "exitDate";
const STORAGE_START_KEY = "startDate";

export default function Home() {
	const [targetDate, setTargetDate] = useState<Date | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const storedExit = localStorage.getItem(STORAGE_EXIT_KEY);
		const storedStart = localStorage.getItem(STORAGE_START_KEY);

		if (storedExit) {
			setTargetDate(new Date(storedExit));
		}
		if (storedStart) {
			setStartDate(new Date(storedStart));
		}
		setIsLoaded(true);
	}, []);

	const handleDateSubmit = (exitDate: Date, submittedStartDate: Date) => {
		setTargetDate(exitDate);
		setStartDate(submittedStartDate);
		localStorage.setItem(STORAGE_EXIT_KEY, exitDate.toISOString());
		localStorage.setItem(STORAGE_START_KEY, submittedStartDate.toISOString());
	};

	const handleReset = () => {
		setTargetDate(null);
		setStartDate(null);
		localStorage.removeItem(STORAGE_EXIT_KEY);
		localStorage.removeItem(STORAGE_START_KEY);
	};

	if (!isLoaded) {
		return null;
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>
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
							<CountdownDisplay targetDate={targetDate} startDate={startDate} />
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
							<CountdownForm
								onSubmit={handleDateSubmit}
								defaultExitDate={targetDate || undefined}
								defaultStartDate={startDate || undefined}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}