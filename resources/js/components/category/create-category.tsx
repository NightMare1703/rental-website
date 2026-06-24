import { router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateCategory({ showCreateCategoryModal }: { showCreateCategoryModal: boolean }) {

    const closeCreateCategory = () => {
        router.get(route('admin.item.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        })
    }

    // Generate slug from name
    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const { data, setData, post, errors, processing } = useForm<{
        name: string,
        slug: string,
    }>({
        name: '',
        slug: '',
    })

    const save = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('admin.category.store'), {
            onSuccess: () => closeCreateCategory()
        })
    }

    return (
        <Dialog open={showCreateCategoryModal} onOpenChange={(open) => !open && closeCreateCategory()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Kategori</DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk menambahkan kategori baru.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={save}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col items-start space-y-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" value={data.name} onChange={(e) => {
                                setData('name', e.target.value)
                                setData('slug', generateSlug(e.target.value))
                            }} required type='text' name="name" placeholder="Nama kategori" />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col items-start space-y-1.5">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" value={data.slug} disabled type='text' name="slug" placeholder="kategori" />
                        </div>
                        <Button type="submit" disabled={processing}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}