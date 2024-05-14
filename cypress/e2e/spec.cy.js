import schema from "./schema.json"
import Ajv from "ajv"
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {}

describe('API Tests', function(){
  it("Verify GET API Response propert and value ", function(){
      cy.request('us/90210').as('comments')
      cy.get('@comments').should((response) => {
        // Verify the status code
        expect(response.status).to.eq(200)

        // Verify the response body property name
        expect(response.body).to.have.property('post code')
        expect(response.body).to.have.property('country')
        expect(response.body).to.have.property('country abbreviation')
        expect(response.body).to.have.property('places')
        expect(response.body.places[0]).to.have.property('latitude')
        expect(response.body.places[0]).to.have.property('latitude')
        expect(response.body.places[0]).to.have.property('place name')
        expect(response.body.places[0]).to.have.property('state')
        expect(response.body.places[0]).to.have.property('state abbreviation')

        // Verify the response body property values
        expect(response.body['post code']).to.eq('90210')
        expect(response.body.country).to.eq('United States')
        expect(response.body['country abbreviation']).to.eq('US')
        expect(response.body.places[0]['place name']).to.eq('Beverly Hills')
        expect(response.body.places[0]['longitude']).to.eq('-118.4065')
        expect(response.body.places[0]['state']).to.eq('California')
        expect(response.body.places[0]['state abbreviation']).to.eq('CA')
        expect(response.body.places[0]['latitude']).to.eq('34.0901')
      })
  })

  it("Verify GET API Response Using json schema validation", function(){
    cy.request('us/90210').as('comments')
    cy.get('@comments').should((response) => {
      const validate = ajv.compile(schema)
      const valid = validate(response.body)
      console.log(valid)
      if (!valid) console.log(validate.errors)
      })
  })
})