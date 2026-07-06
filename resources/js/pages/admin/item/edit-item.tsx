import { Head, useForm } from "@inertiajs/react"
import { Check, ChevronsUpDown, ImagePlus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Category } from "@/types/category"
import type { Item } from "@/types/item"

const EditItem = ({ item, categories }: { item: Item, categories: Category[] }) => {

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
        post(route('admin.item.update', item.id), {
            forceFormData: true,
        })
    }

    const totalImages = oldImages.length + newPreviews.length

    return (
        <>
            <Head title="Edit Item" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Edit Item</h1>
                <p>Perbarui informasi item yang akan ditampilkan ke pelanggan</p>
                <div className="mt-4">
                    <form onSubmit={save}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="">
                                <div className="mb-2 border-2 rounded-md p-4">
                                    <div className="text-lg font-bold pb-2 mb-4 border-b-2">Informasi Dasar</div>
                                    <div className="space-y-4">
                                        {/* Input Nama Item */}
                                        <div className="flex flex-col items-start space-y-2">
                                            <Label htmlFor="name">Nama Item</Label>
                                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} id="name" type='text' name="name" placeholder="Contoh : ToyotaAvanza" />
                                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                            <p className="text-xs text-muted-foreground">Gunakan nama yang jelas dan mudah dicari pelanggan</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Input Stock */}
                                            <div className="flex flex-col items-start space-y-1.5">
                                                <Label htmlFor="stock">Stok</Label>
                                                <Input value={data.stock} onChange={(e) => setData('stock', e.target.value)} id="stock" type='number' name="stock" placeholder="Stok item" />
                                                {errors.stock && <p className="text-destructive text-sm">{errors.stock}</p>}
                                                <p className="text-xs text-muted-foreground">
                                                    Jumlah unit yang tersedia untuk disewa
                                                </p>
                                            </div>
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
                                        </div>
                                        {/* Input Deskripsi */}
                                        <div className="flex flex-col items-start space-y-1.5">
                                            <Label htmlFor="description">Deskripsi <span className="text-xs text-muted-foreground">(opsional)</span></Label>
                                            <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} id="description" name="description" placeholder="Deskripsikan kondisi, keunggulan item ini, dll..." />
                                            {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                                            <p className="text-xs text-muted-foreground">Deskripsi yang baik membantu pelanggan memutuskan untuk menyewa item ini</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2 border-2 rounded-md p-4">
                                    <div className="text-lg font-bold pb-2 mb-4 border-b-2">Harga Sewa</div>
                                    <div className="space-y-4">
                                        <div className="flex flex-col items-start space-y-1.5">
                                            <Label htmlFor="price_per_day">Harga Perhari</Label>
                                            {/* <Input id="price_per_day" type='number' name="price_per_day" placeholder="Harga sewa perhari" /> */}
                                            <InputGroup>
                                                <InputGroupAddon>
                                                    <InputGroupText>Rp</InputGroupText>
                                                </InputGroupAddon>
                                                <InputGroupInput id="price_per_day" name="price_per_day" value={priceDisplay}
                                                    onChange={handlePriceChange}
                                                    type='text' inputMode='numeric' placeholder="500000" />
                                                <InputGroupAddon align="inline-end">
                                                    <InputGroupText>/ Hari</InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {errors.price_per_day && <p className="text-destructive text-sm">{errors.price_per_day}</p>}
                                            <p className="text-xs text-muted-foreground">Total harga pesanan akan dihitung otomatis: Harga/Hari × Jumlah Hari. Kamu tidak perlu mengisi total manual.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="mb-2 border-2 rounded-md p-4">
                                    <div className="text-lg font-bold pb-2 mb-4 border-b-2">Foto Item</div>
                                    <div className={totalImages >= 5 ? `hidden` : `space-y-4`}>
                                        {/* area upload gambar */}
                                        <Label htmlFor="images" className="relative p-2 flex flex-col gap-0.5  item-center justify-center w-full border-2 border-dashed rounded-md cursor-pointer bg-muted hover:bg-muted/50">
                                            <Input multiple id="images" name="images" onChange={handleImagesChange} className="absolute h-full opacity-0 cursor-pointer" type="file" />
                                            <ImagePlus size={40} className="mr-2 text-muted-foreground" />
                                            <p className="text-sm text-muted-foreground">Upload gambar item</p>
                                            <p className="text-xs text-muted-foreground">Seret & lepas file di sini, atau klik untuk pilih</p>
                                            <p className="text-xs text-muted-foreground">JPG,
                                                PNG, WEBP — maks. 2MB per file
                                            </p>
                                        </Label>
                                    </div>
                                    {imageErrors &&
                                        imageErrors.map((error, index) => (
                                            <p className="text-destructive text-sm" key={index}>{error}</p>
                                        ))
                                    }
                                    {errors.images && <p className="text-destructive text-sm">{errors.images}</p>}
                                    {progress && (
                                        <Progress value={progress.percentage} className="w-full mt-2" />
                                    )}
                                    {/* Preview Image */}
                                    {/* Preview Grid */}
                                    {totalImages > 0 && (
                                        <div className="flex mt-2 flex-col items-start space-y-1.5">
                                            <Label>Preview Gambar</Label>
                                            <div className="grid grid-cols-3 gap-2 w-full">
                                                {oldImages.map((image, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={image.url}
                                                            alt={`Preview ${index + 1}`}
                                                            className="rounded-md aspect-square object-cover w-full"
                                                        />
                                                        {/* Tombol hapus */}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeOldImages(index)}
                                                            className="absolute cursor-pointer top-1 right-1 bg-destructive text-white 
                                                    rounded-full w-5 h-5 text-xs items-center 
                                                    justify-center hidden group-hover:flex"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
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
                                                            className="absolute cursor-pointer top-1 right-1 bg-destructive text-white 
                                                    rounded-full w-5 h-5 text-xs items-center 
                                                    justify-center hidden group-hover:flex"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-2 border-2 rounded-md p-4">
                                    <div className="text-lg font-bold pb-2 mb-4 border-b-2">Tips Foto yang Baik</div>
                                    <ol className="ml-10 text-muted-foreground">
                                        <li>. Gunakan cahaya alami, hindari flash langsung</li>
                                        <li>. Foto dari beberapa sudut (depan, samping, dalam)</li>
                                        <li>. Resolusi minimal 800 x 800 piksel</li>
                                        <li>. Jangan tambahkan teks atau watermark di foto</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2 border-2 rounded-md p-2">
                                <Button variant={'outline'} size={'lg'} onClick={() => window.history.back()}>Batal</Button>
                                <Button size={'lg'} disabled={processing} type="submit">Simpan</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

EditItem.layout = {
    breadcrumbs: [
        {
            title: 'Item',
            href: route('admin.item.index'),
        },
        {
            title: 'Edit Item',
            // href: route('admin.item.edit', item),
            // href: route('admin.item.edit', item.id),
        },
    ],
}

export default EditItem