"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "../../../../components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Tractor } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "../../../../components/file-upload";

interface ImageFormProps {
    initialData: Tractor;
    tractorId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    }),
});

export const ImageForm = ({
    initialData,
    tractorId
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/tractor/${tractorId}`, values);
            toast.success("Image updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to update image");
        }
    }

    return (
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Tractor image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        !initialData.imageUrl ? (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add an image
                            </>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit image
                            </>
                        )
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Tractor"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="tractorImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}
