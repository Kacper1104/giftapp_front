import { config, routes } from "../Config/ServerConfig.js";

class User {
  constructor(
    id,
    email,
    name,
    account_confirmed,
    is_admin,
    created_date,
    changed_date
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.account_confirmed = account_confirmed;
    this.is_admin = is_admin;
    this.created_date = created_date;
    this.changed_date = changed_date;
  }

  signIn = async (password) => {
    const url = config.server_address + config.server_port + routes.signIn;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: password,
        }),
      });
      if (response.status === 200) {
        localStorage.token = response.body;
        return true;
      } else {
        console.log(response);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  register = async (password) => {
    const url = config.server_address + config.server_port + routes.register;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          name: this.email,
          password: password,
        }),
      });
      if (response.status === 201) {
        localStorage.token = await response.json();
        
      } else {
        console.log(response);
        return response.status;
      }
    } catch (error) {
      console.log(error);
      return 500;
    }
  };
}
export default User;
