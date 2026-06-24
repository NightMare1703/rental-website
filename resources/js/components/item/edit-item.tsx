import { useForm } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/category';
import type { Item } from '@/types/item';


const EditItem = ({ item, categories, open, setOpen }: { item: Item, categories: Category[], open: boolean, setOpen: (open: boolean) => void }) => {
    // Form state
    const { data, setData, post, processing, errors, progress } = useForm<{
        _method: string,
        category_id: any,
        name: any,
        description: any,
        price_per_day: any,
        stock: any,
        images: any[],
        deleted_image_ids: number[],
    }>({
        _method: 'PUT',
        category_id: item.category_id,
        name: item.name,
        description: item.description,
        price_per_day: item.price_per_day,
        stock: item.stock,
        images: [],
        deleted_image_ids: [],
    })

    // State untuk preview
    // Ganti state oldImages dari string[] menjadi objek {id, url}
    const [oldImages, setOldImages] = useState(item.images.map(image =>
        ({ id: image.id, url: ` /storage/${image.path}` }))
    )

    // Tambahkan state untuk menyimpan ID gambar yang dihapus
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);

    useEffect(() => {
        setData('deleted_image_ids' as any, deletedImageIds);
    }, [deletedImageIds])

    const [newPreviews, setNewPreviews] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);

    // Popover state
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [value, setValue] = useState(
        categories.find(category => category.id === item.category_id)?.name ?? ''
    );

    const [imageErrors, setImageErrors] = useState<string[]>([]);

    // Access image preview
    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])

        // maksimal upload 5 file
        const remaining = 5 - oldImages.length
        const limitedFiles = files.slice(0, remaining)

        const validationImages: string[] = []
        const maxFileSize = 2 * 1024 * 1024 //2MB
        const allowedType = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

        limitedFiles.forEach(file => {
            if (file.size > maxFileSize) {
                validationImages.push(`File ${file.name} terlalu besar. Maksimal 2MB.`)
            }

            if (!allowedType.includes(file.type)) {
                validationImages.push(`File ${file.name} bukan gambar.`)
            }
        })

        setImageErrors(validationImages)

        if (imageErrors.length === 0) {
            // Buat URL untuk preview
            const urlPreviews = limitedFiles.map(file => URL.createObjectURL(file))

            setNewImages(limitedFiles)
            setNewPreviews(urlPreviews)
            setData('images', limitedFiles)
        }
    };

    // remove existing images
    const removeOldImages = (index: number) => {
        const imageToDelete = oldImages[index]
        setDeletedImageIds(prev => [...prev, imageToDelete.id])
        setOldImages(prev => prev.filter((_, i) => i !== index))
        // alert('hapus gambar' + imageToDelete.url)
    }

    const removeNewImage = (index: number) => {
        const updatedImages = newImages.filter((_, i) => i !== index);
        const updatedPreviews = newPreviews.filter((_, i) => i !== index);
        setNewImages(updatedImages);
        setNewPreviews(updatedPreviews);
        setData('images', updatedImages);
    };

    // Tambahkan helper di atas komponen
    const [priceDisplay, setPriceDisplay] = useState(
        data.price_per_day
            ? new Intl.NumberFormat("id-ID").format(Number(data.price_per_day))
            : ""
    );

    // Handler untuk input harga dengan format Rupiah
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 1. Ambil hanya digit dari input
        const raw = e.target.value.replace(/\D/g, "");

        // 2. Format untuk tampilan
        const formatted = raw
            ? new Intl.NumberFormat("id-ID").format(Number(raw))
            : "";

        // 3. Update keduanya
        setPriceDisplay(formatted);       // ← untuk tampil di input
        setData("price_per_day", raw);    // ← angka mentah untuk dikirim
    };

    // Handler untuk submit form
    const save = (e: React.FormEvent) => {
        e.preventDefault()
        // console.table({ deletedImageIds })
        post(route('admin.item.update', item.id), {
            forceFormData: true,
            onSuccess: () => setOpen(false)
        })
    }

    const totalImages = oldImages.length + newPreviews.length

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Tambah Item</DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk menambahkan item baru.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className='h-100'>
                    <form onSubmit={save}>
                        <div className="grid w-full items-center gap-4">
                            {/* Image upload */}
                            {/* Ganti bagian Image upload di JSX */}

                            {/* Upload */}
                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="images">
                                    Gambar
                                    <span className="text-muted-foreground text-xs ml-1">
                                        (maks. 5 file, tersisa {5 - totalImages} file)
                                    </span>
                                </Label>
                                <Input
                                    id="images"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImagesChange}
                                    disabled={totalImages >= 5}
                                />
                                {totalImages >= 5 && (
                                    <p className="text-xs text-destructive">
                                        Maksimal 5 gambar sudah tercapai.
                                    </p>
                                )}
                                {progress && (
                                    <progress value={progress.percentage} max="100" className="w-full" />
                                )}
                                {imageErrors.length > 0 &&
                                    imageErrors.map((error, index) => (
                                        <p key={index} className="text-xs text-destructive">{error}</p>
                                    )
                                    )}
                            </div>

                            {/* Preview Grid */}
                            {totalImages > 0 && (
                                <div className="flex flex-col items-start space-y-1.5">
                                    <Label>Preview Gambar</Label>
                                    <div className="grid grid-cols-3 gap-2 w-full">
                                        {/* Preview existing images */}
                                        {oldImages.map((image, index) => (
                                            <div key={image.id} className="relative group">
                                                <img
                                                    src={image.url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="rounded-md aspect-square object-cover w-full"
                                                />
                                                {/* Tombol hapus */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeOldImages(index)}
                                                    className="absolute top-1 right-1 bg-destructive text-white 
                                                    rounded-full w-5 h-5 text-xs items-center 
                                                    justify-center hidden group-hover:flex"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}

                                        {/* Preview new images */}
                                        {newPreviews.map((url, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className="rounded-md aspect-square object-cover w-full"
                                                />
                                                {/* Tombol hapus */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(index)}
                                                    className="absolute top-1 right-1 bg-destructive text-white 
                                                    rounded-full w-5 h-5 text-xs items-center 
                                                    justify-center hidden group-hover:flex"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Input category */}
                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="category">Kategori</Label>
                                <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={false}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={popoverOpen}
                                            className="w-full justify-between"
                                        >
                                            {value
                                                ? categories.find((c) => c.name === value)?.name
                                                : "Pilih kategori..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-full p-0"
                                        onOpenAutoFocus={(e) => e.preventDefault()}
                                    >
                                        <Command>
                                            <CommandInput placeholder="Cari kategori..." />
                                            <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        key={category.id}
                                                        value={category.name}
                                                        onSelect={(currentValue) => {
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setPopoverOpen(false)
                                                            setData('category_id', category.id)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                value === category.name ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {category.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.category_id && <p className="text-destructive text-sm">{errors.category_id}</p>}
                            </div>

                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="name">Nama Item</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} id="name" type='text' name="name" placeholder="Masukkan nama item" />
                                {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                            </div>
                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} id="description" name="description" placeholder="Deskripsi item..." />
                                {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                            </div>
                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="price_per_day">Harga Perhari</Label>
                                {/* <Input id="price_per_day" type='number' name="price_per_day" placeholder="Harga sewa perhari" /> */}
                                <InputGroup>
                                    <InputGroupAddon>
                                        <InputGroupText>Rp</InputGroupText>
                                    </InputGroupAddon>
                                    <InputGroupInput value={priceDisplay}
                                        onChange={handlePriceChange}
                                        type='text' inputMode='numeric' placeholder="500000" />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupText>IDR</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.price_per_day && <p className="text-destructive text-sm">{errors.price_per_day}</p>}
                            </div>
                            <div className="flex flex-col items-start space-y-1.5">
                                <Label htmlFor="stock">Stok</Label>
                                <Input value={data.stock} onChange={(e) => setData('stock', e.target.value)} id="stock" type='number' name="stock" placeholder="Stok item" />
                                {errors.stock && <p className="text-destructive text-sm">{errors.stock}</p>}
                            </div>
                            <Button disabled={processing} type="submit">Simpan</Button>
                        </div>
                    </form>
                </ScrollArea>
            </DialogContent>
        </Dialog >
    )
}

export default EditItem