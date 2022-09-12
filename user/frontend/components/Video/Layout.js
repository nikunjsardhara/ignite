import Link from "next/link";
import React from "react";

function Layout() {
  return (
    <div className="z-[0]">
      <div className="navbar bg-slate-900 px-10  z-0">
        <div className="navbar-start flex flex-row">
          <div className="grid card place-items-center">
            <Link href="/">
              <p className="btn btn-ghost text-white normal-case text-2xl">
                Ignite
              </p>
            </Link>
          </div>
          <div className="border border-slate-500 h-5 rounded"></div>
          <div className="grid card text-white place-items-center ml-5 font-light">
            Android Java Masterclass - Become an App Developer
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
