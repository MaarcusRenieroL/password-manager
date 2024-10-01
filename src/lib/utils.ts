import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Papa from "papaparse";
import { Group, Password } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomPassword = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
};


export const exportGroups = (data: Group[]) => {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "groups.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
