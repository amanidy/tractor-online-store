"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";


import { Loader2, Lock} from "lucide-react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "~/hooks/use-confetti-store";
import toast from "react-hot-toast";

interface VideoPlayerProps{
    playbackId: string ;
    tractorId: string;
    detailId: string;
    title: string;
    nextDetailId?: string;
    completeOnEnd: boolean;
};

export const VideoPlayer = ({
    playbackId,
    tractorId,
    detailId,
    title,
    nextDetailId,
    completeOnEnd,

}: VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    const confetti = useConfettiStore();

    const onEnd = async() => {
        try {

            if (completeOnEnd) {
                await axios.put(`/api/tractor/${tractorId}/details/${detailId}/progress`, {
                    isCompleted:true,
                }); 

                if (!nextDetailId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if (nextDetailId) {
                    router.push(`/tractor/${tractorId}/details/${nextDetailId}`)
                }
            }
            
        } catch {
            toast.error("Something went wrong");
        } 
    }

    
    return (
        <div className="relative-aspect-video">
            {!isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
             <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
            )}
            
            {!completeOnEnd && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-secondary gap-y-2">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        Finish viewing the previous detail
                    </p>
                </div>
            )}
 
            <MuxPlayer 
                title={title}
                className={cn(
                    !isReady && "hidden"
                )}
                onCanPlay={() => setIsReady(true)}
                onEnded={onEnd}
                autoPlay
                playbackId={playbackId}
            />

        </div>
    )
    
}
