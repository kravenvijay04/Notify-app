// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import "./NoteCard.css";


const NoteCard = ({ title, content, date, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className='note-card'>
      <div className='header'>
        <div>
          <h3 className='title'>{title}</h3>
          <span className='date'>{date}</span>
        </div>
        <MdOutlinePushPin 
  className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`} 
  onClick={onPinNote} 
/>
      </div>
      <p className='content'>{content}</p>
      <div id='ons'>
        <MdCreate className='onCreate' onClick={onEdit} />
        <MdDelete className='onDelete' onClick={onDelete} />
      </div>
    </div>
  );
};

export default NoteCard;
