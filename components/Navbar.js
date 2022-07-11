import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
        <li className={router.pathname === "/" ? "bg-blue-900 p2" : "p-2"}>
          <Link href="/">
            <a className="text-white">Clientes</a>
          </Link>
        </li>
        <li
          className={router.pathname === "/pedidos" ? "bg-blue-800 p2" : "p-2"}
        >
          <Link href="/pedidos">
            <a className="text-white">Pedidos</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/productos" ? "bg-blue-800 p2" : "p-2"
          }
        >
          <Link href="/productos">
            <a className="text-white">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Navbar;
