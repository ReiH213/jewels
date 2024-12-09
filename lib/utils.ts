import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function calcDynamicPrice(pop: number, weight: number) {
  const response = await fetch("https://api.gold-api.com/price/XAU");
  const result = await response.json();
  const goldPrice = result.price / 31.1;

  return (pop / 100 + 1) * weight * goldPrice;
}
