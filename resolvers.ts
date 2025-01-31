import { ObjectId, type Collection } from "mongodb";
import { RestaurantModel } from "./types.ts"
import { GraphQLError } from "graphql";

type argsAddRestaurant = {

    nombre: string,
    direccion: string,
    ciudad: string,
    numeroTlfn: string


}

export const resolvers = {

    Query: {

        getRestaurant: async (_:unknown, {id}: {id:string}, ctx: Collection <RestaurantModel>): Promise <RestaurantModel|null> => {

            if (!id){throw new GraphQLError ("Se debe proporcionar un id")}
            const restaurante = ctx.findOne (new ObjectId (id));

            return restaurante;

        },

        getRestaurants: async (_:unknown, {ciudad}: {ciudad:string}, ctx: Collection <RestaurantModel>):Promise <RestaurantModel[]> => {

            if (!ciudad){throw new GraphQLError ("Se debe proporcionar una ciudad")}

            const restaurantes = ctx.find ({ciudad}).toArray();

            return restaurantes;

        },

    },

    Mutation: {

        addRestaurant:async (_:unknown, args: argsAddRestaurant, ctx: Collection <RestaurantModel>):Promise <RestaurantModel> => {

            if (!args.ciudad || !args.direccion || !args.nombre || !args.numeroTlfn){
                throw new GraphQLError ("Falta algun campo por rellenar");
            }

            /*const API_Key = Deno.env.get ("API_Key");
            const url = "https://api.api-ninjas.com/v1/validatephone?number=" + args.numeroTlfn;

            const validate = await fetch ({url, headers: {'X-Api-Key': API_Key}})*/

            const response = {

                _id: new ObjectId (),
                nombre: args.nombre,
                direccion: args.direccion,
                ciudad: args.ciudad,
                numeroTlfn: args.numeroTlfn,

            }
            return response;

        },

        deleteRestaurant: async (_:unknown, {id}: {id:string}, ctx: Collection <RestaurantModel>): Promise <boolean> => {

            if (!id) {throw new GraphQLError ("Se debe proporcionar un id")};

            const restaurante = ctx.findOneAndDelete (new ObjectId (id));
            if (!restaurante){
                return false;
            }else {return true;}

        }

    },

    Restaurant: {

        id: async (parent: RestaurantModel, _:unknown,ctx: Collection <RestaurantModel>){
            return parent._id!.toString();
        },

        /*temperatura: async (parent: RestaurantModel) => {

            const API_Key = Deno.env.get ("API_Key");
            const url = "https://api.api-ninjas.com/v1/weather?city=" + parent.ciudad;

            const temp = await fetch ({url, headers:{'X-Api-Key': API_Key}});

            if (!temp){
                throw new GraphQLError ("Temperatura no encontrada");
            }

            const tempjson = await temp.json();
            return tempjson.temp;

        },

        hora: async (parent: RestaurantModel) => {

            const API_Key = Deno.env.get ("API_Key");
            const url = "https://api.api-ninjas.com/v1/worldtime?city=" + parent.ciudad;

            const time = await fetch ({url, headers:{'X-Api-Key': API_Key}});

            if (!time){
                throw new GraphQLError ("Hora no encontrada");
            }

            const timejson = await time.json();
            return timejson;

        }*/

    }

}