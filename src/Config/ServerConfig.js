const config = {
  server_address: "http://localhost",
  server_port: ":6060",
};
const routes = { register: "/users", signIn: "/auth" };
module.exports = { config, routes };
