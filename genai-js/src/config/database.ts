// venkatasaireddyvibrant

// venkatasaireddyvibrant

// oF6xcN61jb8qhilw

// MXVHV4R4c2wxtD6p

import mongoose from 'mongoose'


// "/tinder" is the endpoint or its and database name

// in "/tinder" will store lot of collections

export const connectDB = async () => {

    // mongodb+srv://venkatasaireddyvibrant:<db_password>@learningnodejs-sai.hcnlu.mongodb.net/
    // mongodb+srv://venkatasaireddyvibrant:<db_password>@organic-cluster.9ecyi.mongodb.net/
await mongoose.connect('mongodb+srv://venkatasaireddyvibrant:oF6xcN61jb8qhilw@organic-cluster.9ecyi.mongodb.net/tinder')
}

// module.exports= connectDB