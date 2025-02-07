export interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    caracteristicas: string;
    stock: number;
    rating: number;
    precio: number;
    imagen: string | null;
    categoria_id: number;
    fecha_creacion: string;
    fecha_actualizacion: string;
    // ...other properties...
}
