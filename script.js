const inputCEP = document.getElementById('cep')

const fillForm = (data) => {
  document.getElementById('endereco').value = data.logradouro
  document.getElementById('bairro').value = data.bairro
  document.getElementById('cidade').value = data.localidade
  document.getElementById('estado').value = data.uf
}

const clearForm = (data) => {
  document.getElementById('endereco').value = ''
  document.getElementById('bairro').value = ''
  document.getElementById('cidade').value = ''
  document.getElementById('estado').value = ''
}

const isNum = (n) => /^[0-9]+$/.test(n)

const isValid = (cep) => cep.length == 8 && isNum(cep)

const searchCEP = async() => {
  const cep = document.getElementById('cep').value
  const url = `https://viacep.com.br/ws/${cep}/json/`
  
  if (isValid(cep)){
    const res = await fetch(url)
    const data = await res.json()
  
  
    if (data.hasOwnProperty('erro')) {
      alert('CEP Invalido!')
      clearForm()
    } else {
      fillForm(data)
    }
  } else {
    alert('CEP Invalido!')
  }

}


inputCEP.addEventListener('focusout', searchCEP)