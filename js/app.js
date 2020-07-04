console.log("hdllo")
showNotes();
// If user adds a note , add it to the local storage

let addBtn = document.getElementById('addBtn');   // addBtn is a variable that get element by ID "addBtn"

addBtn.addEventListener("click" , function(e){   /* we add the eventlistner on addBtn , "if any one click on this button
", the function(e) is run that means "even object*/

let addTxt = document.getElementById('addTxt');   /* addTxt is a variable in which we get element by ID of the textarea
 field "addTxt" */

let addTitle = document.getElementById('addTitle');  /* adTittle is a variable in which we get element by id of
iput field of "addTitle"
*/

let notes = localStorage.getItem("notes");   /* here we get notes form local starage "the notes item , (if set)"
, and obviously the local storage of notes is null now , because we can't store anything yet*/
if(notes == null){
    notesObj = [];  /*if we dont get any notes , means the notes are null the pass the empty array */
}
else{
    notesObj = JSON.parse(notes);/*else parse the value of notes */
}
let myObj ={
    title: addTitle.value,
    text: addTxt.value
}
notesObj.push(myObj);   /*if anyone click on addBtn the this function push the note (title and text) */
localStorage.setItem("notes" , JSON.stringify(notesObj));  /*here we convert the notes in string because
 local storage wants the text in string */
addTxt.value = '';  /*it will blank the value of text after clicking on addnotes btn */
addTitle.value = '';  /*it will blank the value of title after clicking on addnotes btn */
console.log(notesObj);
showNotes();
})

function showNotes(){
let notes = localStorage.getItem("notes");
if(notes == null){
    notesObj = [];
}
else{
    notesObj = JSON.parse(notes)
}
let html = "";
notesObj.forEach(function(element , index){
html+= `
<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
<div class="card-body">
<h5 class="card-title"> ${element.title}</h5>
<p class="card-text">${element.text}</p>
<button id="${index}" onclick="deleteNote(this.id)" class="btn1 btn-primary">Delete Notes</button>
</div>
</div>
`;

});
let notesElm = document.getElementById('notes');
if(notesObj.length !=0){
    notesElm.innerHTML = html;
}
else{
    notesElm.innerHTML = `<font color = "white"> Nothing to show! Use "Add a notes" section above to add notes</font> `
}
}


function deleteNote(index){
    console.log('I am deleting' , index);

    let notes = localStorage.getItem("notes");
    if (notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index , 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


search = document.getElementById('searchTxt');
search.addEventListener("input" , function(){
inputVal = search.value;
console.log('input event fire', inputVal);
let noteCards = document.getElementsByClassName('noteCard');
Array.from(noteCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt)
    if(cardTxt.includes(inputVal)){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
})
})