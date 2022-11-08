const knex = require('../db');

const companyRepository = {
    getCompaniesOrderByFoundedDate: async () => { 
        try {     
            const companies = await knex.select('*')
                                        .table('company')
                                        .orderBy('founded');
            return companies;
    
        } catch(e) { 
            throw new Error("Something went wrong fetching companies", e)
        }
    },
    getCompaniesOrderBySize: async () => { 
        try { 
            const companies = await knex.raw('SELECT *, substring(SUBSTRING( size, POSITION( \'-\' in size)+1, 10) FROM \'[0-9]+\')::INTEGER as size_company FROM company ORDER BY 11 ASC');
            return companies.rows;
        } catch (e) {
            throw new Error("Something went wrong fetching companies", e)
        }
    },

    getCompaniesByIndustry: async() => { 
        try { 
            const companies = await knex.raw('SELECT industry, count(id) as companies FROM company GROUP BY industry');
            return companies.rows;
        } catch (e) {
            throw new Error("Something went wrong fetching companies by industry", e)
        } 
    },
    getCompaniesBySize: async() => { 
        try { 
            const companies = await knex.raw('SELECT size, count(id) as companies FROM company GROUP BY size');
            return companies.rows;
        } catch (e) {
            throw new Error("Something went wrong fetching companies by size", e)
        } 
    },
    getCompaniesByFoundedYear: async() => { 
        try { 
            const companies = await knex.raw('SELECT founded, count(id) as companies FROM company GROUP BY founded');
            return companies.rows;
        } catch (e) {
            throw new Error("Something went wrong fetching companies by founded", e)
        } 
    }
}

module.exports = companyRepository;