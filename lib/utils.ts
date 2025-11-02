import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dynamicColors() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
}

export function getTimeAgo(target: string | Date) {
  const now = new Date();
  const targetDate = new Date(target);
  const diff = now.getTime() - targetDate.getTime();

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (year >= 1) return `${year}년 전`;
  if (month >= 1) return `${month}개월 전`;
  if (week >= 1) return `${week}주 전`;
  if (day >= 1) return `${day}일 전`;
  if (hour >= 1) return `${hour}시간 전`;
  if (min >= 1) return `${min}분 전`;
  return "최근";
}
