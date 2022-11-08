const companyRepository = require("../company");
const knex = require("../../db");

jest.mock("../../db", () => {
    return {
        select: jest.fn().mockReturnThis(),
        table: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        raw: jest.fn().mockReturnThis(),
    }
});
describe("Company repository", () => {

    describe ("Get companies order by founded date", () => {
        
        it("Should throw error if something went wrong", async () => {
            knex.orderBy.mockRejectedValue(new Error("something went wrong"));
            await expect(companyRepository.getCompaniesOrderByFoundedDate()).rejects.toThrow();
        });
    
        it("Should return companies", async () => {
            knex.orderBy.mockResolvedValue({ rows: [ { id: "companyId" }]});
            const companies = await companyRepository.getCompaniesOrderByFoundedDate();
            expect(companies).toMatchObject({ rows: [ { id: "companyId" }]});
        });

    });

    describe ("Get companies order by size", () => {
        
        it("Should throw error if something went wrong", async () => {
            knex.raw.mockRejectedValue(new Error("something went wrong"));
            await expect(companyRepository.getCompaniesOrderBySize()).rejects.toThrow();
        });

        it("Should return companies", async () => {
            knex.raw.mockResolvedValue({ rows: [ { id: "companyId" }]});
            const companies = await companyRepository.getCompaniesOrderBySize();
            expect(companies).toMatchObject([{ id: "companyId" }]);
        });
    });

    describe ("Get companies by industry", () => {
        
        it("Should throw error if something went wrong", async () => {
            knex.raw.mockRejectedValue(new Error("something went wrong"));
            await expect(companyRepository.getCompaniesByIndustry()).rejects.toThrow();
        });

        it("Should return companies", async () => {
            knex.raw.mockResolvedValue({ rows: [ { id: "companyId" }]});
            const companies = await companyRepository.getCompaniesByIndustry();
            expect(companies).toMatchObject([ { id: "companyId" }]);
        });
    
       
    });

    describe ("Get companies by size", () => {
        
        it("Should throw error if something went wrong", async () => {
            knex.raw.mockRejectedValue(new Error("something went wrong"));
            await expect(companyRepository.getCompaniesBySize()).rejects.toThrow();
        });

        it("Should return companies", async () => {
            knex.raw.mockResolvedValue({ rows: [ { id: "companyId" }]});
            const companies = await companyRepository.getCompaniesBySize();
            expect(companies).toMatchObject([ { id: "companyId" }]);
        });
    
       
    });


    describe ("Get companies by founded", () => {
        
        it("Should throw error if something went wrong", async () => {
            knex.raw.mockRejectedValue(new Error("something went wrong"));
            await expect(companyRepository.getCompaniesByFoundedYear()).rejects.toThrow();
        });

        it("Should return companies", async () => {
            knex.raw.mockResolvedValue({ rows: [ { id: "companyId" }]});
            const companies = await companyRepository.getCompaniesByFoundedYear();
            expect(companies).toMatchObject([ { id: "companyId" }]);
        });
    
    });

});