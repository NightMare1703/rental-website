import { useForm } from "@inertiajs/react"
import {
    EditIcon,
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
import { Dialog, } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditCategory from "./edit-category";

// import { AlertDeleteCategory } from "./alert-delete-category"
export function ActionCategories({ category }: { category: any }) {

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const { delete: destroyRequest } = useForm();

    const handleDelete = (categoryId: number) => {
        destroyRequest(route('admin.category.destroy', categoryId))
    }

    return (
        <>
            {/* Dialog Main Menu */}
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {/* <Link href={edit.url(category.id)}> */}
                        <DropdownMenuItem onSelect={() => {
                            setIsEditOpen(true)
                        }}
                            className="focus:bg-primary"
                        >
                            <EditIcon />
                            Edit
                        </DropdownMenuItem>
                        {/* </Link> */}
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
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apa kamu yakin ingin menghapus kategori {category.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aksi ini dapat menghilangkan kategori {category.name} secara permanen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(category.id)} variant={"destructive"}>Hapus</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <EditCategory
                category={category}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
            />
        </>
    )
}