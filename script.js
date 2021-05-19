const addUserBtn = document.getElementById('addUser')
const doubleMoneyBtn = document.getElementById('doubleMoney')
const showMillionBtn = document.getElementById('showMillion')
const sortByRichestBtn = document.getElementById('sortByRichest')
const main = document.getElementById('main')

var userData = []
addPerson()

function updateDOM(data) {
    main.innerHTML = "<div id='headContainer'><h2>Person</h2><h2>Wealth</h2></div>"
    data.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('item')
        element.innerHTML = `<strong>${item['name']}</strong>${formatMoney(item['wealth'])}`
        main.appendChild(element)
    })
}

function formatMoney(money) {
    return `$` + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function addPerson() {
    fetch('https://randomuser.me/api/')
        .then(res => res.json())
        .then(data => {
            var userName = data.results[0]['name']['first'] + ` ` + data.results[0]['name']['last']
            var wealth = Math.floor(Math.random() * 1000000)
            userData.push({ 'name': userName, 'wealth': wealth })
            updateDOM(userData)
        })
        .catch(error => {
            console(`error!`, error)
        })
}

function doubleMoney() {
    userData.forEach(item => {
        item['wealth'] = item['wealth'] * 2
    })
    updateDOM(userData)
}

show = false

function showMillion() {
    if (!show) {
        var million = []
        userData.forEach(item => {
            if (item['wealth'] >= 1000000) {
                million.push(item)
            }
        })
        updateDOM(million)
        show = true
        showMillionBtn.innerText = `Show All`
    } else if (show) {
        updateDOM(userData)
        showMillionBtn.innerText = `Show Only Millionars`
        show = false
    }
}

function sortByRichest() {
    userData.sort((a, b) => b.wealth - a.wealth)
    updateDOM(userData)
}


addUserBtn.addEventListener('click', addPerson)
doubleMoneyBtn.addEventListener('click', doubleMoney)
showMillionBtn.addEventListener('click', showMillion)
sortByRichestBtn.addEventListener('click', sortByRichest)