import { router } from "@inertiajs/react"
import { Search } from "lucide-react";
// import { useState } from "react";
import type { Item } from "@/types/item";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const CreateRental = ({ items, showCreateRentalModal }: { items: Item[], showCreateRentalModal: boolean }) => {
    const closeCreateRentalModal = () => {
        router.get(route('admin.rental.index'), {}, { preserveState: true, preserveScroll: true });
    }

    // const [showChooseItem, setShowChooseItem] = useState(true);

    return (
        <>
            <Dialog open={showCreateRentalModal} onOpenChange={(open) => !open && closeCreateRentalModal()}>
                {/* choose item */}
                <DialogContent className=" max-w-[90vw]! max-h-[80vh]! flex flex-col overflow-hidden">
                    <DialogHeader>
                        <DialogTitle>Pilih Item</DialogTitle>
                        <DialogDescription>Dialog Description</DialogDescription>
                    </DialogHeader>
                    {/* search bar */}
                    <div className="relative md:w-1/3 mr-3">
                        <Input
                            type="text"
                            placeholder="Cari produk..."
                            className="pr-10"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <Search className="w-7 absolute right-0 flex items-center pr-3" />
                        </span>
                    </div>
                    <ScrollArea className="flex-1 overflow-y-auto pr-1">
                        {/* Display all item, stock and image so user can choose! */}
                        {/* <div className="flex-1 overflow-y-auto pr-1"> */}
                        <div className="grid grid-cols-5 gap-4 p-1">
                            {/* {items?.map((item) => (
                            <div key={item.id} className="border rounded-md p-4">
                                <img src={`/storage/${item.images[0]?.path}`} alt={item.name} className="w-full h-30 object-cover mb-4" />
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p>Stock: {item.stock}</p>
                            </div>
                        ))} */}

                            {items?.map((item) => (
                                <Card className="mx-auto w-full max-w-sm pt-0 hover:ring-4 hover:ring-primary transition duration-300" key={item.id}>
                                    {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
                                    <img
                                        src={`/storage/${item.images[0]?.path}`}
                                        alt={item.name}
                                        className="relative z-20 aspect-video w-full object-cover"
                                    />
                                    <CardHeader>
                                        <CardTitle>{item.name}</CardTitle>
                                        <CardDescription>
                                            Stok : {item.stock}
                                        </CardDescription>
                                        <h2>
                                            Harga/Hari : <strong>Rp {item.price_per_day.toLocaleString('id-ID')}</strong>
                                        </h2>
                                    </CardHeader>
                                    <CardFooter className="p-1">
                                        <a href={route('admin.rental.create', { item_id: item.id })} className="w-full">
                                            <Button className="w-full">Pilih</Button>
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        {/* </div> */}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateRental