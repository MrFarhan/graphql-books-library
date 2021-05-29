const express = require("express")
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema")
const cors = require("cors")
const port = process.env.PORT || 4040

const app = express();
app.use(cors())

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(port, () => console.log(`server is running on port : ${port}`));

