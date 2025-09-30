"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	exitDate: z.date({
		required_error: "Please select a date",
	}),
});

type FormValues = z.infer<typeof formSchema>;

interface CountdownFormProps {
	onSubmit: (date: Date) => void;
	defaultDate?: Date;
}

export function CountdownForm({ onSubmit, defaultDate }: CountdownFormProps) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		defaultDate,
	);

	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultDate
			? {
					exitDate: defaultDate,
				}
			: undefined,
	});

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			setSelectedDate(date);
			setValue("exitDate", date);
		}
	};

	const onFormSubmit = (data: FormValues) => {
		onSubmit(data.exitDate);
	};

	return (
		<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
			<div className="space-y-3">
				<label className="text-sm font-medium">When are you leaving?</label>
				<div className="flex justify-center">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleDateSelect}
						disabled={(date) => date < new Date()}
						initialFocus
					/>
				</div>
				{selectedDate && (
					<p className="text-center text-sm text-muted-foreground">
						Selected: {format(selectedDate, "MMMM d, yyyy")}
					</p>
				)}
				{errors.exitDate && (
					<p className="text-sm text-red-500 text-center">
						{errors.exitDate.message}
					</p>
				)}
			</div>
			<Button type="submit" className="w-full" disabled={!selectedDate}>
				Start Countdown
			</Button>
		</form>
	);
}