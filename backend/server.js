const app = require("./app");
const http = require("http");
const environmentVariables = require("./src/constants/environmentVariables");
const { registerSocketServer } = require("./socketServer");

const httpServer = http.createServer(app);
registerSocketServer(httpServer);

// start the server and listen for incomming requests.
httpServer.listen(environmentVariables.PORT, () => {
    console.log(
        `Server started at http://localhost:${environmentVariables.PORT}`
    );
});
