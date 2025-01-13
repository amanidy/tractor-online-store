import { auth } from "@clerk/nextjs/server";
import { getTractors } from "../../../actions/get-tractors";
import { db } from "../../lib/db";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { TractorList } from "../../components/tractors-list";





const SearchPage = async ({
    searchParams
}:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
): Promise<JSX.Element> => {

    const { userId } = await auth();

    const title = searchParams;
    const categoryId = searchParams;

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
        title: title,
        categoryId:categoryId,
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