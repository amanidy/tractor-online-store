import { auth } from "@clerk/nextjs/server";
import { db } from "../../../lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "../../../components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form ";
import { ImageForm } from "./_components/image-form ";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form ";
import { AttachmentForm } from "./_components/attachment-form";
import { DetailsForm } from "./_components/details-form";



interface TractorPageProps {
  params: {
    tractorId: string;
  };
}

const TractorIdPage = async ({ params }: TractorPageProps) => {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/seller");
    }

    const tractor = await db.tractor.findUnique({
        where: {
            id:  params.tractorId,
            sellerId:userId,
        },
        include: {
            details: {
                orderBy: {
                   position:"asc",
               }, 
            },
            attachments: {
                orderBy: {
                    createdAt:"desc",
                }
            }
        }
    });


    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    console.log(categories);

    if (!tractor) {
        return redirect("/seller");
    }

    const requiredFields = [
        tractor.title,
        tractor.description,
        tractor.imageUrl,
        tractor.price,
        tractor.categoryId,
        tractor.details.some(detail => detail.isVerified),
    ];


    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`

    return ( 
        <div className="p-6 bg-white">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Tractor Setup</h1>
                    <span className="text-sm text-slate-700">
                        Complete all fields {completionText}
                    </span>

                </div>
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard } />
                        <h2 className="text-xl">
                            Customize your tractor
                        </h2>

                    </div>
                    <TitleForm
                        initialData={tractor}
                        tractorId ={tractor.id}
                    />
                    <DescriptionForm
                        initialData={tractor}
                        tractorId ={tractor.id}
                    />
                     <ImageForm
                        initialData={tractor}
                        tractorId ={tractor.id}
                    />
                    <CategoryForm
                        initialData={tractor}
                        tractorId={tractor.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value:category.id,
                        }))}
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Tractor Details
                            </h2>
                        </div>
                        <DetailsForm
                        initialData={tractor}
                        tractorId ={tractor.id}
                    />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-xl">
                                Sell your tractor
                            </h2>

                        </div>
                        <PriceForm
                            initialData={tractor}
                            tractorId={tractor.id}
                        
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-xl">
                                Resources and attachments
                            </h2>
                        </div>
                        <AttachmentForm
                        initialData={tractor}
                        tractorId ={tractor.id}
                    />
                    </div>

                </div>

            </div>
        </div>
     );
}
 
export default TractorIdPage;