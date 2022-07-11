import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query Query {
    obtenerUsuario {
      id
      nombre
      apellido
      email
      creado
    }
  }
`;

const Header = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return <p>CARGADO........</p>;

  if (!data) return router.push("/login");

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <p className="mr2">
          Hola: {nombre} {apellido}
        </p>
        <button
          className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
          type="button"
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesion
        </button>
      </div>
    </>
  );
};

export default Header;
