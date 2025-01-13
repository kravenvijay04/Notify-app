// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Addedit.css'
import axiosInstance from '../../utils/axiosInstance';
const Addedit = ({ noteData, getAllNotes, type, onClose }) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");

  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
      });

      if (response.data && response.data.note) {
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  }

  const displayNote = async () => {

    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/display-note/" + noteId, {
        title,
        content,
      });

      if (response.data && response.data.note) {
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  }

  const editNote = async () => {

    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
      });

      if (response.data && response.data.note) {
        getAllNotes()
        onClose()
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  }

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === 'edit') {
      editNote();
    }
    else if(type === 'add') {
      addNewNote();
    }
    else{
      displayNote();
    }
  }
  return (
    <div className='top'>
      <div className='top1'>
        <label className='display1'>TITLE</label>
        <input type="text" className='input-addedit' placeholder='put your note' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div className='top2'>
        <label className='display2'>CONTENT</label>
        <textarea type="text" className='input-addedit1' placeholder='put your content' rows={10} value={content} onChange={({ target }) => setContent(target.value)} />
      </div>

      {error && <p className='error_'>{error}</p>}

      {type==="display"?'':<button className='btn' onClick={handleAddNote}>{type === "edit" ? "UPDATE" : "ADD"}</button>}
    </div>
  )
}

export default Addedit
