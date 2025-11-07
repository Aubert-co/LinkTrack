import supertest from 'supertest'
import app from '../serve'
import { DB_ERROR, INVALID_URL, INVALIDE_CODE, PORTFOLIO, UNKNOWN } from '../constants'
import * as worker from '../worker/producer'
import { cleanVacancies,createVacancies,createLinks,mockUrl, cleanLinks, encode } from './setup'
import { encodeId } from '../constants/decodeUrl'
import * as db from '../database/db'
const vacancy_id = 1
const plataform = "linkedin"
const mockInvalidCode = encodeId(2,'github')
const jobAccess = jest.spyOn(worker,'addAccessJob')


describe("test endpoint get/:code",()=>{
    beforeEach(async()=>{
        await cleanLinks()
        await cleanVacancies()
        
        await createVacancies()
        await createLinks()
        jest.clearAllMocks()
        jest.resetAllMocks()
    })
   
    it("should redirect to the URL saved in the database when a valid code is provided",async()=>{
        const response = await supertest(app)
        .get(`/${encode}`)

        expect( jobAccess ).toHaveBeenCalledWith(vacancy_id,plataform)
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(mockUrl)

     
    })
    it("should redirect to the portfolio when the code has an invalid character",async()=>{
        const response = await supertest(app)
        .get(`/${encode}a`)

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALIDE_CODE)
    })
    it("should redirect to the portfolio when an invalid encoded code is sent",async()=>{
     
        const response = await supertest(app)
        .get(`/${mockInvalidCode}`)

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALIDE_CODE)
    }) 
    it("should redirect to the portfolio when an error occurs in the database",async()=>{
        const spyDb = jest.spyOn(db.Database.prototype, 'query');
        spyDb.mockRejectedValue("DB ERROR" as never);
        const response = await supertest(app)
        .get(`/${mockInvalidCode}`)

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,DB_ERROR)
    }) 
}) 