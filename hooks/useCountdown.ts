"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface CountdownTime {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
}

export function useCountdown(targetDate: Date | null): CountdownTime {
	const [timeRemaining, setTimeRemaining] = useState<CountdownTime>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		isExpired: false,
	});

	useEffect(() => {
		if (!targetDate) {
			setTimeRemaining({
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				isExpired: false,
			});
			return;
		}

		const calculateTimeRemaining = () => {
			const now = dayjs();
			const target = dayjs(targetDate);
			const diff = target.diff(now);

			if (diff <= 0) {
				setTimeRemaining({
					days: 0,
					hours: 0,
					minutes: 0,
					seconds: 0,
					isExpired: true,
				});
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const minutes = Math.floor((diff / (1000 * 60)) % 60);
			const seconds = Math.floor((diff / 1000) % 60);

			setTimeRemaining({
				days,
				hours,
				minutes,
				seconds,
				isExpired: false,
			});
		};

		calculateTimeRemaining();
		const interval = setInterval(calculateTimeRemaining, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	return timeRemaining;
}