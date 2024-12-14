// eslint-disable-next-line no-unused-vars
import React from 'react'
import './EmptyCard.css'
const EmptyCard = () => {
    return (
        <div className='img_con'>
            <img src="../../images/empty.png" alt='empty' className='emp' />
            <p className='msg'>Start creating your note! Click the <strong>Add</strong> button to note down your thoughts,ideas and reminders</p>
        </div>
    )
}

export default EmptyCard
