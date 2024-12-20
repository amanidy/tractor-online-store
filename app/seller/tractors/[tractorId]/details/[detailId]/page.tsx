import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/db";
import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "../../../../../components/icon-badge";
import { DetailTitleForm } from "./_components/detail-title-form";
import { DetailDescriptionForm } from "./_components/detail-description-form ";
import { DetailVideoForm } from "./_components/detail-video-form";



interface DetailPageProps{
     params: { tractorId: string;  detailId:string}
}

const DetailIdPage = async ({ params }: DetailPageProps) => {
    
    
    const { userId } = await auth();

    if (!userId) {
        return redirect("/seller");
    }

    const detail = await db.detail.findUnique({
        where: {
            id: params.detailId,
            tractorId: params.tractorId,
        },
        include: {
            muxData: true,
        },
    });

    if (!detail) {
        return redirect("/seller");
    }

    const requiredFields = [
        detail.title,
        detail.description,
        detail.videoUrl,
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;



    
    return ( 
        <div className="p-6 bg-white">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/seller/tractors/${params.tractorId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft
                         className="h-4 w-4  mr-2"
                        />
                        Back to tractor set up
                    </Link>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-medium">
                                Detail Creation
                            </h1>
                            <span className="text-sm text-slate-700">
                                Complete all fields{completionText}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>

                    
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ LayoutDashboard} />
                            <h2 className="text-xl">
                                Customize your detail 

                            </h2>
                        </div>
                        <DetailTitleForm
                            initialData={detail}
                            tractorId={params.tractorId}
                            detailId={params.detailId}
                        
                        />
                        <DetailDescriptionForm
                            initialData={detail}
                            tractorId={params.tractorId}
                            detailId={params.detailId}
                        
                        />
                    </div>
                    

                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={Video} />
                        <h2 className="text-xl">
                            Add a video 
                        </h2>
                    </div>
                    <DetailVideoForm
                           initialData={detail}
                            tractorId={params.tractorId}
                            detailId={params.detailId}
                    
                    />
                </div>

            </div>

        </div>
     );
}
 
export default DetailIdPage;