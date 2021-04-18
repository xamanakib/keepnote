console.log('Test');
showNotes();

//if user add a note,add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function(e) {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";

    showNotes()
});

//Function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    // let heading = document.getElementById('noteHead').innerText;
    // console.log(heading);
    notesObj.forEach(function(element, index) {
        html += `
        <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
        </div>
    </div>`;


    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = `${html}`;
    } else {
        notesElm.innerHTML = `No notes here. Add a new from above section`;
    }
}

//Function to delete note
function deleteNote(index) {


    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt')
search.addEventListener('input', function() {
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        } else {
            element.style.display = "none"

        }

    });
});
//Dark mode
let dark = document.getElementById('dark');
let icon = document.getElementById('icon');
dark.onclick = function() {
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        icon.src = "img/sun.png"
        document.getElementById('darkTxt').innerText = "light"
    } else {
        icon.src = "img/moon.png"
        document.getElementById('darkTxt').innerText = "Dark"
    }
}


/*Further features
1.Add title
2.Mark note as important
3.Separate note by user
4.Sync and host to web server 
*/