"use client";

import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns";
import { useCountdown } from "@/hooks/useCountdown";

interface CountdownDisplayProps {
	targetDate: Date | null;
}

interface TimeUnitProps {
	value: number;
	label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
	return (
		<motion.div
			className="flex flex-col items-center"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="relative h-24 w-20 overflow-hidden">
				<AnimatePresence mode="popLayout">
					<motion.div
						key={value}
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="absolute inset-0 flex items-center justify-center text-6xl font-bold font-mono tabular-nums"
					>
						{String(value).padStart(2, "0")}
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="text-sm text-muted-foreground uppercase tracking-wider mt-2">
				{label}
			</div>
		</motion.div>
	);
}

export function CountdownDisplay({ targetDate }: CountdownDisplayProps) {
	const { days, hours, minutes, seconds, isExpired } =
		useCountdown(targetDate);

	if (!targetDate) {
		return (
			<motion.div
				className="text-center py-12"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<p className="text-muted-foreground">
					Set your exit date to start the countdown
				</p>
			</motion.div>
		);
	}

	if (isExpired) {
		return (
			<motion.div
				className="text-center py-12"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", duration: 0.6 }}
			>
				<motion.p
					className="text-4xl font-bold"
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					transition={{ delay: 0.2 }}
				>
					🎉 Freedom!
				</motion.p>
				<motion.p
					className="text-muted-foreground mt-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.4 }}
				>
					Your countdown has ended. Congratulations!
				</motion.p>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="space-y-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<motion.div
				className="text-center text-sm text-muted-foreground"
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				Counting down to {format(targetDate, "MMMM d, yyyy")}
			</motion.div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				<TimeUnit value={days} label="Days" />
				<TimeUnit value={hours} label="Hours" />
				<TimeUnit value={minutes} label="Minutes" />
				<TimeUnit value={seconds} label="Seconds" />
			</div>
		</motion.div>
	);
}