const config = {
  server_address: "http://localhost",
  server_port: ":6060",
};
const routes = { 
  register: "/users", 
  signIn: "/auth", 
  events: "/events", 
  gifts: "/gifts", 
  reservations: "/reservations", 
  codes: "/codes",
  joinEvent: "/events/join" 
};

module.exports = { config, routes };
