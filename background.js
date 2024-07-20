chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'addNote') {
    const { searchQuery, noteContent, timestamp } = message;
    const note = { searchQuery, noteContent, timestamp };

    chrome.storage.local.get(['notes'], (result) => {
      const notes = result.notes || [];
      notes.push(note);
      chrome.storage.local.set({ notes }, () => {
        console.log('Note saved.');
      });
    });

    // Confirm that the search query is set correctly
    chrome.storage.local.set({ currentSearchQuery: searchQuery }, () => {
      console.log('Search query saved in background script:', searchQuery);
      sendResponse({ status: 'success' });
    });

    return true; // Keeps the message channel open for sendResponse
  }
});
