import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CreateCustomer = () => {
    const handleClose = () => {
        window.history.back()
    }

    return (
        <Dialog defaultOpen={true} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Pelanggan</DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk menambahkan pelanggan baru.
                    </DialogDescription>
                </DialogHeader>
                <form method="post" action="/customers">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col items-start space-y-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input id="name" name="name" placeholder="Nama lengkap pelanggan" />
                        </div>
                        <div className="flex flex-col items-start space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Alamat email pelanggan" />
                        </div>
                        <div className="flex flex-col items-start space-y-1.5">
                            <Label htmlFor="phone_number">No. Telepon</Label>
                            <Input id="phone_number" name="phone_number" placeholder="Nomor telepon pelanggan" />
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCustomer