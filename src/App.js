import './App.css';
import noteService from './services/notes'
import Note from './components/Note';
import { useState, useEffect } from 'react'
import Notification from './components/Notification';
import Footer from './components/Footer'
import './index.css'
const App =() => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [newNote, setNewNote] = useState('')
    const [errorMessage, setErrorMessage] = useState('')   

      const toggleImportanceOf = (id) => 
      {
        console.log('importance of ' + id + ' needs to be toggled')
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }
                         

        noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))

      }).catch(error => {
        setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })


      }
      
      
      
      useEffect(() => {
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
          })
      }, [])


      console.log('render', notes.length, 'notes')



    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: notes.length + 1,
          }
              
          noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  
      }
      
      


      const handleNotechange=(event)=>
      {
          console.log(event.target.value)
              setNewNote(event.target.value)
      }
      
      const notesToShow = showAll
                               ? notes
                           : notes.filter(note => note.important )


    return (
      <div>
        <h1>Greetings From Carbonteq</h1>
        <h1>Notes</h1>
        <Notification message={errorMessage} />

        <ul>
        {notesToShow.map(note => 
          <Note
            key={note.id}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

        <form onSubmit={addNote}>
        <input value={newNote}    onChange={handleNotechange} />
        <button type="submit">save</button>
      </form> 
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <Footer />
      </div>
    )
  }
  
  export default App
