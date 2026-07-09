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
    console.log(items.links)

    return (
        <Pagination>
            {items.links.map((link, index) => (
                <PaginationContent>
                    <PaginationItem key={index}>
                        {link.label === '&laquo; Previous' ? (
                            <PaginationPrevious href={link.url || '#'} />
                        ) : link.label === 'Next &raquo;' ? (
                            <PaginationNext href={link.url || '#'} />
                        ) : link.label === '...' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                href={link.url || '#'}
                                isActive={link.active}
                            >
                                {link.label}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                </PaginationContent>
            ))}
        </Pagination>
    )
}