"use client";
import * as z from "zod";
import axios from "axios";
import { Button } from "../../../../../../components/ui/button";
import {  Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Detail, MuxData } from "@prisma/client";

import MuxPLayer from "@mux/mux-player-react";

import { FileUpload } from "../../../../../../components/file-upload";

interface DetailVideoFormProps {
    initialData: Detail & {muxData?:MuxData | null};
    tractorId: string;
    detailId: string;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const DetailVideoForm = ({
    initialData,
    tractorId,
    detailId,
}: DetailVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/tractor/${tractorId}/details/${detailId}`, values);
            toast.success("Detail updated ");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.error("Video upload error:", error);
            toast.error("Failed to update video");
        }
    }

    return (
        <div className="mt-6 bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Detail video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        !initialData.videoUrl ? (
                            <>
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add a video
                            </>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit video
                            </>
                        )
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                            <MuxPLayer
                                playbackId={initialData?.muxData?.playbackId || ""}
                        
                            />
                    </div>
                )
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="demoVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url });
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this detail`s video if available
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2 ">
                    Videos can take a few minutes to process.Refresh the page if the videp
                    does not appear.
                </div>
            )}
        </div>
    )
}
