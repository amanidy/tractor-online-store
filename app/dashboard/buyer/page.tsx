import { TractorList } from "@/components/tractors-list";
import { auth } from "@clerk/nextjs/server"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import { getDashboardTractors } from "~/actions/get-dashboard-tractors";
import { InfoCard } from "./_components/info-card";


export async function BuyerDashboard() {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }


    const {
        completedViewedTractors,
        tractorsInViewProgress,
     } = await getDashboardTractors(userId);

    return (
        <div className="p-6 space-y-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                <InfoCard
                    icon={Clock}
                    label="In Viewing Progress"
                    numberOfItems={tractorsInViewProgress.length}       
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed Viewed"
                    numberOfItems={completedViewedTractors.length} 
                    variant="success"
                />
            </div>
            <TractorList
            items={[...tractorsInViewProgress,...completedViewedTractors]}
            />
            
        </div>
    )
}