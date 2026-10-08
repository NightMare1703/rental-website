import { Head, router, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Package, Plus, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import CategoriesTable from '@/components/category/categories-table';
import CreateCategory from '@/components/category/create-category';
import { ItemsTable } from '@/components/item/items-table';
import PaginationItems from '@/components/item/pagination-items';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
// import type { PaginatorItem } from '@/types/paginatorItem';
import type { Category } from '@/types/category';
import type { Item } from '@/types/item';
import type { PaginatorItem } from '@/types/paginatorItem';

export default function Item({
    items, categories
}: {
    items: PaginatorItem; categories: Category[]
}) {
    const { flash } = usePage();

    const [searchItem, setSearchItem] = useState('')
    const [categoryFilters, setCategoryFilters] = useState('')
    const isFirstRender = useRef(true); // Referensi untuk mendeteksi render pertama kali

    // Referensi untuk mendeteksi render pertama kali

    // request to server when searchItem change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Setel referensi ke false setelah render pertama kali

            return // Jangan lakukan request pada render pertama kali
        }

        const delayDebaunce = setTimeout(() => {
            router.get(route('admin.item.index'),
                { search: searchItem, category: categoryFilters },
                { preserveState: true, replace: true, preserveScroll: true, only: ['items'] })
        }, 300)

        return () => clearTimeout(delayDebaunce)
    }, [searchItem, categoryFilters])

    const [openCreateCategory, setOpenCreateCategory] = useState(false)

    return (
        <>
            <Head title="Item" />
            {flash.message && <div className='toast hidden'>{toast.success(`${flash.message}`, { position: 'top-center' })}</div>}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Summary */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="flex h-30 w-full justify-center items-center gap-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div>
                            <Package size={40} className='text-primary' />
                        </div>
                        <div>
                            <h1 className='font-bold text-left text-2xl'>Total Item</h1>
                            <p className='font-bold text-left text-4xl'>{items.data.length}</p>
                        </div>
                    </div>
                    <div className="flex h-30 w-full justify-center items-center gap-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div>
                            <Package size={40} className='text-primary' />
                        </div>
                        <div>
                            <h1 className='font-bold text-left text-2xl'>Tersedia</h1>
                            <p className='font-bold text-left text-4xl'>{items.data.length}</p>
                        </div>
                    </div>
                    <div className="flex h-30 w-full justify-center items-center gap-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div>
                            <Package size={40} className='text-primary' />
                        </div>
                        <div>
                            <h1 className='font-bold text-left text-2xl'>Sedang Disewa</h1>
                            <p className='font-bold text-left text-4xl'>{items.data.length}</p>
                        </div>
                    </div>
                    <div className="flex h-30 w-full justify-center items-center gap-4 relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                        <div>
                            <Package size={40} className='text-primary' />
                        </div>
                        <div>
                            <h1 className='font-bold text-left text-2xl'>Kategori</h1>
                            <p className='font-bold text-left text-4xl'>{categories.length}</p>
                        </div>
                    </div>
                </div>

                {/* Action bar */}
                <div className="p-4 flex flex-col gap-4 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {/* search */}
                    <div className="flex justify-end">
                        <div className="relative md:w-1/3 mr-3">
                            <Input
                                type="text"
                                placeholder="Cari Item..."
                                className="pr-10"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <Search size={20} />
                            </span>
                        </div>
                        {/* Tambah Item */}
                        <Button className='p-0' asChild>
                            <Link href={route('admin.item.create')} preserveState className="flex items-center gap-2 px-4 py-2">
                                <Plus />
                                Tambah Item
                            </Link>
                        </Button>
                    </div>
                    {/* category */}
                    <div className="flex justify-end gap-2 flex-wrap">
                        <Button variant='outline' onClick={() => setCategoryFilters('')} value={String(categoryFilters)} className={`text-center mb-2 hover:cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-500 rounded-full border-gray-500 bg-transparent ${String(categoryFilters) == '' && 'bg-cyan-500/20 text-cyan-500'}`}>
                            Semua
                        </Button>
                        {categories.map((category) => (
                            <div key={category.id} className="">
                                <Button variant='outline' onClick={() => setCategoryFilters(String(category.id))} value={String(categoryFilters)} className={`text-center mb-2 hover:cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-500 rounded-full border-gray-500 bg-transparent ${String(categoryFilters) === String(category.id) && 'bg-cyan-500/20 text-cyan-500'}`}>
                                    {category.name}
                                </Button>
                            </div>
                        ))}
                        {/* Tambah category */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="text-center mb-2 hover:cursor-pointer">
                                    Kelola Kategori
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                </DialogHeader>
                                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-3">
                                    <h1 className='font-bold text-xl my-1'>Categories</h1>
                                    {/* Tambah category */}
                                    <Button onClick={() => setOpenCreateCategory(true)} className="text-center p-0 mb-2 hover:cursor-pointer w-full px-4 py-2 flex justify-center items-center gap-1">
                                        {/* <Link href={route('admin.category.create')} preserveState className="w-full px-4 py-2 flex justify-center items-center gap-1"> */}
                                        <Plus />
                                        Tambah Kategori
                                        {/* </Link> */}
                                    </Button>
                                    <ScrollArea className="h-100 w-full rounded-md border">
                                        <CategoriesTable categories={categories} />
                                    </ScrollArea>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex justify-end">
                    </div>
                </div>

                {/* Tabel Kategori */}
                <div className=" h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-2">
                    <h1 className='font-bold text-xl my-1'>Tabel Item</h1>
                    <ItemsTable items={items} />
                </div >
                <PaginationItems items={items} />
            </div >

            <CreateCategory
                open={openCreateCategory}
                onOpenChange={setOpenCreateCategory}
            />
        </>
    );
}

Item.layout = {
    breadcrumbs: [
        {
            title: 'Item',
            href: route('admin.item.index'),
        },
    ],
};
