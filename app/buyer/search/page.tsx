import { auth } from "@clerk/nextjs/server";
import { getTractors } from "../../../actions/get-tractors";
import { db } from "../../lib/db";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { TractorList } from "../../components/tractors-list";

interface SearchPageProps{
    searchParams: {
        title: string;
        categoryId: string;
    }
}



const SearchPage = async ({
    searchParams

}:SearchPageProps) => {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    const tractors = await getTractors({
        userId,
        ...searchParams,
    });

    return ( 
        <div className="p-6 space-y-4"> 
            <Categories
            items={categories}
            
            />

            <TractorList
            items={tractors}
            />
            

        </div>
     );
}
 
export default SearchPage;