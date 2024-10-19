// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./Home.css";
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/cards/NoteCard';
import { MdAdd } from "react-icons/md";
import Addedit from './Addedit';
import Modal from "react-modal";

// Set app element for accessibility
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleOpenModal = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <Navbar />
      <div id="container">
        <NoteCard 
          title="India vs NZ match"
          date="20th Oct 2024" 
          content="India need 10 wickets to win against NZ"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard 
          title="India vs NZ match"
          date="20th Oct 2024" 
          content="India need 10 wickets to win against NZ"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard 
          title="India vs NZ match"
          date="20th Oct 2024" 
          content="India need 10 wickets to win against NZ"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard 
          title="India vs NZ match"
          date="20th Oct 2024" 
          content="India need 10 wickets to win against NZ"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard 
          title="India vs NZ match"
          date="20th Oct 2024" 
          content="India need 10 wickets to win against NZ"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
      </div>

      <button className="add" onClick={handleOpenModal}>
        <MdAdd id="add-icon" />
      </button>

      <Modal 
        isOpen={openAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)" // Background color for overlay
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '400px', // Optional: set width for modal
            padding: '20px', // Optional: set padding for modal content
          },
        }}
        contentLabel="Add/Edit Note"
      >
        <Addedit onClose={handleCloseModal} />
      </Modal>
    </>
  );
}

export default Home;
