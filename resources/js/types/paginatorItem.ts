import type { Item } from './item';
import type { LinksItem } from './linksItem';

export type PaginatorItem = {
    data: Item[];
    links: LinksItem[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
};
