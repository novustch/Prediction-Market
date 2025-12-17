import { ReactNode, useState } from "react";
import HeaderTop from "./header/HeaderTop";
import HeaderSideBar from "./header/HeaderSideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="flex md:flex-row flex-col relative max-w-[1920px] w-screen h-screen">
        <HeaderSideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <main className={`h-full w-full flex flex-col gap-6 pb-4 ${isCollapsed ? 'md:ml-[104px]' : 'md:ml-[280px]'}`}>
          <HeaderTop />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
