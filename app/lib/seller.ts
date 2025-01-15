export const isSeller = (userId?:string | null) => {
    return userId === process.env.NEXT_PUBLIC_SELLERID;
}