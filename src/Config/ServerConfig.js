const cloudinaryConfig = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "hwvc60mro",
	api_key: process.env.CLOUDINARY_API_KEY || "637946998665293",
	api_secret: process.env.CLOUDINARY_API_SECRET || "DF1n2ls3JpizChn1ha5j9m4ys8M"
};

const config = {
	server_address: process.env.BACKEND_URL || "http://localhost:6060",
	server_port: ""
};

const routes = {
	register: "/users",
	signIn: "/auth",
	auth: "/auth",
	events: "/events",
	gifts: "/gifts",
	reservations: "/reservations",
	codes: "/codes",
	joinEvent: "/events/join"
};

module.exports = { config, routes, cloudinaryConfig };
