import { useForm } from "@inertiajs/react"
import {
    EditIcon,
    EyeIcon,
    MoreVertical,
    Trash,
} from "lucide-react"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Category } from "@/types/category"
import type { Item } from "@/types/item"
import EditItem from "./edit-item"

export function ActionItem({ item, categories }: { item: Item, categories: Category[] }) {
    const { delete: destroyRequest } = useForm()

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isEditItemOpen, setIsEditItemOpen] = useState(false)

    const handleDelete = (itemId: number) => {
        destroyRequest(route('admin.item.destroy', itemId))
    }

    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DialogTrigger asChild>
                            <DropdownMenuItem className="focus:bg-primary">
                                <EyeIcon />
                                Lihat
                            </DropdownMenuItem>
                        </DialogTrigger>
                        {/* <DialogEditCustomer> */}
                        <DropdownMenuItem onSelect={() => setIsEditItemOpen(true)} className="focus:bg-primary">
                            <EditIcon />
                            Edit
                        </DropdownMenuItem>
                        {/* </DialogEditCustomer> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsAlertOpen(true)} variant="destructive">
                            <Trash />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Dialog>

            {/* Alert Delete Dialog */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogTrigger asChild>
                    {/* <Button variant="outline">Show Dialog</Button> */}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apa kamu yakin ingin menghapus item {item.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aksi ini dapat menghilangkan item {item.name} secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)} variant={"destructive"}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <EditItem
                categories={categories}
                item={item}
                open={isEditItemOpen}
                setOpen={setIsEditItemOpen}
            />
        </>
    )
}