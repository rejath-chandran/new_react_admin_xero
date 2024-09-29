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
import { useForm, useFieldArray } from "react-hook-form";

export const ServiceAdd = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    service_name: string;
    description: string;
    checklistItems: string[];
  }>({
    defaultValues: {
      checklistItems: [],
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "checklistItems",
  });

  const [newItemText, setNewItemText] = useState("");

  const addChecklistItem = () => {
    if (newItemText.trim() !== "") {
      append(newItemText.trim());
      setNewItemText("");
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
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
            Add a new service to the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name :
              </Label>
              <Input
                // id="name"
                {...register("service_name",{
                  required: "Service name is required",
                  minLength: {
                    value: 3,
                    message: "Service name must be at least 3 characters",
                  },
                })}
                className="col-span-3"
              />
              
            </div>
            {errors.service_name && (
                <p className="text-red-500 text-sm mt-1 ml-12">
                  {errors.service_name.message}
                </p>
              )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Desc:
              </Label>
              <Input
                {...register("description",{
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                className="col-span-3"
              />
            </div>
            {errors.description && (
                <p className="text-red-500 text-sm mt-1 ml-12">
                  {errors.description.message}
                </p>
              )}
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
                  <Button type="button" onClick={addChecklistItem}>
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="space-y-1 mt-2">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 bg-secondary rounded-md p-1.5 text-sm"
                    >
                      <Input
                        {...register(`checklistItems.${index}`, {
                          required: "Checklist item cannot be empty",
                        })}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        aria-label={`Remove item ${index + 1}`}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.checklistItems && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.checklistItems.message}
                  </p>
                )}
                {errors.root?.atLeastOneItem && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.root.atLeastOneItem.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
