import allIcons from 'icons/icons.json';

export const random = (max: number, min: number = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
export const delay = (time: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, time));
export const nextFrame = () => new Promise<number>(requestAnimationFrame);

export interface IconDetail {
    name: string;
    component: string;
    path: string;
    aliases?: string[];
}
export const iconDetails: Record<string, IconDetail> = allIcons.icons;
export const icons = Object.keys(allIcons.icons);
export const randomIcon = () => icons[random(icons.length - 1)];
