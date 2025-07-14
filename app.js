document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('note-form');
  const noteInput = document.getElementById('note-input');
  const noteList = document.getElementById('note-list');

  function loadNotes() {
    fetch('/notes')
      .then(res => res.json())
      .then(data => {
        noteList.innerHTML = '';
        data.forEach(note => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${note.text}
            <button onclick="deleteNote(${note.id})">Delete</button>
          `;
          noteList.appendChild(li);
        });
      });
  }

  noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (!text) return;

    fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(() => {
      noteInput.value = '';
      loadNotes();
    });
  });

  window.deleteNote = function(id) {
    fetch(`/notes/${id}`, {
      method: 'DELETE'
    }).then(() => loadNotes());
  };

  loadNotes();
});
