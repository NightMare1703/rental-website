import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Category } from "@/types/category"
import type { Item } from "@/types/item"
import { ActionItem } from "./action-item"

export function ItemsTable({ items, categories }: { items: Item[], categories: Category[] }) {
    const formatPrice = (price: number) => {
        return price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">No</TableHead>
                    <TableHead className="font-bold">FOTO</TableHead>
                    <TableHead className="font-bold">STOK</TableHead>
                    <TableHead className="font-bold">NAMA</TableHead>
                    <TableHead className="font-bold">KATEGORI</TableHead>
                    <TableHead className="font-bold">HARGA PERHARI</TableHead>
                    <TableHead className="font-bold text-right">AKSI</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        {/* image looping display */}
                        <TableCell className="flex overflow-hidden">
                            {/* {item.images && */}
                            <img
                                width={100}
                                height={100}
                                src={`/storage/${item.images[0]?.path}`}
                                alt={item.name}
                                className="object-cover w-15 h-15 rounded-md" />
                            {/* } */}
                        </TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            {item.category?.name || 'Tidak diketahui'}
                        </TableCell>
                        <TableCell>{formatPrice(item.price_per_day)}</TableCell>
                        <TableCell className="text-right">
                            <ActionItem categories={categories} item={item} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}