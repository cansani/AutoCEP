const inputCEP = document.getElementById('cep')

const fillForm = (data) => {
  document.getElementById('endereco').value = data.logradouro
  document.getElementById('bairro').value = data.bairro
  document.getElementById('cidade').value = data.localidade
  document.getElementById('estado').value = data.uf
}

const onlyNumbers = (e) => {
  const keyCode = (e.keyCode ? e.keyCode : e.wich)

  if(keyCode > 47 && keyCode < 58) {
    return keyCode
  } else {
    e.preventDefault()
  }
}

const clearForm = () => {
  document.getElementById('endereco').value = ''
  document.getElementById('bairro').value = ''
  document.getElementById('cidade').value = ''
  document.getElementById('estado').value = ''
}

const searchCEP = async () => {
  const cep = inputCEP.value
  const url = `https://viacep.com.br/ws/${cep}/json/`
  
  if (document.getElementById('cep').value.length < 8) {
    alert('CEP Invalido!')
  } else {
    const res =  await fetch(url)
    const data = await res.json()

    if (data.erro === true) {
      alert('CEP Invalido!')
      clearForm()
    } else {
      fillForm(data)
    }
  }
}


inputCEP.addEventListener('focusout', searchCEP)
inputCEP.addEventListener('keypress', onlyNumbers)


const btn = document.getElementById('btn')
const getLocalStorage = () => JSON.parse(localStorage.getItem('database')) ?? []
const setLocalStorage = (database) => localStorage.setItem('database', JSON.stringify(database)) 

const createPerson = (person) => {
  const database = getLocalStorage()
  database.push(person)
  setLocalStorage(database)
}

const savePerson = () => {
  const examplePerson = {
    name: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    cep: document.getElementById('cep').value,
    adress: document.getElementById('endereco').value,
    adress_number: document.getElementById('numero').value,
    bairro: document.getElementById('bairro').value,
    cidade: document.getElementById('cidade').value,
    estado: document.getElementById('estado').value
  }

  if (examplePerson.name === '' || examplePerson.adress_number === '') {
    alert('Preencha todos os campos!')
  } else {
    createPerson(examplePerson)
    alert(`${examplePerson.name} foi adicionado(a) no banco de dados.`)
  }
}

btn.addEventListener('click', savePerson)

