import { Category, Tractor } from "@prisma/client";
import {TractorCard} from "./tractor-card";


type TractorWithProgressWithCategory = Tractor & {
    category: Category | null;
    details: {
        id: string;
    }[];
    progress: number | null;
};

interface TractorListProps{
    items: TractorWithProgressWithCategory[];
}

export const TractorList = ({
items,
}: TractorListProps) => {
    return (
        <div>   
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {items.map((item) => (
                <TractorCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    imageUrl={item.imageUrl!}
                    detailsLength={item.details.length}
                    price={item.price!}
                    progress={item.progress}
                    category ={item?.category?.name}
                />
            ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No tractors found
                </div>
            )}
            </div>
    )
}