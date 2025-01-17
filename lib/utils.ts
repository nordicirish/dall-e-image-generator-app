export const formatTitle = (str: string) =>
  str
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatSelectedOptions = (options: Record<string, string>) => {
  return Object.entries(options)
    .filter(([_, value]) => value)
    .map(([category, value]) => `${formatTitle(category)}: ${value}`)
    .join(", ");
};
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}