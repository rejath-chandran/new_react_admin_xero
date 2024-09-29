import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"


interface StaffEditProps {
  name: string
  isEditDialogOpen: boolean
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  editingStaff: any
  setEditingStaff: React.Dispatch<React.SetStateAction<any>>
  handleEditSave: () => void
  editingService: any
  setEditingService: React.Dispatch<React.SetStateAction<any>>
}

const StaffEdit = ({ name, isEditDialogOpen, setIsEditDialogOpen, editingStaff, setEditingStaff, handleEditSave, editingService, setEditingService }: StaffEditProps) => {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editingService?.service_name || ""}
                onChange={(e) =>
                  setEditingService((prev: any) =>
                    prev ? { ...prev, name: e.target.value } : null,
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={editingService?.description || ""}
                onChange={(e) =>
                  setEditingService((prev: any) =>
                    prev ? { ...prev, description: e.target.value } : null,
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default StaffEdit