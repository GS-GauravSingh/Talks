const app = require("./app");
const http = require("http");
const environmentVariables = require("./src/constants/environmentVariables");

const server = http.createServer(app);

// start the server and listen for incomming requests.
server.listen(environmentVariables.PORT, () => {
    console.log(
        `Server started at http://localhost:${environmentVariables.PORT}`
    );
});
