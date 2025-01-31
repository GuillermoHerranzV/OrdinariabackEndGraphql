import {MongoClient} from "mongodb";
import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {schema} from "./schema.ts";
import {resolvers} from "./resolvers.ts";
import { RestaurantModel } from "./types.ts";

const Mongo_URL = Deno.env.get ("Mongo_URL");

if (!Mongo_URL){
  throw new Error ("Mongo client not found");
}

const client = new MongoClient (Mongo_URL);

const dbName = "OrdinariaBackEnd";

await client.connect ();
console.log ("Database connected successfully");

const db = client.db(dbName);
const RestaurantCollection = db.collection <RestaurantModel> ("Restaurantes");

const server = new ApolloServer ({

  typeDefs: schema,
  resolvers,

});

const {url} = await startStandaloneServer (server, {context: async () => ({RestaurantCollection}),
 listen: {port: 3000}
});

console.info (`Server ready at ${url}`);

//237993