import Image from "next/image";

const Logo = () => {
    return (
        <div>
            <Image
                height={130}
                width={130}
                src="/logo.svg"
            alt="logo"
            />

        </div>
      );
}
 
export default Logo;