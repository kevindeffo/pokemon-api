const supertest = require("supertest")
let server

describe("auth", () => {
    beforeEach(() => {
        server = require("../../../app")
    });

    afterEach(() => {
        server.close()
    })
    test("should return 401 if there is no to token in the header of the request", async () => {

    })
})