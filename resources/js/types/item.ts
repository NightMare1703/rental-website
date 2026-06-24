import type { Category } from './category';
import type { ItemImage } from './itemImage';

export type Item = {
    id: number;
    category: Category;
    name: string;
    description: string;
    price_per_day: number;
    stock: number;
    images: ItemImage[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};
