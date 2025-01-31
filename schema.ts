export const schema = `#graphql

    type Query {
        
        getRestaurant (id:String): Restaurant
        getRestaurants (ciudad:String): [Restaurant!]!
    }

    type Mutation {
        addRestaurant (nombre: String, direccion: String, ciudad: String, numeroTlfn: String): Restaurant
        deleteRestaurant (id:String!): Boolean
    }

    type Restaurant {

        id: String
        nombre: String
        direccion: String
        ciudad: String
        numeroTlfn: String
        temperatura: Int
        hora: String

    }

`