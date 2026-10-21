// Importamos los hooks de React y del store
import { useState, useEffect } from 'react'
import { useCarritoStore } from '../store/useCarritoStore'

// Definimos el componente ListaProductos
function ListaProductos() {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    // Del store solo necesitamos la acción para agregar
    const agregarProducto = useCarritoStore((state) => state.agregarProducto)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                // Adaptamos las propiedades de la API a nuestra estructura
                const productosMapeados = data.map((prod) => ({
                    id: prod.id,
                    nombre: prod.title,
                    precio: Math.round(prod.price * 4000), // Conversión aproximada a pesos colombianos
                }))
                setProductos(productosMapeados)
                setCargando(false)
            })
            .catch((error) => {
                console.error("Error al cargar los productos:", error)
                setCargando(false)
            })
    }, [])

    if (cargando) {
        return (
            <section className="panel">
                <h2>Productos</h2>
                <p className="vacio">Cargando catálogo...</p>
            </section>
        )
    }

    return (
        // section agrupa todo el catálogo; panel le da apariencia de tarjeta
        <section className="panel">
            <h2>Productos</h2>
            {/* Recorremos los productos y creamos una fila por cada uno */}
            {productos.map((producto) => (
                // key ayuda a React a identificar cada elemento de la lista
                <div key={producto.id} className="fila">
                    {/* Bloque con el nombre y el precio */}
                    <div>
                        <p className="fila-nombre">{producto.nombre}</p>
                        {/* toLocaleString('es-CO') da formato de pesos */}
                        <p className="fila-detalle">${producto.precio.toLocaleString('es-CO')}</p>
                    </div>
                    {/* Al hacer clic, enviamos el producto completo a la acción del store */}
                    <button className="btn btn-primario" onClick={() => agregarProducto(producto)}>
                        Agregar
                    </button>
                </div>
            ))}
        </section>
    )
}
// Exportamos el componente
export default ListaProductos