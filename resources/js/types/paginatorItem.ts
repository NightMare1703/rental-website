import type { Item } from './item';
import type { LinksItem } from './linksItem';

export type PaginatorItem = {
    data: Item[];
    links: LinksItem[];
    // meta: {
    first_page_url: string;
    last_page_url: string;
    prev_page_url: string | null;
    next_page_url: string;
    path: string;
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    // };
};
