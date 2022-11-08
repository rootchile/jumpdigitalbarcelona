const request = require("supertest");
const app = require("../../../app");
const companyRepository = require("../../../repository/company");

jest.mock("../../../repository/company");
describe("Reports", () => {

    const mockCompanies = [
        { 
            id: "company1",
        },
        { 
            id: "company2",
        }
    ];

    describe("Companies", () => {

        it("Should return BAD REQUEST if there is order defined", async () => {
            const response = await request(app).get("/reports/companies");
            expect(response.statusCode).toBe(400);
        });
    
        it("Should return BAD REQUEST if there the order doest not exist", async () => {
            const response = await request(app).get("/reports/companies?order=something");
            expect(response.statusCode).toBe(400);
        });
    
        it("Should return results by founded of companies correctly", async () => {
            companyRepository.getCompaniesOrderByFoundedDate.mockResolvedValue(mockCompanies);
            const response = await request(app).get("/reports/companies?order=founded");
            expect(response.statusCode).toBe(200);
        });
    
        it("Should return results by size of companies correctly", async () => {
            companyRepository.getCompaniesOrderBySize.mockResolvedValue(mockCompanies);
            const response = await request(app).get("/reports/companies?order=size");
            expect(response.statusCode).toBe(200);
        });
    
        it("Should return INTERNAL SERVER ERROR if there are troubles with repository", async () => {
            companyRepository.getCompaniesOrderBySize.mockRejectedValue();
            const response = await request(app).get("/reports/companies?order=size");
            expect(response.statusCode).toBe(500);
        });

    });

    describe("Summary", () => {

        it("Should return error if there are troubles with repo", async () => {
            companyRepository.getCompaniesByIndustry.mockRejectedValue();

            const response = await request(app).get("/reports/summary");
            expect(response.statusCode).toBe(500);

        });

        it("Should return summary correctly", async () => {
            const industry = { someIndustry: 10};
            const size = {"1-10": 2};
            const founded = { "2022": 2, "1990": 10, };

            companyRepository.getCompaniesByIndustry.mockResolvedValue({
                ... industry,
            });
            companyRepository.getCompaniesBySize.mockResolvedValue({
                ...size,
            });
            companyRepository.getCompaniesByFoundedYear.mockResolvedValue({
                ...founded,
            });

            const response = await request(app).get("/reports/summary");

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe(JSON.stringify({
                companiesByIndustry: { ... industry },
                companiesBySize: { ...size},
                companiesByFoundedYear: { ...founded}
            }));

        });
    });

   
});