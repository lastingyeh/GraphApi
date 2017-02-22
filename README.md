### project structure

Server.js -

    graphQLSchema.js -
        
        -schema
        
            buildSchema 
                
                -type User
                
                -type Post
                
                -type Mutation
                
                -type RemoveUserPayload
                
                -type Query
                
                    -users
                    
                    -posts
                    
                    -user(id: ID!)
        
        -rootValue
        
            -users
            
            -posts
            
            -user
            
            -addUser
            
            -renameUser
            
            -removeUser
            
    -data
        
        -GraphQLUser
        
        -GraphQLPost
        
###install

npm install

###run in browser

terminal : npm start

browser : http://localhost:3000/graphql/

###Query code

Query in browser

    1.users
    
    query {
      users {
        id
        name
      }
      posts {
        id
        title
        body
      }
    }

    2.user
    
    {
      user(id: 1) {
        name
        posts {
          title
        }
      }
    }

    3.posts
    
    {
      users {
        name
        posts {
          title
          author {
            name
            posts {
              title
              author {
                id
                name
              }
            }
          }
        }
      }
    }

    4.addUser
    
    mutation {
      addUser(name: "Master") {
        id
        name
      }
    }

    5.renameUser
    
    mutation {
      renameUser(id: 1, name: "abcdefg") {
        id
        name
      }
    }

    6.removeUser
    
    mutation {
      removeUser(id: 1) {
        deletedUserId
      }
    }

####other query code

    1.fragment use
    
    {
      users {
        ...userInfo
      }
    }
    
    fragment userInfo on User {
      id
      name
    }
    -----------------------------------------
    2.
    
    {
      users {
        ...userInfoRequiredByComponent1
        ...userInfoRequiredByComponent2
        ...userInfoRequiredByComponent3
      }
    }
    
    fragment userInfoRequiredByComponent1 on User {
      id
    }
    
    fragment userInfoRequiredByComponent2 on User {
      name
    }
    
    fragment userInfoRequiredByComponent3 on User {
      id
      name
    }
       
###refs by 
http://ithelp.ithome.com.tw/m/articles/10188388