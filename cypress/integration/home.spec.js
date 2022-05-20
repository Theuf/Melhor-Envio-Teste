

describe('cadastro', ()=>{
    it('cadastro deve ser realizado com sucesso', ()=>{
       cy.viewport(1440, 900)
       cy.visit('https://sandbox.melhorenvio.com.br/cadastre-se')
       cy.get('#app > div > section.registration-banner > h1').should('have.text', '\n    Cadastre-se agora e tenha\n    \n    acesso gratuito a fretes mais competitivos!\n  ')
    })
})