import { config, routes, cloudinaryConfig } from "../Config/ServerConfig.js";

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
		res_count,
		pictureURL,
		gift_price,
		gift_model,
		gift_link
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
		this.picture = pictureURL;
		this.gift_price = gift_price;
		this.gift_model = gift_model;
		this.gift_link = gift_link;
	}

	create = async (event_id, name, desctiption, price, model, link) => {
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
					description: desctiption,
					price: price,
					model: model,
					link: link
				})
			});
			if (response.status === 201) {
				const body = await response.json();
				return body.gift_id;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	uploadImage = async (picture) => {
		const url =
			"https://api.cloudinary.com/v1_1/" +
			cloudinaryConfig.cloud_name +
			"/image/upload";
		const formData = new FormData();
		formData.append("file", picture);
		formData.append("api_key", cloudinaryConfig.api_key);
		formData.append("upload_preset", "default-preset");
		formData.append("metadata.img-id", 1);
		try {
			const response = await fetch(url, {
				method: "POST",
				body: formData
			});
			const body = await response.json();
			//console.log(body.url);
			return body.url;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	changeImage = async (gift_id, picture_url) => {
		const url = config.server_address + config.server_port + routes.gifts;
		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-auth-token": localStorage.token
				},
				body: JSON.stringify({
					gift_id: gift_id,
					picture_url: picture_url
				})
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
	};

	delete = async (gift_id) => {
		const url = config.server_address + config.server_port + routes.gifts;
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-auth-token": localStorage.token,
					"gift_id": gift_id
				}
			});
			if (response.status === 200) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	reserve = async (gift_id, max_users, contact_number, event_id, description) => {
		const url =
			config.server_address + config.server_port + routes.reservations;
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
					contact_number: contact_number,
					description: description
				})
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
	};

	getReservations = async (gift_id) => {
		const url =
			config.server_address + config.server_port + routes.reservations;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-auth-token": localStorage.token,
					giftId: gift_id
				}
			});
			if (response.status === 200) {
				return response.json();
			} else if (response.status === 401) {
				//console.log(401);
				return false;
			} else return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	unreserve = async () => {
		const url =
			config.server_address + config.server_port + routes.reservations;
		try {
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-auth-token": localStorage.token,
					giftId: this.gift_id
				}
			});
			if (response.status === 200) {
				return true;
			} else return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};
}
export default Gift;
