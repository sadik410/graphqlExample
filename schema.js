const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Lanch Type
const LanchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean }
    // rocket: { type: RocketType }
  })
});

//Rocket Type

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

//Ship Type
const ShipType = new GraphQLObjectType({
  name: "Ship",
  fields: () => ({
    ship_id: { type: GraphQLString },
    ship_name: { type: GraphQLString },
    ship_model: { type: GraphQLString },
    ship_type: { type: GraphQLString },
    role: { type: GraphQLString }
  })
});

//Payloads Type
const PayloadType = new GraphQLObjectType({
  name: "Payload",
  fields: () => ({
    payload_id: { type: GraphQLString },
    reused: { type: GraphQLBoolean }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LanchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then((res) => res.data);
      }
    },
    launch: {
      type: LanchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then((res) => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then((res) => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`)
          .then((res) => res.data);
      }
    },
    ships: {
      type: new GraphQLList(ShipType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/ships")
          .then((res) => res.data);
      }
    },
    Payloads: {
      type: new GraphQLList(PayloadType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/payloads")
          .then((res) => res.data);
      }
    },
    Payload: {
      type: PayloadType,
      args: { payload_id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/payloads/${args.payload_id}`)
          .then((res) => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
