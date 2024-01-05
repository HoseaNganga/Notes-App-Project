//SELECT THE RELEVANT DOM ELEMENTS
const addCardButton=document.getElementById(`addCard`);
const body=document.body;

//LOAD DATA FROM LOCAL STORAGE
const storedValues=JSON.parse(localStorage.getItem(`textValues`))||[];
storedValues.forEach((note)=>{
    if(note){
        logData(note);
    }
    
})

//FUNCTION TO LOGDATA..ADDE EVENT LISTENER TO BUTTON TO ADD CARD
addCardButton.addEventListener(`click`,()=>{
    logData();
})

function logData(text=``){  //SET DEFAULT VALUE TO AN EMPTY STRING
    //CREATE NEW DIV ELEMENT
    const newDivEl=document.createElement(`div`);
    newDivEl.className=`cardContainer`;
    //APPEND THE RELEVANT HTML
    newDivEl.innerHTML=
    `<div class="cardHeader">
    <button class="edit" id="editButton">✏️</button>
    <button class="delete" id="deleteButton">🗑️</button>
    </div>
    <div class="cardBody">
    <div class="mainContent hidden"></div>
    <textarea class="textarea" name="textarea"></textarea>
    </div>`
    //APPEND THE CONTAINER TO THE BODY
    body.appendChild(newDivEl);
    //CALL RELEVANT DOM ELEMENTS
    const editButton=newDivEl.querySelector(`#editButton`);
    const deleteButton=newDivEl.querySelector(`#deleteButton`);
    const mainContent=newDivEl.querySelector(`.mainContent`);
    const textarea=newDivEl.querySelector(`textarea`);
    textarea.value=text;

    //ADD EVENT LISTENER TO THE EDIT BUTTON TO TOGGLE HIDDEN CLASS
    editButton.addEventListener(`click`,()=>{
        mainContent.classList.toggle(`hidden`);
        textarea.classList.toggle(`hidden`);
        if(textarea.classList.contains(`hidden`)){
            mainContent.style.backgroundColor="grey";
        }
        updateLs();
    })
    

    //ADD EVENT LISTENER TO GET TEXT AREA INPUT
    textarea.addEventListener(`input`,(e)=>{
        let textAreaInput=e.target.value;

        
        //UPDATE VALUE TO THE MAIN DIV
        mainContent.innerHTML=`<p>${textAreaInput}</p>`;
        console.log(mainContent.innerHTML);
        updateLs();
    })

    //ADD EVENT LISTENER TO DELETE A NOTE
    deleteButton.addEventListener(`click`,(e)=>{
        //GET THE CHILD ELEMENT TO DELETE FROM THE PARENT ELEMENT
        const childEl=e.target.parentElement.parentElement;
        body.removeChild(childEl);
        updateLs();
    })
    updateLs();

}

//FUNCTION TO UPDATE FROM LS
function updateLs(){
    const textValues=document.querySelectorAll(`textarea`);
    const arrayToStore=[];
    textValues.forEach((note)=>{
        arrayToStore.push(note.value);
    })
    localStorage.setItem(`textValues`,JSON.stringify(arrayToStore));
}






