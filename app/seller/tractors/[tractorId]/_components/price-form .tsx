"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormState, useForm } from "react-hook-form";


import {
    Form,
    FormControl,
    FormItem,
    FormMessage,
    FormField
} from "../../../../components/ui/form";
 

import { Button } from "../../../../components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "../../../../lib/utils";
import { Tractor } from "@prisma/client";
import { Input } from "../../../../components/ui/input";
import { formatPrice } from "../../../../lib/format";


interface PriceFormProps{
    initialData: Tractor;

    tractorId: string;
};


const formSchema = z.object({
    price: z.coerce.number(),
});

export const PriceForm = ({
    initialData,
    tractorId
}: PriceFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           price: initialData?.price || undefined,
        }
    });

    const { isSubmiting, isValid } = form.formState as FormState<{ title: string }> & { isSubmiting: boolean };

    const onsubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.patch(`/api/tractor/${tractorId}`, values)
            toast.success("Title updated successfully")
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong")
       }
    }


    return (
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Tractor price
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit price
                        </>
                    ) }
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.price && "text-slate-500 italic"
                )}>
                    {initialData.price
                    ? formatPrice(initialData.price)
                    : "No price"
                    }
                </p>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmiting}
                                            placeholder="Set a price for your tractor"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage
                                    
                                    />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmiting}
                                type="submit"
                            >
                                Save
                            </Button>

                        </div>

                    </form>

                </Form>
            )}
        </div>
    )
}