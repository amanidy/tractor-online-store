import { Menu } from "lucide-react";

import { Sheet, SheetTrigger, SheetContent } from "../../../../../components/ui/sheet";
import { TractorSidebar } from "./tractor-sidebar";

import { Detail, Tractor, UserProgress } from "@prisma/client"

interface TractorMobileSidebarProps{
    tractor: Tractor & {
        details: (Detail & {
            UserProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;

}

export const TractorMobileSidebar = ({
    tractor,
    progressCount,

}: TractorMobileSidebarProps) => {
    return (
        
    
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition ">
            <Menu
            className="h-4 w-4"
            />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
            <TractorSidebar
                tractor={tractor}
                progressCount={progressCount}
            />

        </SheetContent>
        </Sheet>
    )
}