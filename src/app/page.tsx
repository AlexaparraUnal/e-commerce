import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-pastel-with text-pastel-blue min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-pastel-purple
         text-4xl font-bold">Bienvenido</h1>
      <p className="text-pastel-black
       mt-4">
        "Exprésate con estilo. Encuentra lo que va contigo."

      </p>
      <Link href ="/productos">
      <button className="bg-pastel-blue text-pastel-white px-4 py-2 mt-6 rounded">
        PRODUCTOS
      </button>
      </Link>
    </div>
  );
}