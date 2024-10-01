"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "~/components/ui/button"
import {
	Dialog, DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Upload } from "lucide-react"
import { client } from "~/lib/trpc/client";
import Papa from "papaparse";
import { Password } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ImportPasswordsModal = () => {
	const [file, setFile] = useState<File | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const router = useRouter();
	
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile && selectedFile.type === "text/csv") {
			setFile(selectedFile)
		} else {
			setFile(null)
		}
	}
	
	const parseCSV = (file: File): Promise<Password[]> => {
		return new Promise((resolve, reject) => {
			Papa.parse(file, {
				header: true,
				skipEmptyLines: true,
				complete: (results: {
					data: Password[]
				}) => {
					resolve(results.data);
				},
				error: (error) => {
					reject(error);
				},
			});
		});
	};
	
	const { mutateAsync: uploadPasswords } = client.password.importPasswords.useMutation({
		onSuccess: () => {
			toast("Passwords", {
				description: "Passwords saved successfully"
			})
		}, onError: () => {
			toast("Passwords", {
				description: "Failed to import passwords."
			})
		}
	})
	
	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		if (!file) return
		
		setIsUploading(true)
		
		try {
			const passwords = await parseCSV(file) as Password[];
			
			// @ts-ignore
			await uploadPasswords(passwords);
			
			router.refresh();
		} catch (error) {
			toast("Passwords", {
        description: "Failed to parse CSV file."
      })
		} finally {
			setIsUploading(false)
		}
	}
	
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary">Import Passwords</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Upload CSV File</DialogTitle>
					<DialogDescription>
						Select a CSV file to upload. Only .csv files are accepted.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="csv-file" className="text-right">
								File
							</Label>
							<Input
								id="csv-file"
								type="file"
								accept=".csv"
								onChange={handleFileChange}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="submit" disabled={!file || isUploading}>
								{isUploading ? (
									<>
										<Upload className="mr-2 h-4 w-4 animate-spin" />
										Uploading...
									</>
								) : (
									"Upload"
								)}
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}