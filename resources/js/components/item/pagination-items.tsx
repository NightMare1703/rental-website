import type { PaginatorItem } from "@/types/paginatorItem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../ui/pagination";

export default function PaginationItems({ items }: { items: PaginatorItem }) {
    console.log(items)

    return (
        <Pagination>
            {items.links.map((link, index) => (
                <PaginationContent>
                    <PaginationItem key={index}>
                        {link.label === '&laquo; Previous' ?
                            link.url &&
                            <PaginationPrevious href={link.url} /> :
                            link.label === 'Next &raquo;' ?
                                link.url &&
                                <PaginationNext href={link.url} /> :
                                link.label === '...' ? <PaginationEllipsis /> :
                                    <PaginationLink isActive={link.active} href={link.url}>{link.label}</PaginationLink>}
                    </PaginationItem>
                </PaginationContent>
            ))}
        </Pagination>
    )
}