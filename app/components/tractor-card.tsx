import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "../lib/format";
import { TractorProgress } from "./tractor-progress";


interface TractorCardProps{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string | undefined;
    progress: number | null;
    detailsLength: number;

}


export const TractorCard = (
    {
        id,
        title,
        price,
        imageUrl,
        category,
        progress,
        detailsLength,

    }:TractorCardProps
) => {
    return (
        <Link href={`/tractor/tractors/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="bject-cover"
                        alt={title}
                        src={imageUrl}
                    />
                </div> 
                <div className="flex flex-col pt-2 ">
                    
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs ">
                        <div className="flex items-center gap-x-1 text-slate-500 ">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {detailsLength} {detailsLength === 1 ? "Detail" : "Details"}
                            </span>

                        </div>
                    </div>

                    {progress !== null ? (
                        <TractorProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                            <p className="text-md md:text-sm font-medium text-slate-700 ">
                                {formatPrice(price)}
                            </p>
                    )}

                </div>
        </div>
        </Link>
    )
}