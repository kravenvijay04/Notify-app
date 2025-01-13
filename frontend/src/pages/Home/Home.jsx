// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import "./Home.css";
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/cards/NoteCard';
import { MdAdd } from "react-icons/md";
import Flare from '../../components/FlareMessage/Flare';
import Addedit from './Addedit';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance"
import EmptyCard from '../../components/EmptyCard/EmptyCard';

// Set app element for accessibility
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showFlareMsg, setShowFlareMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  })

  const [allNotes, setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleDisplay = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "display" });
  };

  const handleCloseFlare = () => {
    setShowFlareMsg({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error ocuured. Please try again.")
    }
  }

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        getAllNotes()

      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error ocuured. Please try again.")
      }
    }
  }

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        "isPinned": !noteId.isPinned,
      });

      if (response.data && response.data.note) {
        getAllNotes()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(true);
    getAllNotes();
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, []);

  const handleOpenModal = () => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  return (
    <>
      <div className='back'>
        <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
        <div>

          {allNotes.length > 0 ? (
            <div id="container">
              {allNotes.map((item) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  isPinned={item.isPinned}
                  onEdit={() => { handleEdit(item) }}
                  onDelete={() => { deleteNote(item) }}
                  onPinNote={() => { updateIsPinned(item) }}
                  onDisplay={()=>{ handleDisplay(item)}}
                />
              ))}
            </div>
          ) : (
            <EmptyCard />
          )}
        </div>

        <button className="add" onClick={handleOpenModal}>
          <MdAdd className="add-icon" />
        </button>


        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={handleCloseModal}

          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: '10'
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              width: '340px', // Optional: set width for modal
              padding: '20px', // Optional: set padding for modal content
            },
          }}
          contentLabel="Add/Edit Note"
        >
          <Addedit
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={handleCloseModal} getAllNotes={getAllNotes}
          />
        </Modal>


        <Flare
          usShown={showFlareMsg.isShown}
          message={showFlareMsg.message}
          onClose={handleCloseFlare}
        />
      </div>
    </>
  );
}

export default Home;
