// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://key-rider-301412-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsements = ref(database, "champions")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const endoListEl = document.getElementById("endo-list")
addButtonEl.addEventListener("click",function(){
    let inputvalue=inputFieldEl.value
    push(endorsements,inputvalue)
    console.log("hi")
    clearinput()
})
function clearinput(){
    inputFieldEl.value =""
}
onValue(endorsements, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearendoListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToendoListEl(currentItem)
        }    
    } else {
        endoListEl.innerHTML = "No Endorsements here... yet"
    }
})
function clearendoListEl(){
    endoListEl.innerHTML=""
}
function appendItemToendoListEl(item){
    let itemid=item[0]
    let itemvalue=item[1]
    let newli=document.createElement("li")
    newli.textContent=itemvalue
    
    endoListEl.append(newli)
}

