import { config, routes } from "../Config/ServerConfig.js";

class MyEvent {
  constructor(
    id,
    name,
    host,
    start_date,
    is_active,
    created_date,
    changed_date,
    role,
    reservation_id
  ) {
    this.id = id;
    this.name = name;
    this.host = host;
    this.start_date = start_date;
    this.is_active = is_active;
    this.created_date = created_date;
    this.changed_date = changed_date;
    this.role = role;
    this.reservation_id = reservation_id;
  }

  create = async (event_name, start_date) => {
    const url = config.server_address + config.server_port + routes.events;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
        body: JSON.stringify({
          event_name: event_name,
          start_date: start_date
        }),
      });
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getGifts = async () => {
    const url = config.server_address + config.server_port + routes.gifts;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
          "eventId": this.id
        }
      });
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 401) {
        //console.log(401);
        return false;
      }
      else return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  getCodes = async () => {
    const url = config.server_address + config.server_port + routes.codes;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
          "eventId": this.id
        }
      });
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 401) {
        //console.log(401);
        return false;
      }
      else return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  joinEvent = async (code) => {
    const url = config.server_address + config.server_port + routes.joinEvent;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
          "code": code
        },
        body: null
      });
      if (response.status === 200) {
        return true;
      }
      else if (response.status === 401) {
        //console.log(401);
        return false;
      }
      else return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  createCode = async (name) => {
    const url = config.server_address + config.server_port + routes.codes;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token
        },
        body: JSON.stringify({
          event_id: this.id,
          name: name
        }),
      });
      if (response.status === 201) {
        return true;
      }
      else if (response.status === 401) {
        //console.log(401);
        return false;
      }
      else return false;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

}
export default MyEvent;
