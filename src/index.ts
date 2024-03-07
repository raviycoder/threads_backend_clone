import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3001;

  app.use(express.json());

  // Create Graphql Server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        say(name: String): String
    }
    `,
    resolvers: {
      Query: {
        hello: () => `Hey there, I am a graphql server`,
        say: (_, { name }: { name: string }) =>
          `Hey ${name}, How Are you ?`,
      },
    },
  });

  //Start the gql server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
  });
}

init();
