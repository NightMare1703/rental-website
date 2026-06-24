import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ActionCategories } from "@/components/category/action-categories"
import type { Category } from "@/types/category"

const CategoriesTable = ({ categories }: { categories: Category[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">No</TableHead>
                    <TableHead className="font-bold">Nama</TableHead>
                    <TableHead className="font-bold text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category, index) => (
                    <TableRow key={category.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell className="text-right">
                            <ActionCategories category={category} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CategoriesTable