const config = {
  server_address: "http://localhost",
  server_port: ":6060",
};
const routes = { register: "/users", signIn: "/auth", events: "/events", gifts: "/gifts" };
module.exports = { config, routes };
