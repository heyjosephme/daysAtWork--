"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface CountdownTime {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
	percentage: number;
	startDate: Date | null;
}

export function useCountdown(
	targetDate: Date | null,
	startDate: Date | null = null,
): CountdownTime {
	const [timeRemaining, setTimeRemaining] = useState<CountdownTime>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		isExpired: false,
		percentage: 0,
		startDate: null,
	});

	useEffect(() => {
		if (!targetDate) {
			setTimeRemaining({
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				isExpired: false,
				percentage: 0,
				startDate: null,
			});
			return;
		}

		// Use provided start date or current date
		const effectiveStartDate = startDate || new Date();

		const calculateTimeRemaining = () => {
			const now = dayjs();
			const target = dayjs(targetDate);
			const start = dayjs(effectiveStartDate);
			const diff = target.diff(now);

			if (diff <= 0) {
				setTimeRemaining({
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
					isExpired: true,
					percentage: 100,
					startDate: effectiveStartDate,
				});
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			// Calculate percentage: (elapsed / total) * 100
			const totalTime = target.diff(start);
			const elapsedTime = now.diff(start);
			const percentage = Math.min(
				100,
				Math.max(0, (elapsedTime / totalTime) * 100),
			);

			setTimeRemaining({
				days,
				hours,
				minutes,
				seconds,
				isExpired: false,
				percentage,
				startDate: effectiveStartDate,
			});
		};

		calculateTimeRemaining();
		const interval = setInterval(calculateTimeRemaining, 1000);

		return () => clearInterval(interval);
	}, [targetDate, startDate]);

	return timeRemaining;
}