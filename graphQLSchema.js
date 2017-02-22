const { buildSchema } = require('graphql');
const { usersById, postsById } = require('./data');

exports.schema = buildSchema(`
  
  type User{
    id:ID!
    name:String!
    posts: [Post!]!
  }
  
  type Post{
    id:ID!
    author:User!
    title:String!
    body:String!
  }
  
  type Mutation{
    addUser(name:String!): User
    renameUser(id: Int!, name: String!): User
    removeUser(id: Int!):RemoveUserPayload
  }
  
  type RemoveUserPayload{
    deletedUserId: Int!
  }
      
  type Query{
    users: [User!]!
    posts: [Post!]!
    user(id: ID!): User
  }  
`);

// *connect User/posts related
class GraphQLUser {

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  posts() {
    return Object.keys(postsById)
      .map(id => new GraphQLPost(postsById[id]))
      .filter(post => post.authorId === this.id);
  }
}
class GraphQLPost {

  constructor({ id, authorId, title, body }) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.body = body;
  }

  author() {
    return new GraphQLUser(usersById[this.authorId]);
  }
}

// Implements...
let nextId = 2;
const mutations = {
  addUser: ({ name }) => {

    console.log('mutations', name);

    const newUser = {
      id: nextId,
      name,
    };
    usersById[nextId] = newUser;

    nextId++;

    return new GraphQLUser(newUser);
  },
  renameUser: ({ id, name }) => {
    usersById[id].name = name;

    return new GraphQLUser(usersById[id]);
  },
  removeUser: ({ id }) => {
    delete usersById[id];

    return {
      deletedUserId: id,
    };
  }
}

// *Object.keys(objectA) -> return objectA keys-array...
exports.rootValue = {
  users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
  posts: () => Object.keys(postsById).map(id => new GraphQLPost(postsById[id])),
  user: ({ id }) => usersById[id] ? new GraphQLUser(usersById[id]) : null,
  addUser: mutations.addUser,
  renameUser: mutations.renameUser,
  removeUser: mutations.removeUser,
};
