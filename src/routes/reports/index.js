const express = require("express");
const router = express.Router();
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR} = require("http-status-codes").StatusCodes;
const companyRepository = require("../../repository/company");

router.get("/reports/companies", async (req, res) => {
    const { order } = req.query;
    const allowedOrder = ['founded', 'size'];
    if (!order || !allowedOrder.includes(order)) {
        return  res.status(BAD_REQUEST).send({ error: `Should pass some order param (${allowedOrder.join(",")})` });
    }

    try { 
        let companyList;

        if (order === 'founded') {
            companyList = await companyRepository.getCompaniesOrderByFoundedDate();
        }

        if (order === 'size') {
            companyList = await companyRepository.getCompaniesOrderBySize();
        }

        res.status(OK).send(companyList);

    } catch (e) {
       return res.status(INTERNAL_SERVER_ERROR).send({ error: "Something went wrong trying to fetch results"});
    }
    return res.status(BAD_REQUEST).send();
});


router.get("/reports/summary", async (_req, res) => {
    let countCompaniesByIndustry;
    let countCompaniesBySize;
    let countCompaniesByFoundedYear;

    try {

        countCompaniesByIndustry = await companyRepository.getCompaniesByIndustry();
        countCompaniesBySize = await companyRepository.getCompaniesBySize();
        countCompaniesByFoundedYear = await companyRepository.getCompaniesByFoundedYear();

    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).send({ error: "Something went wrong trying to fetch summary"});
    }
    

    return res.status(OK).send({ 
        companiesByIndustry: countCompaniesByIndustry,
        companiesBySize: countCompaniesBySize,
        companiesByFoundedYear: countCompaniesByFoundedYear,
     });
});

module.exports = router;