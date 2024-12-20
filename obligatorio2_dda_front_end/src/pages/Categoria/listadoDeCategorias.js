'use client';
import React, { useState, useEffect } from 'react';
import '../../app/globals.css';
import 'tailwindcss/tailwind.css';
import Header from "../../components/header";
import { obtenerCategorias } from '../../api/Categorias/obtenerCategorias'; 
import { eliminarCategoria } from '../../api/Categorias/eliminarCategoria'; 
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const ListarCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const router = useRouter();

    const handleObtenerCategorias = async () => {
        try {
            const response = await obtenerCategorias();
            if (response.data) {
                setCategorias(response.data);
            } else {
                Swal.fire({
                    title: 'Error al obtener categorías',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error al obtener categorías',
                text: error.message,
                icon: 'error'
            });
        }
    };

    const handleEliminarCategoria = async (id) => {
        const result = await Swal.fire({
            title: '¿Está seguro de eliminar la categoría?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        });

        if (result.isConfirmed) {
                const response = await eliminarCategoria(id);
                if (response.status === 200){
                    Swal.fire({
                        title: 'Categoría eliminada con éxito',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    handleObtenerCategorias(); //Actualiza la lista después de eliminar
                } else {
                    Swal.fire({
                        title: 'Error al eliminar la categoría',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
        }
    };

    const handleModificarCategoria= (id) => {
        router.push(`../Categoria/modificarCategoria/${id}`);
    }

    useEffect(() => {
        handleObtenerCategorias();
    }, []);

    return (
        <div>
            <Header />
            <div className="text-center">
                <h1>Listar Categorías</h1>
                <table className="table ml-10 mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>{categoria.nombre}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleModificarCategoria(categoria.id)}>
                                        Modificar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleEliminarCategoria(categoria.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListarCategorias;