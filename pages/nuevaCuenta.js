import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation Mutation($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      email
      apellido
      creado
    }
  }
`;

const NuevaCuenta = () => {
  const [mesaje, setMensaje] = useState(null);

  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obigarorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacio")
        .min(6, "El password debe ser al menos 5 caracteres"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);

      const { nombre, apellido, email, password } = valores;

      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
              nombre,
              apellido,
              email,
              password,
            },
          },
        });

        setMensaje(
          `Se creo crectamente el Usuario: ${data.nuevoUsuario.nombre}`
        );

        setTimeout(() => {
          setMensaje(null);
          router.push("/login");
        }, 3000);
      } catch (error) {
        setMensaje(error.message.replace("GraphQL error:", ""));

        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mesaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      {mesaje && mostrarMensaje()}
      <h1 className="text-center text-white font-light">Crear Nueva Cuenta</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pb-6 pt-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="nombre"
                type="nombre"
                placeholder="Nombre Usuario"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
              />
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
              <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">error</p>
                <p>{formik.errors.nombre}</p>
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
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="apellido"
                type="apellido"
                placeholder="apellido Usuario"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
              />
            </div>

            {formik.touched.apellido && formik.errors.apellido ? (
              <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">error</p>
                <p>{formik.errors.apellido}</p>
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
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                type="email"
                placeholder="Email Usuario"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-slate-500"
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-rose-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="CREAR CUENTA"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
