const Live = require("./live/");
const Report = require("./reports");

module.exports = (app) => {
	app.use(Live);
	app.use(Report);
};
