"use client";
import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import "tailwindcss/tailwind.css";
import Header from "../../components/header";
import { obtenerUsuario } from "../../api/Usuarios/obtenerUsuario";
// import { obtenerCarrito } from "../../api/Carrito/obtenerCarrito";
// import { registrarVenta } from "../../api/Ventas/registrarVenta";
import Swal from "sweetalert2";


const AltaVenta = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [carritos, setCarritos] = useState([]);
  const [carritoSeleccionado, setCarritoSeleccionado] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaCompra, setFechaCompra] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await obtenerUsuario();
      if (response.data) {
        setUsuarios(response.data);
      } else {
        Swal.fire({
          title: "Error al obtener los usuarios",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    const fetchCarritos = async () => {
      const response = await obtenerCarritos();
      if (response.data) {
        setCarritos(response.data);
      } else {
        Swal.fire({
          title: "Error al obtener los carritos",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };

    fetchUsuarios();
    fetchCarritos();
  }, []);

  const handleCarritoSeleccionado = async (e) => {
    const carritoId = e.target.value;
    setCarritoSeleccionado(carritoId);

    const response = await obtenerCarrito(carritoId);
    if (response.data) {
      setCarrito(response.data.items);
      const totalCalculado = response.data.items.reduce(
        (acc, item) => acc + item.precioFinal,
        0
      );
      setTotal(totalCalculado);
    } else {
      Swal.fire({
        title: "Error al obtener el carrito",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      setCarrito([]);
      setTotal(0);
    }
  };

  const handleUsuarioSeleccionado = (e) => {
    const usuarioId = e.target.value;
    setUsuarioSeleccionado(usuarioId);

    const usuario = usuarios.find((u) => u.id === usuarioId);
    if (usuario) {
      setTipoUsuario(usuario.tipo); // "REGULAR" o "PREMIUM"
    } else {
      setTipoUsuario("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado) {
      Swal.fire({
        title: "Por favor, seleccione un usuario",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!carritoSeleccionado) {
      Swal.fire({
        title: "Por favor, seleccione un carrito",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (!fechaCompra) {
      Swal.fire({
        title: "Por favor, seleccione una fecha de compra",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const descuento = tipoUsuario === "PREMIUM" ? 0.2 : 0;
    const totalConDescuento = total * (1 - descuento);

    const response = await registrarVenta({
      usuarioId: usuarioSeleccionado,
      carritoId: carritoSeleccionado,
      tipoUsuario,
      carrito,
      total: totalConDescuento,
      fechaCompra,
    });

    if (response.status === 200) {
      Swal.fire({
        title: "Venta registrada con éxito",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setUsuarioSeleccionado("");
      setCarritoSeleccionado("");
      setTipoUsuario("");
      setCarrito([]);
      setTotal(0);
      setFechaCompra("");
    } else {
      Swal.fire({
        title: "Error al registrar la venta",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Alta Venta
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <select
                value={usuarioSeleccionado}
                onChange={handleUsuarioSeleccionado}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              >
                <option value="">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} ({usuario.tipo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Carrito
              </label>
              <select
                value={carritoSeleccionado}
                onChange={handleCarritoSeleccionado}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              >
                <option value="">Seleccione un carrito</option>
                {carritos.map((carrito) => (
                  <option key={carrito.id} value={carrito.id}>
                    Carrito #{carrito.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Compra
              </label>
              <input
                type="date"
                value={fechaCompra}
                onChange={(e) => setFechaCompra(e.target.value)}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-800 mt-4">
                Detalle de Carrito
              </h2>
              <ul>
                {carrito.map((item, index) => (
                  <li key={index} className="mt-2">
                    {item.idVideoJuego} - Cantidad: {item.cantidad} - Precio Unitario: ${
                      item.precioIndividual
                    } - Subtotal: ${item.precioFinal}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total: ${total}</p>
              {tipoUsuario === "PREMIUM" && (
                <p className="text-green-600 font-bold">Descuento aplicado: 20%</p>
              )}
              <p className="mt-2 font-bold">Total con descuento: ${
                tipoUsuario === "PREMIUM" ? total * 0.8 : total
              }</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none"
            >
              Guardar Venta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AltaVenta;

// "use client";
// import React, { useState, useEffect } from "react";
// import "../../app/globals.css";
// import "tailwindcss/tailwind.css";
// import Header from "../../components/header";
// import { obtenerVideojuegos } from "../../api/VideoJuegos/obtenerVideoJuegos";
// import { obtenerUsuario } from "../../api/Usuarios/obtenerUsuario";
// // import { registrarVenta } from "../../api/Ventas/registrarVenta";
// import Swal from "sweetalert2";

// const AltaVenta = () => {
//   const [usuarios, setUsuarios] = useState([]);
//   const [videojuegos, setVideojuegos] = useState([]);
//   const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
//   const [tipoUsuario, setTipoUsuario] = useState("");
//   const [videojuegoSeleccionado, setVideojuegoSeleccionado] = useState("");
//   const [cantidad, setCantidad] = useState(1);
//   const [carrito, setCarrito] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [fechaCompra, setFechaCompra] = useState("");

//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       const response = await obtenerUsuarios();
//       if (response.data) {
//         setUsuarios(response.data);
//       } else {
//         Swal.fire({
//           title: "Error al obtener los usuarios",
//           icon: "error",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     };

//     const fetchVideojuegos = async () => {
//       const response = await obtenerVideojuegos();
//       if (response.data) {
//         setVideojuegos(response.data);
//       } else {
//         Swal.fire({
//           title: "Error al obtener los videojuegos",
//           icon: "error",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     };

//     fetchUsuarios();
//     fetchVideojuegos();
//   }, []);

//   const agregarProducto = () => {
//     const videojuego = videojuegos.find((v) => v.id === videojuegoSeleccionado);
//     if (!videojuego || cantidad <= 0 || cantidad > videojuego.stock) {
//       Swal.fire({
//         title: "Stock insuficiente o cantidad no válida",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     const preCompra = {
//       id: videojuego.id,
//       nombre: videojuego.nombre,
//       cantidad,
//       precio: videojuego.precio,
//       subtotal: videojuego.precio * cantidad,
//     };

//     setCarrito([...carrito, preCompra]);
//     setTotal(total + preCompra.subtotal);
//     setVideojuegoSeleccionado("");
//     setCantidad(1);
//   };

//   const handleUsuarioSeleccionado = (e) => {
//     const usuarioId = e.target.value;
//     setUsuarioSeleccionado(usuarioId);

//     const usuario = usuarios.find((u) => u.id === usuarioId);
//     if (usuario) {
//       setTipoUsuario(usuario.tipo); // "REGULAR" o "PREMIUM"
//     } else {
//       setTipoUsuario("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const usuario = usuarios.find((u) => u.id === usuarioSeleccionado);
//     if (!usuario) {
//       Swal.fire({
//         title: "Usuario no válido",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     if (!fechaCompra) {
//       Swal.fire({
//         title: "Por favor, seleccione una fecha de compra",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       return;
//     }

//     const descuento = tipoUsuario === "PREMIUM" ? 0.2 : 0;
//     const totalConDescuento = total * (1 - descuento);

//     const response = await registrarVenta({
//       usuarioId: usuario.id,
//       tipoUsuario,
//       carrito,
//       total: totalConDescuento,
//       fechaCompra,
//     });

//     if (response.status === 200) {
//       Swal.fire({
//         title: "Venta registrada con éxito",
//         icon: "success",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setUsuarioSeleccionado("");
//       setTipoUsuario("");
//       setCarrito([]);
//       setTotal(0);
//       setFechaCompra("");
//     } else {
//       Swal.fire({
//         title: "Error al registrar la venta",
//         icon: "error",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             Alta Venta
//           </h1>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Usuario
//               </label>
//               <select
//                 value={usuarioSeleccionado}
//                 onChange={handleUsuarioSeleccionado}
//                 className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
//               >
//                 <option value="">Seleccione un usuario</option>
//                 {usuarios.map((usuario) => (
//                   <option key={usuario.id} value={usuario.id}>
//                     {usuario.nombre} ({usuario.tipo})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Videojuego
//               </label>
//               <select
//                 value={videojuegoSeleccionado}
//                 onChange={(e) => setVideojuegoSeleccionado(e.target.value)}
//                 className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
//               >
//                 <option value="">Seleccione un videojuego</option>
//                 {videojuegos.map((videojuego) => (
//                   <option key={videojuego.id} value={videojuego.id}>
//                     {videojuego.nombre} - ${videojuego.precio} (Stock: {videojuego.stock})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Cantidad
//               </label>
//               <input
//                 type="number"
//                 value={cantidad}
//                 onChange={(e) => setCantidad(Number(e.target.value))}
//                 placeholder="Cantidad"
//                 className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
//                 min="1"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Fecha de Compra
//               </label>
//               <input
//                 type="date"
//                 value={fechaCompra}
//                 onChange={(e) => setFechaCompra(e.target.value)}
//                 className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm p-2.5"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={agregarProducto}
//               className="py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none"
//             >
//               Agregar Producto
//             </button>

//             <div>
//               <h2 className="text-lg font-bold text-gray-800 mt-4">
//                 Detalle de Venta
//               </h2>
//               <ul>
//                 {carrito.map((preCompra, index) => (
//                   <li key={index} className="mt-2">
//                     {preCompra.nombre} - {preCompra.cantidad} x ${preCompra.precio} = ${
//                       preCompra.subtotal
//                     }
//                   </li>
//                 ))}
//               </ul>
//               <p className="mt-4 font-bold">Total: ${total}</p>
//               {tipoUsuario === "PREMIUM" && (
//                 <p className="text-green-600 font-bold">Descuento aplicado: 20%</p>
//               )}
//               <p className="mt-2 font-bold">Total con descuento: ${
//                 tipoUsuario === "PREMIUM" ? total * 0.8 : total
//               }</p>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-green-600 text-white text-sm font-medium rounded-lg shadow hover:bg-green-700 focus:outline-none"
//             >
//               Guardar Venta
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AltaVenta;
