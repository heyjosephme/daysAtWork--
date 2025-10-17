"use client";

import { motion, AnimatePresence, useAnimation } from "motion/react";
import { format } from "date-fns";
import { useEffect } from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { ProgressBar } from "@/components/ProgressBar";

interface CountdownDisplayProps {
	targetDate: Date | null;
	startDate: Date | null;
}

interface TimeUnitProps {
	value: number;
	label: string;
	isUrgent?: boolean;
}

function TimeUnit({ value, label, isUrgent = false }: TimeUnitProps) {
	const controls = useAnimation();

	useEffect(() => {
		// Pulse animation when value changes
		controls.start({
			scale: [1, 1.1, 1],
			transition: { duration: 0.3 },
		});
	}, [value, controls]);

	return (
		<motion.div
			className="flex flex-col items-center group cursor-default"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.05 }}
		>
			<motion.div
				className={`relative h-24 w-20 overflow-hidden rounded-lg bg-gradient-to-br ${
					isUrgent
						? "from-red-500/10 to-orange-500/10 border-2 border-red-500/20"
						: "from-primary/5 to-primary/10 border-2 border-primary/10"
				} transition-colors duration-500`}
				animate={controls}
			>
				<AnimatePresence mode="popLayout">
					<motion.div
						key={value}
						initial={{ y: -100, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 100, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className={`absolute inset-0 flex items-center justify-center text-6xl font-bold font-mono tabular-nums ${
							isUrgent ? "text-red-600 dark:text-red-400" : ""
						}`}
					>
						{String(value).padStart(2, "0")}
					</motion.div>
				</AnimatePresence>

				{/* Glow effect on hover */}
				<motion.div
					className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 rounded-lg"
					initial={false}
				/>
			</motion.div>
			<div className="text-sm text-muted-foreground uppercase tracking-wider mt-2 group-hover:text-foreground transition-colors">
				{label}
			</div>
		</motion.div>
	);
}

export function CountdownDisplay({
	targetDate,
	startDate,
}: CountdownDisplayProps) {
	const { days, hours, minutes, seconds, isExpired, percentage } =
		useCountdown(targetDate, startDate);

	// Determine urgency (less than 7 days)
	const isUrgent = days < 7;

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
				className="text-center py-12 space-y-6"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", duration: 0.6 }}
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
					transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
				>
					<motion.p
						className="text-7xl"
						animate={{
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						🎉
					</motion.p>
				</motion.div>
				<motion.p
					className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
					initial={{ y: -20 }}
					animate={{ y: 0 }}
					transition={{ delay: 0.3 }}
				>
					Freedom!
				</motion.p>
				<motion.p
					className="text-muted-foreground mt-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
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
				{isUrgent && (
					<motion.span
						className="inline-block mr-2 text-red-500"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
					>
						⚠️
					</motion.span>
				)}
				Counting down to {format(targetDate, "MMMM d, yyyy")}
			</motion.div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
				<TimeUnit value={days} label="Days" isUrgent={isUrgent} />
				<TimeUnit value={hours} label="Hours" isUrgent={isUrgent} />
				<TimeUnit value={minutes} label="Minutes" isUrgent={isUrgent} />
				<TimeUnit value={seconds} label="Seconds" isUrgent={isUrgent} />
			</div>
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			>
				<ProgressBar percentage={percentage} isUrgent={isUrgent} />
			</motion.div>
		</motion.div>
	);
}