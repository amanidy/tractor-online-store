"use client"

import { Trash } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { ConfirmModel } from "../../../../components/models/confirm-model";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../hooks/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  tractorId: string;
  isApproved: boolean;
}

export const Actions = ({
  disabled,
  tractorId,
  isApproved,
}: ActionsProps) => {

  const confetti = useConfettiStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const endpoint = isApproved ? "unapprove" : "approve";
      
      await axios.patch(`/api/tractor/${tractorId}/${endpoint}`);
      toast.success(`Tractor ${isApproved ? "unapproved" : "approved"}`);
      confetti.onOpen();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Please complete all required fields before publishing");
        } else if (error.response?.status === 401) {
          toast.error("Unauthorized action");
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/tractor/${tractorId}`);
      toast.success("Tractor deleted");
      router.refresh();
      router.push(`/seller/tractor`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Unauthorized action");
        } else {
          toast.error("Something went wrong");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isApproved ? "Unapprove" : "Approve"}
      </Button>

      <ConfirmModel onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </ConfirmModel>
    </div>
  )
}