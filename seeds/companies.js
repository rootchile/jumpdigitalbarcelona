const companies = require("../data-seed/companies");

exports.seed = async (knex) => {
	await knex("company").del();
	await Promise.all(
		companies.map(async (company) => {
			await knex("company")
				.insert(company)
				.onConflict()
				.ignore();
		})
	);
};
