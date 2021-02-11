const config = {
  server_address: "https://wesele-kk.herokuapp.com",
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
