import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { customers } from '@/routes';
// import customers from '@/routes/customers';
// import type { User } from '@/types/auth';
import type { User } from '@/types';
import { CustomersTable } from '../components/customers/customers-table';
// import { User } from 'lucide-react';

export default function Customers({ users }: { users: User[] }) {

    return (
        <>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className='font-bold text-2xl my-4'>Customers</h1>
                {/* Cari Pelanggan */}
                <div className="flex justify-end">
                    <div className="relative md:w-1/3 mr-3">
                        <Input
                            type="text"
                            placeholder="Cari pelanggan..."
                            className="pr-10"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </span>
                    </div>
                    {/* Tambah Pelanggan */}
                    <Button className="flex items-center gap-2">
                        <Link href="/customers/create" className="flex items-center gap-2">
                            <Plus />
                            Tambah Pelanggan
                        </Link>
                    </Button>
                </div>
                {/* Tabel Pelanggan */}

                <div className="grid auto-rows-min gap-4 ">
                    <div className=" relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-3">
                        <CustomersTable users={users} />
                    </div>
                </div>
            </div >
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