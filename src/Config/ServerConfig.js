const config = {
  server_address: process.env.BACKEND_URL,
  server_port: "",
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
