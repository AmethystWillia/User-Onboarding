import { useState } from "react";

describe('Quotes App', () => {
    // ---------- Refresh ---------- //
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // ---------- Helpers ---------- //
    const submitBtn = () => cy.get('button[id="submitBtn"]');
    const firstNameInput = () => cy.get('input[name=first_name]');
    const lastNameInput = () => cy.get('input[name=last_name]');
    const usernameInput = () => cy.get('input[name=username]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const termsInput = () => cy.get('input[name=terms]');
    // Fake const
    const foobar = () => cy.get('input[name=foobar]');

    // ---------- Tests ---------- //
    it('Sanity Check', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
    });

    it('Proper elements are showing', () => {
        foobar().should('not.exist');

        submitBtn().should('exist');
        firstNameInput().should('exist');
        lastNameInput().should('exist');
        usernameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        termsInput().should('exist');
    });

    describe('Filling out inputs', () => {
        it('Can navigate to site', () => {
            cy.url().should('include', 'localhost');
        });

        it('Submit button starts disabled', () => {
            submitBtn().should('be.disabled');
        });

        it('Can fill out inputs + Check terms + Submit button enables when all inputs filled/checked', () => {
            firstNameInput()
                .should('have.value', '')
                .type('Amy')
                .should('have.value', 'Amy');
            lastNameInput()
                .should('have.value', '')
                .type('Willia')
                .should('have.value', 'Willia');
            usernameInput()
                .should('have.value', '')
                .type('Zmithic')
                .should('have.value', 'Zmithic');
            emailInput()
                .should('have.value', '')
                .type('z@g.c')
                .should('have.value', 'z@g.c');
            passwordInput()
                .should('have.value', '')
                .type('qwerty66')
                .should('have.value', 'qwerty66');
            termsInput()
                .should('not.be.checked')
                .check()
                .should('be.checked');

            submitBtn().should('not.be.disabled');
        });
        
        it('Incorrect inputs do not enable submit + Errors show up', () => {
            firstNameInput().type('A');
            lastNameInput().type('A');
            usernameInput().type('A');
            emailInput().type('A');
            passwordInput().type('A');
            termsInput().should('not.be.checked');

            cy.contains('must').should('exist'); // All error messages contain the word must

            submitBtn().should('be.disabled');
        });
    });

    describe('Submit new user', () => {
        it('Can submit a new user and add it to webpage', () => {
            firstNameInput().type('Ryoma');
            lastNameInput().type('Hoshi');
            usernameInput().type('hoshi_tennispro');
            emailInput().type('tennis.pro@hope.com');
            passwordInput().type('RussianBlues71');
            termsInput().check();
            submitBtn().click();

            cy.contains('tennispro').should('exist');
        });
    });
});