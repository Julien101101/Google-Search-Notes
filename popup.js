document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notes');
  const searchTitle = document.getElementById('searchTitle');

  // Fetch the current search query and set it as the title
  chrome.storage.local.get('currentSearchQuery', (result) => {
    console.log('Retrieved search query:', result.currentSearchQuery);
    if (result.currentSearchQuery) {
      searchTitle.textContent = `Notes for: ${result.currentSearchQuery}`;
    } else {
      searchTitle.textContent = 'No search query found';
    }
  });

  // Fetch and display notes
  chrome.storage.local.get('notes', (result) => {
    const notes = result.notes || [];
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.textContent = `${note.timestamp}: ${note.searchQuery} - ${note.noteContent}`;
      notesContainer.appendChild(noteElement);
    });
  });
});
