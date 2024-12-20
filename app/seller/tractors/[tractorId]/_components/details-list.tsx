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
import { Grip, Pencil } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";

interface DetailsListProps {
    items: Detail[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}

export const DetailsList = ({
    items,
    onReorder,
    onEdit,
}: DetailsListProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        
        if (!result.destination) return;

        
        const reorderedItems = Array.from(items);
        
        
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        
        
        reorderedItems.splice(result.destination.index, 0, reorderedItem);

        
        const bulkUpdateData = reorderedItems.map((detail, index) => ({
            id: detail.id,
            position: index
        }));

        
        onReorder(bulkUpdateData);
    };

    
    if (!isMounted) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="details">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}> 
                        {items.map((detail, index) => (
                            <Draggable
                                key={detail.id}
                                draggableId={detail.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        className={cn(
                                            "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                                            detail.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                                        )}
                                    >
                                        <div 
                                            {...provided.dragHandleProps}
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                detail.isPublished && "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                        > 
                                            <Grip className="h-5 w-5" />
                                        </div>
                                        <span className="flex-grow">
                                            {detail.title}
                                        </span>
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
                                                {detail.isPublished ? "Published" : "Draft"}
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
    );
};