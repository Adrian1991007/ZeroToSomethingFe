describe('Visit site', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
  })
})

describe('Visit sponsors', () => {
  it('passes', () => {
    cy.visit('localhost:3000/sponsori')
  })
})

describe('Log in and delete a ', () => {
  it('passes', () => {
    cy.visit('localhost:3000/sponsori')
  })
})