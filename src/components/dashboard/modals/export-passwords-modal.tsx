"use client"

import { FC } from "react";
import { Password } from "@prisma/client";
import Papa from "papaparse";
import { Button } from "~/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"

type Props = {
	passwords: Password[];
}

export const ExportPasswordsModal: FC<Props> = ({ passwords }) => {
	
	const exportPasswords = (data: Password[]) => {
		const csv = Papa.unparse(data);
		const blob = new Blob([ csv ], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.setAttribute("download", "passwords.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Export Passwords</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Export Passwords</DialogTitle>
					<DialogDescription>
						Do you want to download your passwords as CSV file?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="justify-end">
					<DialogClose asChild>
						<Button type="button" variant="outline">
							Close
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							onClick={() => exportPasswords(passwords)}
						>
							Export
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}