"use client";

import { motion } from "motion/react";

interface ProgressBarProps {
	percentage: number;
	isUrgent?: boolean;
}

export function ProgressBar({ percentage, isUrgent = false }: ProgressBarProps) {
	// Determine color based on progress
	const getColor = () => {
		if (isUrgent) return "bg-gradient-to-r from-red-500 to-orange-500";
		if (percentage < 33) return "bg-gradient-to-r from-green-500 to-emerald-500";
		if (percentage < 66) return "bg-gradient-to-r from-blue-500 to-cyan-500";
		return "bg-gradient-to-r from-purple-500 to-pink-500";
	};

	return (
		<div className="w-full space-y-2">
			<div className="flex justify-between items-center text-sm">
				<span className="text-muted-foreground">Progress</span>
				<motion.span
					className="font-mono font-semibold tabular-nums"
					key={Math.floor(percentage)}
					initial={{ scale: 1.2 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.3 }}
				>
					{percentage.toFixed(1)}%
				</motion.span>
			</div>
			<div className="relative h-3 bg-secondary rounded-full overflow-hidden">
				<motion.div
					className={`h-full ${getColor()} rounded-full relative`}
					initial={{ width: 0 }}
					animate={{ width: `${percentage}%` }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					{/* Shimmer effect */}
					<motion.div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
						animate={{
							x: ["-100%", "100%"],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
					/>
				</motion.div>
			</div>
		</div>
	);
}