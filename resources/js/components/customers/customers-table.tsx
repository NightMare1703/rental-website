import { XIcon } from "lucide-react"
import { DashboardTableMore } from "@/components/dashboard-table-more"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { User } from "@/types/auth"

export function CustomersTable({ users }: { users: User[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">No</TableHead>
                    <TableHead className="font-bold">NAMA</TableHead>
                    <TableHead className="font-bold">ALAMAT</TableHead>
                    <TableHead className="font-bold">NO HP</TableHead>
                    <TableHead className="font-bold">STATUS</TableHead>
                    <TableHead className="text-right">AKSI</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>Jl. Kalibaru no. 19</TableCell>
                        <TableCell>085111336787</TableCell>
                        <TableCell>
                            <Badge variant="outline" className="text-destructive bg-destructive/10 gap-1 text-md">
                                <XIcon />
                                Batal
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DashboardTableMore />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}