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
} from "../../../../../../components/ui/form";
 

import { Button } from "../../../../../../components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "../../../../../../lib/utils";
import { Detail} from "@prisma/client";
import { DraftEditor } from "../../../../../../components/editor";
import { DraftPreview } from "../../../../../../components/preview";


interface DetailDescriptionFormProps{
    initialData: Detail;

    tractorId: string;
    detailId: string;
};


const formSchema = z.object({
    description: z.string().min(1),
});

export const DetailDescriptionForm = ({
    initialData,
    tractorId,
    detailId,
}: DetailDescriptionFormProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           description: initialData?.description || ""
        }
    });

    const { isSubmiting, isValid } = form.formState as FormState<{ title: string }> & { isSubmiting: boolean };

    const onsubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.patch(`/api/tractor/${tractorId}/details/${detailId}`, values)
            toast.success("Detail description updated successfully")
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong")
       }
    }


    return (
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Detail description 
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit description 
                        </>
                    ) }
                </Button>
            </div>
            {!isEditing && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {!initialData.description && "No description"}
                    {initialData.description && (
                        <DraftPreview 
                        value={initialData.description}
                        />
                    )}
                </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <DraftEditor
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