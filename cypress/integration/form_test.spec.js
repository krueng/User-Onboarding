describe('User Onboarding', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const roleSelect = () => cy.get('select[name=role]');
    const tosInput = () => cy.get('input[name=tos]');
    const submitBtn = () => cy.get('button[id=submitBtn]');
    const anyInput = () => cy.get('input[name=anyinput]');

    it('Sanity check to ensure the test is working', () => {
        expect(9 * 9).to.equal(81);
    })

    it('Check if the proper elements are showing', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        roleSelect().should('exist');
        tosInput().should('exist');
        submitBtn().should('exist');
        cy.contains('submit').should('exist');
        anyInput().should('not.exist');
    })

    describe('Filling out the inputs, submit then check after it to be empty', () => {
        it('Filling out the Name, Email, Password, role, tos, and submit', () => {
            submitBtn()
                .should('be.disabled')

            nameInput()
                .should('have.value', '')
                .type('Frist Lats')
                .should('have.value', 'Frist Lats')

            emailInput()
                .should('have.value', '')
                .type('frist@lats.name')
                .should('have.value', 'frist@lats.name')

            passwordInput()
                .should('have.value', '')
                .type('frist@latsverysecurepasswordinttheworld')
                .should('have.value', 'frist@latsverysecurepasswordinttheworld')

            roleSelect()
                .should('have.value', '')
                .select('Student')
                .should('have.value', 'Student')

            tosInput()
                .not('[disabled]')
                .uncheck().should('not.be.checked')
                .check()

            submitBtn()
                .should('be.enabled')
                .click()

        })

        it('Check for form validation if an input is left empty', () => {
            nameInput()
                .should('have.value', '')

            emailInput()
                .should('have.value', '')

            passwordInput()
                .should('have.value', '')

            roleSelect()
                .should('have.value', '')

            tosInput()
                .uncheck().should('not.be.checked')

            submitBtn()
                .should('be.disabled')
        })

    })

})