import './styles.css';
import templatesNewNote from './templates/newNote.hbs';

const refs = {
  openFormAddNote: document.querySelector('.openFormAddNote'),
  formAddNote: document.querySelector('.formAddNote'),
  closeFormAddNote: document.querySelector('.closeFormAddNote'),
  notesList: document.querySelector('.notesList'),
};

refs.openFormAddNote.addEventListener('click', openFormAddNote);
function openFormAddNote() {
  refs.formAddNote.classList.add('formAddNoteVisible');
  refs.openFormAddNote.classList.add('openFormAddNoteHidden');
}

refs.closeFormAddNote.addEventListener('click', closeFormAddNote);
function closeFormAddNote(e) {
  e.preventDefault();
  refs.formAddNote.classList.remove('formAddNoteVisible');
  refs.openFormAddNote.classList.remove('openFormAddNoteHidden');
}

refs.formAddNote.addEventListener('submit', addNoteToNotesList);
function addNoteToNotesList(e) {
  e.preventDefault();
  const note = {
    header: e.currentTarget.elements[0].value,
    description: e.currentTarget.elements[1].value,
  };
  const markuplist = templatesNewNote(note);

  refs.notesList.insertAdjacentHTML('beforeend', markuplist);

  e.currentTarget.elements[0].value = '';
  e.currentTarget.elements[1].value = '';
  refs.formAddNote.classList.remove('formAddNoteVisible');
  refs.openFormAddNote.classList.remove('openFormAddNoteHidden');
}

refs.notesList.addEventListener('click', deleteNote);
function deleteNote(e) {
  let element = e.target;
  if (element.className === 'deleteNote') {
    element.parentNode.parentNode.parentNode.removeChild(
      element.parentNode.parentNode,
    );
  }
}

refs.notesList.addEventListener('change', checkNote);
function checkNote(e) {
  let element = e.target;
  if (element.parentNode.childNodes[1].textContent === 'Done') {
    element.parentNode.childNodes[1].textContent = 'Pending';
    element.parentNode.parentNode.parentNode.childNodes[3].classList.remove(
      'noteHeaderCheaked',
    );
  } else {
    element.parentNode.childNodes[1].textContent = 'Done';
    element.parentNode.parentNode.parentNode.childNodes[3].classList.add(
      'noteHeaderCheaked',
    );
  }
}
