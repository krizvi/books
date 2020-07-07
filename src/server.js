const express = require('express');
const os = require('os');
const common = require('./routes/common')
const expressGraphQL = require('express-graphql');
const {schema, books, authors} = require('./data');
const app = express();


// we want to see a GraphQL UI without calling a postman or so
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))
app.use('/ping', common);


const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`[Author-Books] [Express Server] started on '${os.hostname}:${PORT}'  @ ${new Date().toLocaleString()}`);
})
