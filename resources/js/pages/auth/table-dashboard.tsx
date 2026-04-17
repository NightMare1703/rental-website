import { Check, XIcon } from "lucide-react"
import { DashboardTableMore } from "@/components/dashboard-table-more"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function TableDashboard() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">Id</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>No Hp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Ariq Mikail</TableCell>
                    <TableCell>Jl. Kalibaru no. 19</TableCell>
                    <TableCell>085111336787</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="text-green-500 gap-1 text-md">
                            <Check />
                            Selesai
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DashboardTableMore />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Rizky Alif</TableCell>
                    <TableCell>Jl. Kalibaru no. 19</TableCell>
                    <TableCell>085111336787</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="text-primary gap-1 text-md">
                            <Spinner />
                            Proses
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DashboardTableMore />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Rizky Alif</TableCell>
                    <TableCell>Jl. Kalibaru no. 19</TableCell>
                    <TableCell>085111336787</TableCell>
                    <TableCell>
                        <Badge variant="outline" className="text-destructive gap-1 text-md">
                            <XIcon />
                            Batal
                        </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DashboardTableMore />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}