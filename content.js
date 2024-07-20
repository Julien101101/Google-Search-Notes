// Inject a note button into the Google search page
const noteButton = document.createElement('button');
noteButton.textContent = 'Add Note';
noteButton.style.position = 'fixed';
noteButton.style.bottom = '10px';
noteButton.style.right = '10px';
noteButton.style.zIndex = '1000';
document.body.appendChild(noteButton);

noteButton.addEventListener('click', () => {
  const searchQuery = document.querySelector('input[name="q"]').value;
  const noteContent = prompt('Enter your note:');
  if (noteContent) {
    const timestamp = new Date().toISOString();
    chrome.runtime.sendMessage({ action: 'addNote', searchQuery, noteContent, timestamp }, () => {
      // Store the current search query after saving the note
      chrome.storage.local.set({ currentSearchQuery: searchQuery }, () => {
        console.log('Search query saved:', searchQuery);
      });e
    });
  }
});
