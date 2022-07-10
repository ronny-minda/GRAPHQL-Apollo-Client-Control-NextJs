import React, { useState } from "react";
import Layout from "../components/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation Mutation($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const [mesaje, setMensaje] = useState(null);

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { email, password } = valores;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        localStorage.setItem("token", data.autenticarUsuario.token);

        setMensaje(`Autenticando....`);

        setTimeout(() => {
          setMensaje(null);
          router.push("/");
        }, 2000);
      } catch (error) {
        console.log(error);
        console.log("no se pudo autenticar");
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
      <h1 className="text-center text-white font-light">login</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pb-6 pt-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
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
              value="INICIAR SESION"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
