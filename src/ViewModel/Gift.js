import { config, routes } from "../Config/ServerConfig.js";

class Gift {
    constructor(
        gift_id,
        gift_name,
        gift_description,
        gift_changed_date,
        res_max_contributors,
        res_changed_date,
        is_reserved,
        user_res,
        res_count
    ) {
        this.gift_id = gift_id;
        this.gift_name = gift_name;
        this.gift_description = gift_description;
        this.gift_changed_date = gift_changed_date;
        this.res_max_contributors = res_max_contributors;
        this.res_changed_date = res_changed_date;
        this.is_reserved = is_reserved;
        this.user_res = user_res;
        this.res_count = res_count;
    }

    create = async (event_id, name, desctiption) => {
        const url = config.server_address + config.server_port + routes.gifts;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.token
                },
                body: JSON.stringify({
                    event_id: event_id,
                    name: name,
                    description: desctiption
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

    reserve = async (gift_id, max_users, contact_number, event_id) => {
        const url = config.server_address + config.server_port + routes.reservations;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.token
                },
                body: JSON.stringify({
                    event_id: event_id,
                    gift_id: gift_id,
                    max_users: max_users,
                    contact_number: contact_number
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

    getReservations = async (gift_id) => {
        const url = config.server_address + config.server_port + routes.reservations;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.token,
                    "giftId": gift_id
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
    catch(error) {
        console.log(error);
        return false;
    }

    unreserve = async () => {
        const url = config.server_address + config.server_port + routes.reservations;
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.token,
                    "giftId": this.gift_id
                }
            });
            if (response.status === 200) {
                return true;
            }
            else return false;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
export default Gift;
