import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import "../../app/globals.css";
import "tailwindcss/tailwind.css";

import Header from "../../components/header";
import { obtenerVideoJuego } from "@/api/VideoJuegos/obtenerVideoJuego";
import { obtenerUsuariosPremium } from "@/api/Usuarios/obtenerUsuariosPremium";
import { obtenerUsuariosRegulares } from "@/api/Usuarios/obtenerUsuariosRegulares";
import { CompraVideoJuego } from "@/api/Venta/CompraVideoJuego";

const VerCarrito = () => {
    const router = useRouter();

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [usuariosPremium, setUsuariosPremium] = useState([]);
    const [usuariosRegulares, setUsuariosRegulares] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [totalFijo, setTotalFijo] = useState(0);

    const [totalDescuento, setTotalDescuento] = useState(0);
    const [descuento, setDescuento] = useState(0);
    const [carritoModificado, setCarritoModificado] = useState([]);

    useEffect(() => {
        let carritoStorage;
        try {
            carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
        } catch (e) {
            carritoStorage = [];
            console.error("Error parsing JSON from localStorage", e);
        }
        const carritoPrevio = carritoStorage.reduce((acc, id) => {
            const existingItem = acc.find((item) => item.id === id);
            if (existingItem) {
                existingItem.cantidad += 1;
            } else {
                acc.push({ id, cantidad: 1 });
            }
            
            return acc;
        }
        , []);
        setCarritoModificado(carritoPrevio);
        fetchCarrito(carritoPrevio);
        fetchUsuarios();
    }, []);

    const fetchCarrito = async (carritoPrevio) => {
        let totalPrecio = 0;
        const carritoCompleto = await Promise.all(
            carritoPrevio.map(async (item) => {
                const response = await obtenerVideoJuego(item.id);
                if (response?.data) {
                    totalPrecio += response.data.precio * item.cantidad;
                    return { ...response.data, cantidad: item.cantidad };
                } else {
                    Swal.fire({
                        title: "Error al obtener el carrito",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    return null;
                }
            })
        );
        setCarrito(carritoCompleto.filter(Boolean));
        setTotal(totalPrecio);
        setTotalFijo(totalPrecio);
    };

    const fetchUsuarios = async () => {
        try {
            const [premiumResponse, regularesResponse] = await Promise.all([
                obtenerUsuariosPremium(),
                obtenerUsuariosRegulares(),
            ]);

            setUsuariosPremium(premiumResponse?.data || []);
            setUsuariosRegulares(regularesResponse?.data || []);
        } catch {
            Swal.fire({
                title: "Error al obtener los usuarios",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    useEffect(() => {
        setUsuarios([...usuariosPremium, ...usuariosRegulares]);
    }, [usuariosPremium, usuariosRegulares]);

    

    const handleEliminar = (id) => {
        const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
        const updatedCarrito = carritoStorage.filter((item) => item !== id);
        localStorage.setItem("carrito", JSON.stringify(updatedCarrito));
        setCarrito((prev) => prev.filter((item) => item.id !== id));
        const eliminado = carrito.find((item) => item.id === id);
        setTotal((prev) => prev - eliminado.precio * eliminado.cantidad);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setIsSearching(true);
        setSelectedUser(null);
        console.log(usuarios);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setTotal(totalFijo);
        if (user && user.adquisicionMembresia) {
            const fecha = new Date(user.adquisicionMembresia);
            const fechaActual = new Date();
            const diffTime = Math.abs(fechaActual - fecha);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if(diffDays>=0){
                setDescuento(total*0.2);
                setTotalDescuento(total*0.8);
            }
        }
        setIsSearching(false);
    };

    const filteredUsers = usuarios.filter((user) => {
        if (!searchQuery) return false;
        const fullName = `${user.nombre}`.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            (user.correo && user.correo.includes(searchQuery))
        );
        
    });


    const handlePagar = async() => {
      const fecha = new Date().toISOString();
      const user = selectedUser;
      const totalPremium = totalDescuento;
      const carritoCompra = carritoModificado;
      const totalRegular = total;
    
      console.log(carritoCompra);
        const response = await CompraVideoJuego(fecha, user, totalPremium, carritoCompra, totalRegular);
            if (response.status === 200) {
                Swal.fire({
                    title: "Compra realizada con éxito",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
                localStorage.removeItem("carrito");
                router.push("../Productos/listadoDeVideoJuego");
            } else {
                Swal.fire({
                    title: response.message || "Error al comprar video1juego",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        };     

    return (
        <div>
            <Header />
            <div className="container">
                <h1>Carrito de compras</h1>
                <div className="mb-4 mt-3 flex gap-5">
                    <h3>Usuarios</h3>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Buscar cliente..."
                        className="search-input dark:bg-gray-700 px-4 py-2 w-3/4 max-w-lg rounded-md shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                    {isSearching && searchQuery && (
                        <ul className="results-list mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg mx-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <li
                                        key={user.id}
                                        className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between items-center"
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <span>
                                            {user.nombre} 
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-500">No se encontraron resultados</li>
                            )}
                        </ul>
                    )}
                    {selectedUser && (
                        <div className="selected-user bg-white dark:bg-gray-800 shadow-md rounded-lg mt-4 p-4 w-3/4 max-w-lg mx-auto">
                            <h3 className="mb-2 text-xl font-semibold">Cliente seleccionado:</h3>
                            {selectedUser.adquisicionMembresia!==null && selectedUser.adquisicionMembresia!==undefined ? (
                               <div> <p>{`Nombre: ${selectedUser.nombre} - Correo: ${selectedUser.correo} `}</p>
                                    <p>{`FechaMembresia: ${selectedUser.adquisicionMembresia}`}</p></div>) :
                                 ( <p>{`Nombre: ${selectedUser.nombre} Correo: ${selectedUser.correo}`}</p>)}

                        </div>
                    )}
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td><img src={item.imagen} alt={item.nombre} style={{ width: "100px" }} /></td>
                                <td>{item.cantidad}</td>
                                <td>{item.precio}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleEliminar(item.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-end">
                    {selectedUser && selectedUser.adquisicionMembresia!==null && selectedUser.adquisicionMembresia!==undefined ? (
                        <div>
                            <h2>SubTotal: {total}</h2>
                            <h2>Descuento: {descuento}</h2>
                            <h2>Total: {totalDescuento}</h2>
                        
                        </div>
                    ) : (
                        <h2>Total: {total}</h2>
                    )}
                    <button className="btn btn-primary" onClick={handlePagar}>Pagar</button>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;
