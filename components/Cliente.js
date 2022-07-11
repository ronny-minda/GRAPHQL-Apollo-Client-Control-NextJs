import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";

const ELIMINAR_CLIENTE = gql`
  mutation Mutation($eliminarClienteId: ID!) {
    eliminarCliente(id: $eliminarClienteId)
  }
`;

const OBTENER_CLIENTES_USUARIO = gql`
  query Query {
    obtenerClientesVendedor {
      id
      nombre
      empresa
      apellido
      email
      telefono
      vendedor
    }
  }
`;

const Cliente = ({ cliente }) => {
  const { id } = cliente;

  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
      });

      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(
            (cliente) => cliente.id !== id
          ),
        },
      });
    },
  });

  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar a este cliente?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          const { data } = await eliminarCliente({
            variables: {
              eliminarClienteId: id,
            },
          });
          console.log(data);
          if (result.isConfirmed) {
            Swal.fire("Eliminar!", data.eliminarCliente, "success");
          }
        } catch (error) {
          console.log(error);
          console.log("no se pudo eliminar el cliente");
        }
      }
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">
        {cliente.nombre} {cliente.apellido}
      </td>
      <td className="border px-4 py-2">{cliente.empresa}</td>
      <td className="border px-4 py-2">{cliente.email}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente(cliente.id)}
        >
          Eliminar
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
