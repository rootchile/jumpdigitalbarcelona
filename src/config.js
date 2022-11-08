require("dotenv").config();

const NODE_PORT = process.env.NODE_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "dev";
const ENABLE_SSL = process.env.ENABLE_SSL || false;
const SSL_PATH = process.env.SSL_PATH = "./ssl";

module.exports = {
	NODE_PORT,
	NODE_ENV,
	ENABLE_SSL,
	SSL_PATH,
};