import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";


export const ServiceAdd = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [checklistItems, setChecklistItems] = useState<
    { id: number; text: string }[]
  >([
    // { id: 1, text: 'Profile picture updated' },
  ]);
  const [newItemText, setNewItemText] = useState("");

  const addChecklistItem = () => {
    if (newItemText.trim() !== "") {
      setChecklistItems([
        ...checklistItems,
        { id: Date.now(), text: newItemText },
      ]);
      setNewItemText("");
    }
  };

  const removeChecklistItem = (id: number) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id));
  };
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default" className="sm h-8 gap-1">
        Add Service
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Service</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name :
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Desc:
          </Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Check List :</Label>
          <div className="col-span-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="New checklist item"
                className="flex-grow"
              />
              <Button onClick={addChecklistItem}>
                <Plus size={16} />
              </Button>
            </div>
            <div className="space-y-1 mt-2">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-2 bg-secondary rounded-md p-1.5 text-sm"
                >
                  <span className="flex-grow">{item.text}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeChecklistItem(item.id)}
                    aria-label={`Remove ${item.text}`}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
