import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function chatHrefConstructor(userId: string, friendId: string) {
    const sortedIds = [userId, friendId].sort()
    return `${sortedIds[0]}--${sortedIds[1]}`
}

export function toPusherKey(key: string) {
    return key.replace(/:/g, "__");
}