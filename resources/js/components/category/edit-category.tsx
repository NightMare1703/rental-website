import { useForm } from '@inertiajs/react';
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

export default function EditCategory({ category, open, onOpenChange }: { category: any; open: boolean; onOpenChange: (open: boolean) => void }) {

    const { data, setData, put, errors, processing } = useForm({
        name: category.name,
        slug: category.slug,
    })

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const save = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.category.update', category.id), {
            onSuccess: () => onOpenChange(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Kategori</DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk mengubah kategori.
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
                            Ubah
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}