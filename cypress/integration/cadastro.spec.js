var faker = require('faker')
const faker_br = require('faker-br')
faker.locale='pt_BR'

function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

describe('cadastro', ()=>{
    it('Usuário deve se cadastrar', ()=>{
       cy.viewport(1440, 900)
       cy.visit('https://sandbox.melhorenvio.com.br/cadastre-se')

       cy.get('Form> div > h1').should('have.text', ' Cadastre-se ')
       
       var firstName = faker.name.firstName()
       var lastName = faker.name.lastName()
       var email = faker.internet.email()
       let meuCpf = faker_br.br.cpf()
       var randomCnpj = faker_br.br.cnpj()
       var phone = makeid(8)
       var ddd = makeid(2)
       var company = firstName + lastName + 'company'
       var cep = '51190470'
       var number = makeid(3)


       var cliente ={
           nome: firstName+' '+lastName,
           email: email,
           confirmaEmail: email,
           cpf: meuCpf,
           dataNascimento: '18121996',
           senha: 'abc123',
           confirmaSenha: 'abc123',
           celular: ddd+'9'+phone,
           
       }

       cy.get('#iptNome').type(cliente.nome)
       cy.get('#iptEmail').type(cliente.email)
       cy.get('.lead-form__actions>button.button.button--primary').trigger('mouseover').wait(1000).click({force:true})
       
       cy.xpath('//input[@id="iptCPF"]').type(cliente.cpf)
       cy.get('#iptDtNascimento').type(cliente.dataNascimento)
       cy.get('#iptCelular').type(cliente.celular)
       cy.get('#iptConfirmaEmail').type(cliente.confirmaEmail)
       cy.get('#iptSenha').type(cliente.senha)
       cy.get('#iptConfirmaSenha').type(cliente.confirmaSenha)
       cy.get('div:nth-child(6) > fieldset > div > label').click()
       cy.get('button.button.button--primary').click().wait(3500).click({force:true})

       cy.get('#iptNomeFantasiaEmpresa').type(company)
       cy.get('#iptCNPJ').type(randomCnpj)
       cy.get('#iptCepEmpresa').type(cep)
       cy.get('#iptNumeroEmpresa').type(number)
       cy.get('div.button__container > button').click()
       cy.get('div > p.complete-registration__text.complete-registration__text--primary')
    }),
    it('Erro no preenchimento do cpf', ()=>{
        cy.viewport(1440, 900)
        cy.visit('https://sandbox.melhorenvio.com.br/cadastre-se')
 
        cy.get('Form> div > h1').should('have.text', ' Cadastre-se ')
        
        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        var email = faker.internet.email()
        let meuCpf = makeid(8)
        var randomCnpj = faker_br.br.cnpj()
        var phone = makeid(8)
        var ddd = makeid(2)
        var company = firstName + lastName + 'company'
        var cep = '51190470'
        var number = makeid(3)
 
 
        var cliente ={
            nome: firstName+' '+lastName,
            email: email,
            confirmaEmail: email,
            cpf: meuCpf,
            dataNascimento: '18121996',
            senha: 'abc123',
            confirmaSenha: 'abc123',
            celular: ddd+'9'+phone,
            
        }
 
        cy.get('#iptNome').type(cliente.nome)
        cy.get('#iptEmail').type(cliente.email)
        cy.get('.lead-form__actions>button.button.button--primary').trigger('mouseover').wait(1000).click({force:true})
        
        cy.xpath('//input[@id="iptCPF"]').type(cliente.cpf)
        cy.get('#iptDtNascimento').type(cliente.dataNascimento)
        cy.get('#iptCelular').type(cliente.celular)
        cy.get('#iptConfirmaEmail').type(cliente.confirmaEmail)
        cy.get('#iptSenha').type(cliente.senha)
        cy.get('#iptConfirmaSenha').type(cliente.confirmaSenha)
        cy.get('div:nth-child(6) > fieldset > div > label').click()
        cy.get('button.button.button--primary').click().click({force:true})
        cy.contains('p.errorText', 'CPF inválido! Verifique sua resposta.')
        
     })
})