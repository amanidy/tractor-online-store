import { db } from "@/app/lib/db";
import { Tractor, Purchase } from "@prisma/client";


type PurchaseWithTractor = Purchase & {
    tractor: Tractor;
}

const groupByTractor = (purchases: PurchaseWithTractor[]) => {
    const grouped: { [tractorTitle: string]: number } = {};

    purchases.forEach((purchase) => {
        const tractorTitle = purchase.tractor.title;
        if (!grouped[tractorTitle]) {
            grouped[tractorTitle] = 0;
        }
        grouped[tractorTitle] += purchase.tractor.price!
    });

    return grouped;
}

export const getAnalytics = async (userId: string) => {
    
    try {

        const purchases = await db.purchase.findMany({
            where: {
                tractor: {
                    sellerId: userId,
                }
            },
            include: {
                tractor: true,
            }
        });

        const groupedEarnings = groupByTractor(purchases);

        const data = Object.entries(groupedEarnings).map(([tractorTitle, total]) => ({
            name: tractorTitle,
            total: total,
        }));

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);

        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales,
        }
        
    } catch (error) {
        
        console.log("[GET_ANALYTICS]", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        }

    }

}