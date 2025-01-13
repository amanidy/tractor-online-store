"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


interface TractorPurchaseButtonProps{
    tractorId: string;
    price: number ;
};

export const TractorPurchaseButton = ({
    tractorId,
    price,

}: TractorPurchaseButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            
            const response = await axios.post(`/api/tractor/${tractorId}/checkout`);

            window.location.assign(response.data.url);

        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
        
            size="sm" className="w-full md:w-auto ">
            Purchase for {formatPrice(price)}
        </Button>
    )
}