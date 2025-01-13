
import { auth } from "@clerk/nextjs/server";
import { columns } from "../tractors/_components/columns";
import { DataTable } from "../tractors/_components/data-table";
import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { SearchInput } from "../../components/search-input";





const TractorsPage = async() => {
    
    const { userId } = await auth();

    if (!userId) {
        return redirect("/seller");
    }

    const tractors = await db.tractor.findMany({
        where: {
            sellerId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
    });
    


    return ( 
        <>
            <div className="px-6 pt-6 md:hidden md: mb-0 block ">
              <SearchInput />
            </div>
        <div className="p-6">
             <DataTable columns={columns} data={tractors} />
            </div>
            </>
     );
}
 
export default TractorsPage;