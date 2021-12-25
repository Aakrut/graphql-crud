const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require("graphql-tools");
const dev = require('./model/dev_model');


const typeDefs = gql`

        type User{
            id:ID!
            name:String!
            role:String!
            experience: Float!
        }

        type Query{
            getAllDevs:[User]
            getDev(id:ID!):User
        }

        type Mutation{
            addDev(name:String!,role:String!,experience:Float!):User

            updateDev(id:ID!,name:String,role:String,experience:Float):User
        
            deleteDev(id:ID!):User

            deleteAllDevs:[User]
        }

`;

const resolvers = {
  Query: {
    //Get All Developers
    getAllDevs: async () => {
      return await dev.find({});
    },
    //Get Developer By Id
    getDev: async (parent, args) => {
      return await dev.findById(args.id);
    },
  },

    Mutation: {
      //Add Developer
    addDev: async (parent, args) => {
      const newDev = new dev({
        name: args.name,
        role: args.role,
        experience: args.experience,
      });

      return await newDev.save();
    },

        //Update Developer
    updateDev: async (parent, args) => {
      if (!args.id) return null;
      else
        return await dev
          .findOneAndUpdate(
            { _id: args.id },
            {
              $set: {
                name: args.name,
                role: args.role,
                experience: args.experience,
              },
            }
          )
          .then((res) => {
            console.log(`Updated SuccessFully ${res}`);
          })
          .catch((err) => {
            console.log(`Update Error ${err}`);
          });
    },

    //Delete Developer by Id
    deleteDev: async (parent, args) => {
      if (!args.id) return null;
      else {
        await dev
          .findByIdAndDelete(args.id)
          .then((res) => {
            console.log(`Developer Deleted ${res}`);
          })
          .catch((err) => {
            console.log(`Delete Developer ${err}`);
          });
      }
    },

    //Delete All Developer
      deleteAllDevs: async () => {
          return await dev.deleteMany().then((res) => { console.log(`Deleted All Developer ${res}`) }).catch((err) => {
              console.log(`Delete All Developers ${err}`)
          })
    }
  },
};

module.exports = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});
