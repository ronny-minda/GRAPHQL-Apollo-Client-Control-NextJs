import Head from "next/head";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import Header from "./Header";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM - Administracion de Clientes</title>
      </Head>

      {router.pathname === "/login" || router.pathname === "/nuevaCuenta" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center ">
          <div>{children}</div>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Navbar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
