import Image from "next/image";
import SidebarLinks from "./sidebar-links";

export default function SidebarMenu() {
  return (
    <>
      <div className="h-6" />
      <Image
        src="/logo.png"
        alt="logo"
        width={188}
        height={40}
        className="m-auto h-10 w-48"
      />
      <div className="h-16" />
      <div className="flex flex-col items-center justify-center">
        <SidebarLinks />
      </div>
    </>
  );
}
