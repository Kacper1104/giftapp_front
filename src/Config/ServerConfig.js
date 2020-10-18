const { configure } = require("@testing-library/react");
const config = {
  server_address: "localhost",
  server_port: ":6060",
};
const routes = { register: "/users", signIn: "/auth" };
module.exports = { config, routes };
