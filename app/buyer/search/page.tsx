
export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { getTractors } from "../../../actions/get-tractors";
import { db } from "../../lib/db";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { TractorList } from "../../components/tractors-list";

interface SearchPageProps {
    searchParams: Promise<{
        title?: string;
        categoryId?: string;
    }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    try {
        const { title = "", categoryId = "" } = await searchParams;

        const categories = await db.category.findMany({
            orderBy: { name: "asc" }
        });

        const tractors = await getTractors({ userId, title, categoryId });

        return (
            <div className="p-6 space-y-4">
                <Categories items={categories} />
                <TractorList items={tractors} />
            </div>
        );
    } catch (error) {
        if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
        console.error("Error in search page:", error);
        return (
            <div className="p-6 text-red-500">
                <p>Error: {String(error)}</p>
            </div>
        );
    }
}

export default SearchPage;