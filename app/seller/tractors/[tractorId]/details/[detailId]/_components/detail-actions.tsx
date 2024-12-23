"use client"

import { Trash } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { ConfirmModel } from "../../../../../../components/models/confirm-model";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DetailActionsProps {
  disabled: boolean;
  tractorId: string;
  detailId: string;
  isPublished: boolean;
}

export const DetailActions = ({
  disabled,
  tractorId,
  detailId,
  isPublished,
}: DetailActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const endpoint = isPublished ? "unpublish" : "publish";
      
      await axios.patch(`/api/tractor/${tractorId}/details/${detailId}/${endpoint}`);
      toast.success(`Detail ${isPublished ? "unpublished" : "published"}`);
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
      await axios.delete(`/api/tractor/${tractorId}/details/${detailId}`);
      toast.success("Detail deleted");
      router.refresh();
      router.push(`/seller/tractor/${tractorId}`);
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
        {isPublished ? "Unpublish" : "Publish"}
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