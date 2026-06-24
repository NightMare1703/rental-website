import { Head, Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import CreateRental from '@/components/rental/create-rental';
import { RentalsTable } from '@/components/rental/rentals-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Rental({ rentals, items, showCreateRentalModal }
    : { rentals: any[], items: any[], showCreateRentalModal: boolean }) {

    return (
        <>
            <Head title="Rentals" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className='font-bold text-2xl my-4'>Rentals</h1>
                {/* Cari Pelanggan */}
                <div className="flex justify-end">
                    <div className="relative md:w-1/3 mr-3">
                        <Input
                            type="text"
                            placeholder="Cari pesanan..."
                            className="pr-10"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search className="w-7 absolute right-0 flex items-center pr-3" />
                        </span>
                    </div>
                    {/* Tambah Pelanggan */}
                    <Button className="flex items-center gap-2">
                        <Link href={route('admin.rental.create')} className="flex items-center gap-2">
                            <Plus />
                            Tambah Pesanan
                        </Link>
                    </Button>
                </div>
                {/* Tabel Pelanggan */}

                <div className="grid auto-rows-min gap-4 ">
                    <div className=" relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-3">
                        <RentalsTable rentals={rentals} />
                    </div>
                </div>
            </div >

            <CreateRental items={items} showCreateRentalModal={showCreateRentalModal} />
        </>
    );
}

// Customers.layout = {
//     breadcrumbs: [
//         {
//             title: 'Customers',
//             href: customers(),
//         },
//     ],
// };