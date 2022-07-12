import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const OBTENER_CLIENTE = gql`
  query Query($obtenerClienteId: ID!) {
    obtenerCliente(id: $obtenerClienteId) {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

const ACTUALIZAR_CLIENTE = gql`
  mutation Mutation($actualizarClienteId: ID!, $input: ClienteInput) {
    actualizarCliente(id: $actualizarClienteId, input: $input) {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

const EditarCliente = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;
  console.log(id);

  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      obtenerClienteId: id,
    },
  });

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  const shemaValidacion = Yup.object({
    nombre: Yup.string().required("El nombre del cliente es obligatorio"),
    apellido: Yup.string().required("El apellido del cliente es obligatorio"),
    empresa: Yup.string().required("El empresa del cliente es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email del cliente es obligatorio"),
  });

  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if (loading) return "CARGANDO.....";

  const { obtenerCliente } = data;

  const actualizarInfoCliente = async (valores) => {
    const { nombre, apellido, empresa, email, telefono } = valores;

    try {
      const { data } = await actualizarCliente({
        variables: {
          actualizarClienteId: id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      console.log(data);

      Swal.fire(
        "Actualizando!",
        "El cliente se actualiza correctamente",
        "success"
      );

      router.push("/");
    } catch (error) {
      console.log(error);
      console.log("no se pudo actualizar el cliente");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="flex justify-center mt-5">
          <Formik
            validationSchema={shemaValidacion}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(valores) => {
              actualizarInfoCliente(valores);
            }}
          >
            {(props) => {
              console.log(props);
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                      id="nombre"
                      type="nombre"
                      placeholder="Nombre Cliente"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
                    />
                  </div>

                  {props.touched.nombre && props.errors.nombre ? (
                    <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">error</p>
                      <p>{props.errors.nombre}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="apellido"
                    >
                      Apellido
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.apellido}
                      id="apellido"
                      type="apellido"
                      placeholder="Apellido Cliente"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
                    />
                  </div>

                  {props.touched.apellido && props.errors.apellido ? (
                    <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">error</p>
                      <p>{props.errors.apellido}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      Empresa
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.empresa}
                      id="empresa"
                      type="empresa"
                      placeholder="Empresa Cliente"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
                    />
                  </div>

                  {props.touched.empresa && props.errors.empresa ? (
                    <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">error</p>
                      <p>{props.errors.empresa}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                      id="email"
                      type="email"
                      placeholder="Email Usuario"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
                    />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">error</p>
                      <p>{props.errors.email}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="telefono"
                    >
                      Telefono
                    </label>
                    <input
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.telefono}
                      id="telefono"
                      type="tel"
                      placeholder="Telefono cliente"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
                    />
                  </div>

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Registrar Cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
