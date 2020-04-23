const { ApolloServer } = require("apollo-server");
const isEmail = require("isemail");

const UserAPI = require("./datasources/user");
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const LaunchAPI = require("./datasources/launch");

// sets up sequelize db once
const store = createStore();

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    // console.log("email is: ", email);
    if (!isEmail.validate(email)) return { user: null };

    // find a user by their email
    const user = await store.users.findOne({ where: { email } });
    if (user === null) return { user: null }; // user doesnt exist

    return {
      user: { ...user.dataValues }
    };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
    engine: {
      debugPrintReports: true
    }
  })
});

server.listen().then(({ url }) => {
  console.log(`++++++ Server ready at ${url} ++++++`);
});
