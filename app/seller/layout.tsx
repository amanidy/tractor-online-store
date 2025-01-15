import { isSeller } from "@/app/lib/seller";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SellerLayout =  async ({
    children
}: {
        children: React.ReactNode;
    }) => {
    
    const { userId } = await auth();

    if (!isSeller(userId)) {
        return redirect("/");
        
    }
    return ( 
        <div>
            {children}
    </div>
     );
}
 
export default SellerLayout;