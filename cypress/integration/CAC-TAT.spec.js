/// <reference types="Cypress" />

import {LoremIpsum} from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})


const firstName = 'Amanda'
const lastName = 'Freitas'
const email = 'amandkelvi@gmail.com'
const description = lorem.generateSentences(5)
const phoneNumber = '98989898'

describe('Central de Atendimento ao Cliente TAT', function() {
    
    beforeEach(function() {
        cy.visit('../src/index.html')
    })

    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher campos obrigatórios e envia formulário', function() {
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#open-text-area').type(description, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('span[class="success"]').should('be.visible')
    })

    it('Valida se exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type('teste.com')
        cy.get('#open-text-area').type(description, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    
    })

    it('Validar se o valor continuará vazio se um valor não-numérico for digitado no campo telefone', function() {
        cy.get('#phone').type('abcdefgh').should('have.value', "")
    
    })

    it('Valida se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#open-text-area').type(description, {delay:0})
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('Valida se é possível preencher e limpar os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type(firstName).should('have.value', firstName).clear().should('have.value', '')
        cy.get('#lastName').type(lastName).should('have.value', lastName).clear().should('have.value', '')
        cy.get('#email').type(email).should('have.value', email).clear().should('have.value', '')
        cy.get('#phone').type(phoneNumber).should('have.value', phoneNumber).clear().should('have.value', '')

    })

    it('Valida se exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('span[class="error"]').should('be.visible')

    })

    it('Valida se envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit(firstName, lastName, email, description)
        cy.get('span[class="success"]').should('be.visible')

    })

    it('Valida se exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type(firstName)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#open-text-area').type(description, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('span[class="success"]').should('be.visible')
    })

  })
  