export interface Order {
    id: number;
    fecha_compra: Date;
    cliente_id: number;
    cupon_id: null;
    importe_preliminar: string;
    importe_total: string;
    importe_igv: string;
    importe_venta: string;
    importe_descuento: string;
    estado: string;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    productos: Producto[];
    cupon: null;
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    caracteristicas: string;
    precio: string;
    imagen: null | string;
    stock: number;
    categoria_id: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    pivot: Pivot;
}

export interface Pivot {
    orden_id: number;
    producto_id: number;
    cantidad: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}
