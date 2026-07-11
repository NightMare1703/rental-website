// import { useEffect } from "react";
import { Link } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { PaginatorItem } from "@/types/paginatorItem";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "../ui/pagination";

export default function PaginationItems({ items }: { items: PaginatorItem }) {

    // const [nextPage, setNextPage] = React.useState<string | null>(items.current_page + 1);
    // const [prevPage, setPrevPage] = React.useState<string | null>(items.current_page - 1);

    console.log(items);

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <Link preserveScroll preserveState href={items.prev_page_url || items.first_page_url}>
                            <Button className="hover:cursor-pointer" variant='ghost'><ChevronLeftIcon /> Kembali</Button>
                        </Link>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{items.current_page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <Link preserveScroll preserveState href={items.next_page_url || items.last_page_url}>
                            <Button className="hover:cursor-pointer" variant='ghost'>Selanjutnya <ChevronRightIcon /></Button>
                        </Link>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <p className="text-center text-sm text-muted-foreground">halaman {items.current_page} dari {items.last_page}</p>
        </div>
    )
}