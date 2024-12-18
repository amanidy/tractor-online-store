"use client";

import { Detail } from "@prisma/client";
import { useEffect, useState } from "react";

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult

} from "@hello-pangea/dnd";

import { cn } from "../../../../lib/utils";
import {  Grip, Pencil } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";


interface DetailsListProps{
    items: Detail[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
};

export const DetailsList = ({
    items,
    onReorder,
    onEdit,

}:DetailsListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [details, setDetails] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    useEffect(() => {
        setDetails(items);
        
    },[items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(details);
        const [reordereditem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reordereditem);


        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedDetails = items.slice(startIndex, endIndex + 1);

        setDetails(items);


        const bulkUpdateData = updatedDetails.map((detail) => ({
            id: detail.id,
            position: items.findIndex((item) => item.id === detail.id)
        }));

        onReorder(bulkUpdateData);

    
}


    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="details">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}> 
                        {details.map((detail, index) => (
                            <Draggable
                                key={detail.id}
                                draggableId={detail.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            detail.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className={cn(
                                            "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                            detail.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                        )}
                                        {...provided.dragHandleProps}
                                        > 
                                            <Grip 
                                            className="h-5 w-5"
                                            />
                                        </div>
                                        {detail.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {detail.isStandard && (
                                                <Badge>
                                                    Standard
                                                </Badge>
                                            )}
                                            <Badge
                                                className={cn(
                                                    "bg-slate-500",
                                                    detail.isPublished && "bg-sky-700"
                                            )}
                                            >
                                                {detail.isPublished ? "Publised":"Draft"}
                                            </Badge>
                                            <Pencil
                                                onClick={() => onEdit(detail.id)}
                                                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />

                                        </div>

                                    </div>
                                )}

                            </Draggable>
                        ))}
                        {provided.placeholder}
                        
                    </div>
                )}

            </Droppable>

        </DragDropContext>
    )
}