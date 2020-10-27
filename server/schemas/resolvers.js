const { User, Resource } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
    Query: {
        resources: async () => {
            return await Resource.find().sort({'dateCreated': -1});
        },
        resource: async (parent, { _id }) => {
            return await Resource.findById(_id);
        },
        users: async () => {
            return await User.find()
            .populate('resources');
        },
        user: async (parent, { username }) => {
            return await User.findOne({ username })
            .populate('resources');
        },
        resources_search: async (parent, { text }) => {
            return await Resource.find( {$or: [{ resourceBody: {$regex: text, $options: 'i'}}, {name: {$regex: text, $options: 'i'}},
                {shortDescription: {$regex: text, $options: 'i'}}] } );
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        },
        // login: async () => {

        // },
        addResource: async (parent, args) => {
            const resource = await Resource.create(args);
            return resource;
        },
        updateResource: async (parent, args) => {
            return await Resource.findByIdAndUpdate(args._id, {...args}, { new: true } );
        },
        deleteResource: async(parent, {_id})=>{
            try{
                return await Resource.findByIdAndRemove({_id});
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}

module.exports = resolvers;

