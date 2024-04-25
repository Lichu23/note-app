import { useEffect, useState } from "react";

interface Notes {
  name: string;
  id: number;
  edit: boolean;
}

export function useList() {
  const [inputValue, setInputValue] = useState("");
  const [noteList, setNoteList] = useState<Notes[]>([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      try {
        setNoteList(JSON.parse(storedNotes));
      } catch (error) {
        console.error("Error parsing stored notes:", error);
      }
    }
  }, []);

  function handleAddNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const noteId = Math.random();
    const newNote: Notes = { name: inputValue, id: noteId, edit: false };

    setNoteList((prevState) => [...prevState, newNote]);
    setInputValue("");
    localStorage.setItem("notes", JSON.stringify([...noteList, newNote])); // Includes the new note
  }

  function handleDeleteNote(noteId: number) {
    const deletedNote = noteList.filter((note) => note.id !== noteId);
    setNoteList(deletedNote);
    localStorage.setItem("notes", JSON.stringify(deletedNote)); // Includes the new note
  }

  function handleEditNote(noteId: number) {
    setNoteList((prevState) =>
      prevState.map((note) => {
        if (note.id === noteId) {
          return { ...note, edit: !note.edit }; // Toggle edit state
        }
        return note;
      })
    );
  }

  function changeInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return {
    handleDeleteNote,
    handleAddNote,
    inputValue,
    changeInputValue,
    noteList,
    handleEditNote,
    setNoteList,
  };
}
