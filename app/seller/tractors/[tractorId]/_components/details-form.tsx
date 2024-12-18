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
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "../../../../lib/utils";

import { Detail, Tractor } from "@prisma/client";
import { Input } from "../../../../components/ui/input";
import { DetailsList } from "./details-list";


interface DetailsFormProps{
    initialData: Tractor & {details: Detail[]};

    tractorId: string;
};


const formSchema = z.object({
    title:z.string().min(1),
});

export const DetailsForm = ({
    initialData,
    tractorId
}: DetailsFormProps) => {

    const [isCreating, setIsCreating] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
          setIsCreating((current) => !current);
    }
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           title:"",
        }
    });

    const { isSubmiting, isValid } = form.formState as FormState<{ title: string }> & { isSubmiting: boolean };

    const onsubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.post(`/api/tractor/${tractorId}/details`, values)
            toast.success("Detail Created")
            toggleCreating();
            router.refresh();
        } catch {
            toast.error("Something went wrong")
       }
    }


    const onReorder = async (updateData: { id: string; position: number }[]) => {
        
        try {
            setIsUpdating(true);

            await axios.put(`/api/tractor/${tractorId}/details/reorder`, {
                list: updateData
            });
            toast.success("Details reordered");
            router.refresh();
        } catch {
            toast.error("Something went wrong")
        } finally {
            setIsUpdating(false);
        }
        
    }

    const onEdit = (id:string) => {
        router.push(`/seller/tractors/${tractorId}/details/${id}`);
    }

    return (
        <div className="relative mt-6 bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2
                    className="animate-spin h-6 w-6 text-sky-700"
                    />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Tractor Details 
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating ? (
                        <>Cancel</>
                    ):(
                      <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a detail
                        </>
                    )}
                </Button>
            </div>

            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmiting}
                                            placeholder="e.g. 'Performance Details'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage
                                    
                                    />
                                </FormItem>
                            )}
                        />
                            <Button
                                disabled={!isValid || isSubmiting}
                                type="submit"
                            >
                                Create
                            </Button>
                    </form>
                </Form>
            )}

            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.details.length && "text-slate-500 italic"
                )}>
                    {!initialData.details.length && "No details"}
                    <DetailsList
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items = {initialData.details || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4 ">
                    Drag and drop to reorder the details
                </p>
            )}
        </div>
    )
}