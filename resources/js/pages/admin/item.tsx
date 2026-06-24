import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import CategoriesTable from '@/components/category/categories-table';
import CreateCategory from '@/components/category/create-category';
import CreateItem from '@/components/item/create-item';
import { ItemsTable } from '@/components/item/items-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Item } from '@/types/item';

export default function Item({
    items, categories, showCreateItemModal, showCreateCategoryModal
}: {
    items: Item[]; categories: any[]; showCreateItemModal: boolean; showCreateCategoryModal: boolean
}) {
    const { flash } = usePage();

    return (
        <>
            {flash.message && <div className='toast hidden'>{toast.success(`${flash.message}`, { position: 'top-center' })}</div>}
            <Head title="Items" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className='font-bold text-2xl my-4'>Items</h1>
                {/* Cari Item */}
                <div className="flex justify-end">
                    <div className="relative md:w-1/3 mr-3">
                        <Input
                            type="text"
                            placeholder="Cari Item..."
                            className="pr-10"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search size={20} />
                        </span>
                    </div>
                    {/* Tambah Item */}
                    <Button className='p-0'>
                        <Link href={route('admin.item.create')} className="flex items-center gap-2 px-4 py-2">
                            <Plus />
                            Tambah Item
                        </Link>
                    </Button>
                </div>
                {/* Tabel Kategori */}
                <div className="grid md:grid-cols-7 h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-2">
                    <div className="md:col-span-5 relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-3">
                        <h1 className='font-bold text-xl my-1'>Items</h1>
                        <ItemsTable categories={categories} items={items} />
                    </div>
                    <div className="md:col-span-2 relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-3">
                        <h1 className='font-bold text-xl my-1'>Categories</h1>
                        <Button className=" w-full text-center p-0 mb-2 hover:cursos-pointer">
                            <Link href={route('admin.category.create')} className="w-full px-4 py-2 flex justify-center items-center gap-1">
                                <Plus />
                                Tambah Kategori
                            </Link>
                        </Button>
                        <CategoriesTable categories={categories} />
                    </div>

                </div >
            </div >

            <CreateCategory showCreateCategoryModal={showCreateCategoryModal} />
            <CreateItem showCreateItemModal={showCreateItemModal} categories={categories} />

        </>
    );
}
