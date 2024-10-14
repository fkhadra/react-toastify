/// <reference types="cypress" />

context('Cookies', () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true)

    cy.visit('https://example.cypress.io/commands/cookies')

    // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare
    cy.clearCookies()
  })

  it('cy.getCookie() - get a browser cookie', () => {
    // https://on.cypress.io/getcookie
    cy.get('#getCookie .set-a-cookie').click()

    // cy.getCookie() yields a cookie object
    cy.getCookie('token').should('have.property', 'value', '123ABC')
  })

  it('cy.getCookies() - get browser cookies for the current domain', () => {
    // https://on.cypress.io/getcookies
    cy.getCookies().should('be.empty')

    cy.get('#getCookies .set-a-cookie').click()

    // cy.getCookies() yields an array of cookies
    cy.getCookies().should('have.length', 1).should((cookies) => {
      // each cookie has these properties
      expect(cookies[0]).to.have.property('name', 'token')
      expect(cookies[0]).to.have.property('value', '123ABC')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')
    })
  })

  it('cy.getAllCookies() - get all browser cookies', () => {
    // https://on.cypress.io/getallcookies
    cy.getAllCookies().should('be.empty')

    cy.setCookie('key', 'value')
    cy.setCookie('key', 'value', { domain: '.example.com' })

    // cy.getAllCookies() yields an array of cookies
    cy.getAllCookies().should('have.length', 2).should((cookies) => {
      // each cookie has these properties
      expect(cookies[0]).to.have.property('name', 'key')
      expect(cookies[0]).to.have.property('value', 'value')
      expect(cookies[0]).to.have.property('httpOnly', false)
      expect(cookies[0]).to.have.property('secure', false)
      expect(cookies[0]).to.have.property('domain')
      expect(cookies[0]).to.have.property('path')

      expect(cookies[1]).to.have.property('name', 'key')
      expect(cookies[1]).to.have.property('value', 'value')
      expect(cookies[1]).to.have.property('httpOnly', false)
      expect(cookies[1]).to.have.property('secure', false)
      expect(cookies[1]).to.have.property('domain', '.example.com')
      expect(cookies[1]).to.have.property('path')
    })
  })

  it('cy.setCookie() - set a browser cookie', () => {
    // https://on.cypress.io/setcookie
    cy.getCookies().should('be.empty')

    cy.setCookie('foo', 'bar')

    // cy.getCookie() yields a cookie object
    cy.getCookie('foo').should('have.property', 'value', 'bar')
  })

  it('cy.clearCookie() - clear a browser cookie', () => {
    // https://on.cypress.io/clearcookie
    cy.getCookie('token').should('be.null')

    cy.get('#clearCookie .set-a-cookie').click()

    cy.getCookie('token').should('have.property', 'value', '123ABC')

    // cy.clearCookies() yields null
    cy.clearCookie('token')

    cy.getCookie('token').should('be.null')
  })

  it('cy.clearCookies() - clear browser cookies for the current domain', () => {
    // https://on.cypress.io/clearcookies
    cy.getCookies().should('be.empty')

    cy.get('#clearCookies .set-a-cookie').click()

    cy.getCookies().should('have.length', 1)

    // cy.clearCookies() yields null
    cy.clearCookies()

    cy.getCookies().should('be.empty')
  })

  it('cy.clearAllCookies() - clear all browser cookies', () => {
    // https://on.cypress.io/clearallcookies
    cy.getAllCookies().should('be.empty')

    cy.setCookie('key', 'value')
    cy.setCookie('key', 'value', { domain: '.example.com' })

    cy.getAllCookies().should('have.length', 2)

    // cy.clearAllCookies() yields null
    cy.clearAllCookies()

    cy.getAllCookies().should('be.empty')
  })
})
