const AddBtn = document.querySelector("#add");
const AddNote = document.querySelector(".note-input textarea");
const notes = document.querySelector(".notes");

AddBtn.addEventListener("click", () => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <p>${AddNote.value}</p> 
    <button class="delete">*</button>
    `;

  notes.appendChild(note);
  AddNote.value = "";
});

notes.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});