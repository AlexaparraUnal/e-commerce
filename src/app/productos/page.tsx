"use client";
import Link from "next/link";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // Función para obtener productos
  const fetchProductos = async () => {
    const url =
      categoriaSeleccionada === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${categoriaSeleccionada}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error al obtener los productos");
    }
    return res.json();
  };

  // Función para obtener categorías
  const fetchCategorias = async () => {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) {
      throw new Error("Error al obtener las categorías");
    }
    return res.json();
  };

  // React Query para productos
  const {
    data: productos = [],
    isLoading: productosCargando,
    error: errorProductos,
  } = useQuery({
    queryKey: ["productos", categoriaSeleccionada],
    queryFn: fetchProductos,
  });

  // React Query para categorías
  const {
    data: categorias = [],
    isLoading: categoriasCargando,
    error: errorCategorias,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: fetchCategorias,
  });

  // Calcular productos para la página actual
  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const productosPaginados = productos.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  // Cambiar página
  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  // Mostrar estado de carga
  if (productosCargando || categoriasCargando) {
    return <div className="text-center text-pastel-blue">Cargando...</div>;
  }

  // Mostrar estado de error
  if (errorProductos || errorCategorias) {
    return (
      <div className="text-center text-pastel-rose">
        Error al cargar los datos. Por favor, intenta nuevamente.
      </div>
    );
  }

  // Mostrar mensaje si no hay productos
  if (productos.length === 0) {
    return (
      <div className="text-center text-pastel-black">
        No hay productos disponibles en esta categoría.
      </div>
    );
  }

  return (
    <div className="bg-pastel-white min-h-screen p-8">
      <h1 className="text-pastel-purple text-4xl font-bold mb-8 text-center">
        Nuestros Productos
      </h1>
      {/* Botón para volver a la página de inicio */}
      <div className="mb-6 text-center">
        <Link href="/">
          <button className="bg-pastel-blue text-white px-6 py-2 rounded">
           Inicio
          </button>
        </Link>
      </div>
      {/* Filtro por categoría */}
      <div className="mb-6 text-center">
        <select
          className="p-2 rounded bg-pastel-lilac text-pastel-black"
          value={categoriaSeleccionada}
          onChange={(e) => {
            setCategoriaSeleccionada(e.target.value);
            setPaginaActual(1); // Reiniciar a la primera página
          }}
        >
          <option value="all">Todas</option>
          {categorias.map((categoria: string) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Productos */}
      <div className="bg-pastel-purple p-2 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosPaginados.map((producto: any) => (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-md p-2 text-center min-h-[250px]"
            >
              <Link href={`/productos/${producto.id}`}>
                <img
                  src={producto.image}
                  alt={producto.title}
                  className="w-full h-45 object-cover rounded-md mb-4"
                />


              </Link>
              <h2 className="text-pastel-black text-lg font-semibold">
                {producto.title}
              </h2>
              <p className="text-pastel-black font-medium">${producto.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from(
          { length: Math.ceil(productos.length / productosPorPagina) },
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${paginaActual === index + 1
                ? "bg-pastel-purple text-white"
                : "bg-pastel-lilac text-pastel-black"
                }`}
              onClick={() => cambiarPagina(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}