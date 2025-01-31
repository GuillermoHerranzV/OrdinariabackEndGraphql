import { Collection, OptionalId } from "mongodb";

export type Restaurant = {

    id: string,
    nombre: string,
    direccion: string,
    ciudad: string,
    numeroTlfn: string,
    temperatura: number,
    hora: string,

}

export type RestaurantModel = OptionalId<{

    nombre: string,
    direccion: string,
    ciudad: string,
    numeroTlfn: string,

}>

