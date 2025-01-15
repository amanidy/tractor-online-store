"use client";

import { Button } from "@/app/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
//import { useConfettiStore } from "~/hooks/use-confetti-store";

interface TractorProgressButtonProps{
    tractorId: string;
    detailId: string;
    nextDetailId?: string ;
    isCompleted?: boolean;
};



export const TractorProgressButton = ({
    tractorId,
    detailId,
    nextDetailId,
    isCompleted,

}: TractorProgressButtonProps) => {

    const router = useRouter();
    const confetti = useConfettiStore();

    const [isLoading, setIsLoading] = useState(false);
    
    const Icon = isCompleted ? XCircle : CheckCircle;

    const onClick = async() => {
        try {

            setIsLoading(true);

            await axios.put(`/api/tractor/${tractorId}/details/${detailId}/progress`, {
                isCompleted: !isCompleted
            });

            if (!isCompleted && !nextDetailId) {
                confetti.onOpen();
            }

            if (!isCompleted && nextDetailId) {
                router.push(`/tractor/tractors/${tractorId}/details/${nextDetailId}`);
            }
            
            toast.success("Progress updated");
            router.refresh();
        } catch  {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "Not Completed" : "Mark as complete"}
            <Icon className="h-4 w-4 ml-2" />
       </Button>
    )
}