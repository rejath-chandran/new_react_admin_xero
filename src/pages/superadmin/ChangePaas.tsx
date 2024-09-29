import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChangePassword } from "@/api/services/staff"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"


const ChangePaas = () => {
    const navigate = useNavigate()
    const [back, setBack] = useState(false)
    const { register, handleSubmit, watch, formState: { errors}, resetField} = useForm<any>();

    const newPassword = watch('new_password', '');

    const update:any=useMutation<any>({
        mutationFn:(data)=>ChangePassword(data),
        onSuccess:(data)=>{
            toast.success("Password changed successfully")
            resetField("current_password")
            resetField("new_password")
            resetField("confirm_password")
            setBack(true)
        },
        onError:(error:any)=>{
            console.log(error.response.data.non_field_errors)
            toast.error(` ${error.response.data.non_field_errors}`)
            resetField("current_password")
            resetField("new_password")
            resetField("confirm_password")
        }
    })

    const handleChangePassword = async (data:any) => {
        update.mutate(data)
        
    }
    
  return (
    <>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Toaster />
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          {/* <h1 className="text-3xl font-semibold">Change Password</h1> */}
        </div>
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Enter your current password and a new password below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password">Current Password</label>
                <Input id="current-password" type="password" {...register('current_password', {
                 required: 'current password is required',
          })}/>
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password">New Password</label>
                <Input id="new-password" type="password" {...register("new_password", {
                    required: 'New password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}/>
                  {errors.new_password && <p className="text-red-500">{errors.new_password.message?.toString()}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password">Confirm New Password</label>
                <Input id="confirm-password" type="password" {...register("confirm_password", {
                    required: 'Confirm password is required',
                    validate: (value) => value === newPassword || 'Passwords do not match',
                  })}/>
              </div>
              {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message?.toString()}</p>}
            </CardContent>
            <CardFooter>
              {
                !back ? <>
                {
                    update.isLoading ? <Button disabled className="w-full">
                        <Loader2 className="w-4 h-4 animate-spin" /> 
                    </Button>:
                    <Button className="w-full" onClick={handleSubmit(handleChangePassword)}>Change Password</Button>
                }
                </> :
                <Button className="w-full" onClick={()=>navigate("/admin/services")}>Back</Button>
}
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}

export default ChangePaas