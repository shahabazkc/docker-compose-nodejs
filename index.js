
const { app } = require("./src/app");
const { dbConnect } = require("./src/config/db");
const http = require('http');

const startServer = async () => {


    let server = http.createServer(app);
    server.listen(process.env.PORT || 3000, async () => {
        console.log(`Server started on port ${process.env.PORT || 3001}`)
        try {
            await dbConnect(process.env.MONGO_URL);
            console.log("Mongo db connected")
        }
        catch (err) {
            console.log(`Error connecting on mongo db: ${err}`)
        };
    });
};


startServer();