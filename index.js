

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://bookmark-001-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
// const listDBref = ref(database, "List")
const AsapListDBref = ref(database, "ASAP Task")


// console.log(database)

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

const toDoListEl = document.getElementById("to-do-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    if (!inputValue == "") {
        push(AsapListDBref, inputValue)
        clearInputFieldEl()
    }

})

onValue(AsapListDBref, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearToDoListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemToList(currentItem)
        }
    }
    else {
        toDoListEl.innerHTML = ""
    }

})
function clearToDoListEl() {
    toDoListEl.innerHTML = ""
}
function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function appendItemToList(item) {
    // toDoListEl.innerHTML += `<li>${ItemValue}</li>`
    let itemVal = item[1]
    let itemId = item[0]
    let newEl = document.createElement("li")
    newEl.textContent = itemVal
    newEl.addEventListener("click", function () {

        let exactLocationOfItemInDb = ref(database, `ASAP Task/${itemId}`)
        remove(exactLocationOfItemInDb)
    })
    toDoListEl.append(newEl)

}