import {
    EditIcon,
    EyeIcon,
    MoreVertical,
    Trash,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DialogEditCustomer } from "./dialog-edit-customer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

export function DashboardTableMore() {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <EyeIcon />
                            Lihat
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogEditCustomer>
                        <DropdownMenuItem>
                            <EditIcon />
                            Edit
                        </DropdownMenuItem>
                    </DialogEditCustomer>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                        <Trash />
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function DashboardTableMore() {
//     return (
//         <Dialog>
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="outline">Aksi</Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                     <DropdownMenuLabel>Opsi</DropdownMenuLabel>
//                     {/* Menggunakan DialogTrigger sebagai DropdownMenuItem */}
//                     <DialogTrigger asChild>
//                         <DropdownMenuItem>
//                             <span>Edit Profil</span>
//                         </DropdownMenuItem>
//                     </DialogTrigger>
//                 </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Konten Dialog */}
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Edit Profil</DialogTitle>
//                     <DialogDescription>
//                         Ubah informasi profil Anda di sini.
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }
