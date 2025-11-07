import supertest from 'supertest'
import app from '../serve'
import { INVALID_URL, PORTFOLIO, UNKNOWN } from '../constants'
import * as worker from '../worker/producer'



const jobAccess = jest.spyOn(worker,'addAccessJob')
describe("test endpoints",()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should tes",async()=>{
        const response = await supertest(app)
        .get('/')

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,UNKNOWN)
    })
    it("should redirect to the portfolio when trying to access an invalid or non-existent URL",async()=>{
        const response = await supertest(app)
        .get('/testing/2')

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALID_URL)
    })
   it("should redirect to the portfolio when trying to access an invalid method",async()=>{
        const response = await supertest(app)
        .post('/testing')

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALID_URL)
    })
    it("should redirect to the portfolio when trying to access an invalid method",async()=>{
        const response = await supertest(app)
        .put('/testing')

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALID_URL)
    })
    it("should redirect to the portfolio when trying to access an invalid method",async()=>{
        const response = await supertest(app)
        .patch('/testing')

        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(PORTFOLIO)

        expect( jobAccess ).toHaveBeenCalledWith(null,INVALID_URL)
    })
}) 