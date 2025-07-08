import { Link } from "react-router";
import {PlusIcon} from "lucide-react";

export const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <img src="../LookUp.svg" alt="LOGO" className="h-8"/>
                    <h1 className="text-4xl font-extrabold  text-primary ftracking-tight">
                    LookUp
                    </h1>
                </div>
                
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="size-5"/>
                        <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
};
