import { useList } from "../hooks/useList";

const Notes = () => {
  const {
    handleDeleteNote,
    handleAddNote,
    inputValue,
    changeInputValue,
    noteList,
    handleEditNote,
    setNoteList,
  } = useList();
  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleAddNote}>
        <input value={inputValue} onChange={changeInputValue} />
        <button>+</button>
      </form>

      <div className="notes">
        {noteList.map((note) => (
          <div key={note.id}>
            {note.edit ? (
              <input
                type="text"
                value={note.name}
                onChange={(e) => {
                  const updatedNotes = noteList.map((existingNote) => {
                    if (existingNote.id === note.id) {
                      // Check if note IDs match
                      return { ...existingNote, name: e.target.value };
                      // Create new object with updated name
                    } else {
                      return existingNote; // Return the note unchanged
                    }
                  });

                  setNoteList(updatedNotes);
                }}
              />
            ) : (
              <span>{note.name}</span>
            )}
            <button onClick={() => handleDeleteNote(note.id)}>x</button>
            <button onClick={() => handleEditNote(note.id)}>
              {note.edit ? "Save Change" : "Edit"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
