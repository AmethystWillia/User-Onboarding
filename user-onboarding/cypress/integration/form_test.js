describe('Quotes App', () => {
    // ---------- Refresh ---------- //
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // ---------- Helpers ---------- //
    // ---------- Tests ---------- //
    it('Sanity Check', () => {
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({});
    });
});