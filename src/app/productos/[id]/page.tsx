import Link from "next/link";
"use client";

import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Función para obtener los detalles del producto
const fetchProducto = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Error al obtener los detalles del producto");
  }
  return res.json();
};

// Función para obtener productos relacionados
const fetchProductosRelacionados = async () => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) {
    throw new Error("Error al obtener los productos relacionados");
  }
  const data = await res.json();
  return data;
};

export default function DetalleProducto() {
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID del producto desde la URL
  const queryClient = useQueryClient();

  // Asegurarse de que id sea una cadena
  const productId = Array.isArray(id) ? id[0] : id;

  // Estado para el drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Inicializar el carrito desde localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      queryClient.setQueryData(["carrito"], JSON.parse(carritoGuardado));
    }
  }, [queryClient]);

  // React Query para obtener los detalles del producto
  const {
    data: producto,
    isLoading: isLoadingProducto,
    error: errorProducto,
  } = useQuery({
    queryKey: ["producto", productId],
    queryFn: () => fetchProducto(productId ?? ""),
    enabled: !!productId, // Solo ejecuta la consulta si hay un ID válido
  });

  // React Query para obtener productos relacionados
  const {
    data: productosRelacionados,
    isLoading: isLoadingRelacionados,
    error: errorRelacionados,
  } = useQuery({
    queryKey: ["productosRelacionados"],
    queryFn: fetchProductosRelacionados,
    enabled: !!productId, // Solo ejecuta la consulta si hay un ID válido
  });

  // Mutación para añadir productos al carrito
  const addToCartMutation = useMutation({
    mutationFn: (producto: any) => {
      const carritoActual = queryClient.getQueryData<any[]>(["carrito"]) || [];
      const nuevoCarrito = [...carritoActual, producto];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito)); // Guardar en localStorage
      return Promise.resolve(nuevoCarrito);
    },
    onSuccess: (nuevoCarrito) => {
      queryClient.setQueryData(["carrito"], nuevoCarrito);
      setIsDrawerOpen(true); // Abrir el drawer
    },
  });

  // Mutación para eliminar un producto del carrito
  const removeFromCartMutation = useMutation({
    mutationFn: (productoId: string) => {
      const carritoActual = queryClient.getQueryData<any[]>(["carrito"]) || [];
      const nuevoCarrito = carritoActual.filter((item) => item.id !== productoId);
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito)); // Guardar en localStorage
      return Promise.resolve(nuevoCarrito);
    },
    onSuccess: (nuevoCarrito) => {
      queryClient.setQueryData(["carrito"], nuevoCarrito);
    },
  });

  // Obtener el carrito desde React Query
  const carrito = queryClient.getQueryData<any[]>(["carrito"]) || [];

  // Mostrar estado de carga
  if (isLoadingProducto) {
    return <div className="text-center text-pastel-blue">Cargando...</div>;
  }

  // Mostrar estado de error
  if (errorProducto) {
    return (
      <div className="text-center text-pastel-rose">
        Error al cargar los detalles del producto.
      </div>
    );
  }

  // Mostrar estado de datos vacíos
  if (!producto) {
    return (
      <div className="text-center text-pastel-gray">
        No se encontraron detalles para este producto.
      </div>
    );
  }

  return (
    <div className="bg-pastel-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md  p-6">
        <img
          src={producto.image}
          alt={producto.title}
          className="w-96 h-96 object-cover rounded-md mb-6"
        />
        <h1 className="text-pastel-black text-3xl font-bold mb-4">
          {producto.title}
        </h1>
        <p className="text-pastel-black text-lg mb-4">{producto.description}</p>
        <p className="text-pastel-black text-2xl font-semibold mb-4">
          ${producto.price}
        </p>
        <button
          className="bg-pastel-lilac text-white px-6 py-2 rounded mr-4"
          onClick={() => addToCartMutation.mutate(producto)}
        >
          Añadir al Carrito
        </button>
        <button
          className="bg-pastel-blue text-white px-6 py-2 rounded"
          onClick={() => router.push("/productos")}
        >
          Volver a Productos
        </button>
      </div>

      {/* Sección de productos relacionados */}
      <div className="mt-12">
        <h2 className="text-pastel-purple text-2xl font-bold mb-4">
          Productos Relacionados
        </h2>
        {isLoadingRelacionados ? (
          <div className="text-center text-pastel-blue">Cargando productos relacionados...</div>
        ) : errorRelacionados ? (
          <div className="text-center text-pastel-rose">
            Error al cargar los productos relacionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosRelacionados
              ?.filter((relacionado: any) => relacionado.id !== productId) // Excluir el producto actual
              .slice(0, 3) // Mostrar solo 6 productos relacionados
              .map((relacionado: any) => (
                <div
                  key={relacionado.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <img
                    src={relacionado.image}
                    alt={relacionado.title}
                    className="w-full h-35 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-pastel-black text-lg font-semibold mb-2">
                    {relacionado.title}
                  </h3>
                  <p className="text-pastel-black text-sm mb-2">
                    ${relacionado.price}
                  </p>
                  <button
                    className="bg-pastel-blue text-white px-4 py-2 rounded"
                    onClick={() => router.push(`/productos/${relacionado.id}`)}
                  >
                    Ver Producto
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Drawer del carrito */}
      {isDrawerOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50">
          <div className="p-4 border-b border-gray-300 flex justify-between items-center">
            <img
              src="/carrito.png" // Ruta de la imagen del carrito
              alt="Carrito"
              className="w-6 h-6"
            />
            <button
              className="text-red-500 font-bold"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cerrar
            </button>
          </div>
          <div className="p-4">
            {carrito.length === 0 ? (
              <p className="text-gray-500">El carrito está vacío.</p>
            ) : (
              <>
                <ul>
                  {carrito.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between mb-4"
                    >
                      <div>
                        <p className="font-semibold text-black">{item.title}</p>
                        <p className="text-sm text-gray-500">${item.price}</p>
                      </div>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <button
                        className="text-red-500 text-sm"
                        onClick={() => removeFromCartMutation.mutate(item.id)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Resumen del carrito */}
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-bold text-black mb-2">Resumen del Carrito</h3>
                  <div className="flex justify-between mb-2 text-black" >
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      ${carrito.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2 text-black">
                    <span className="text-gray-600">Impuestos (15%):</span>
                    <span className="font-semibold">
                      $
                      {(
                        carrito.reduce((acc, item) => acc + item.price, 0) * 0.15
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-black">
                    <span>Total:</span>
                    <span>
                      $
                      {(
                        carrito.reduce((acc, item) => acc + item.price, 0) * 1.15
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}