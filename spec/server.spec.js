const request = require('request');

describe('get locations', ()=>{
    it("should return 200 ok", (done)=>{
        request.get('http://localhost:3030/locations', (err, res)=>{
            expect(res.statusCode).toBe(200)
            done()
        })
    })
    
    it("should return a list of 5 items", (done)=>{
        request.get('http://localhost:3030/locations', (err, res)=>{
            expect(JSON.parse(res.body).length).toEqual(5)
            done()
        })
    })

    it("should return only results with status of APPROVED", (done)=>{
        request.get('http://localhost:3030/locations', (err, res)=>{
            expect(JSON.parse(res.body)[0].status).toEqual('APPROVED')
            expect(JSON.parse(res.body)[1].status).toEqual('APPROVED')
            expect(JSON.parse(res.body)[2].status).toEqual('APPROVED')
            expect(JSON.parse(res.body)[3].status).toEqual('APPROVED')
            expect(JSON.parse(res.body)[4].status).toEqual('APPROVED')
            done()
        })
    })

    it("should return results with applicant, address, fooditems, latitude, longitude", (done)=>{
        request.get('http://localhost:3030/locations', (err, res)=>{
            expect(JSON.parse(res.body)[0].applicants).toBeDefined
            expect(JSON.parse(res.body)[0].address).toBeDefined
            expect(JSON.parse(res.body)[0].fooditems).toBeDefined
            expect(JSON.parse(res.body)[0].latitude).toBeDefined
            expect(JSON.parse(res.body)[0].longitude).toBeDefined
            done()
        })
    })

})

describe("get locations by zip", ()=>{
    it("should return 200 ok", (done)=>{
        request.get('http://localhost:3030/locations/94110', (err, res)=>{
            expect(res.statusCode).toBe(200)
            done()
        })
    })
})