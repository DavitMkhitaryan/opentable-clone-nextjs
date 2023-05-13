"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        <div className="flex items-center">
          {loading ? <div className="absolute w-[100%] h-[5%] bg-white"></div> : null}
          {data ? (
            <>
            <p className="mr-4 border border-gray-200 p-1 px-4">{data.firstName} {data.lastName}</p>
            <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3" onClick={signout}>
              Sign out
            </button>
            </>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
