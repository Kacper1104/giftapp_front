import { config, routes } from "../Config/ServerConfig.js";

class MyEvent {
  constructor(
    id,
    name,
    start_date,
    is_active,
    created_date,
    changed_date,
    role,
    reservation_id
  ) {
    this.id = id;
    this.name = name;
    this.start_date = start_date;
    this.is_active = is_active;
    this.created_date = created_date;
    this.changed_date = changed_date;
    this.role = role;
    this.reservation_id = reservation_id;

  }

  

}
export default MyEvent;
