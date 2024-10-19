// eslint-disable-next-line no-unused-vars
import React from 'react'
import './Addedit.css'
const Addedit = () => {
  return (
    <div className='top'>
      <div className='top1'>    
        <label className='display1'>TITLE</label>
        <input type="text" className='input-addedit' placeholder='put your note'/>
      </div>
      <div className='top2'>    
        <label className='display2'>CONTENT</label>
        <textarea type="text" className='input-addedit1' placeholder='put your content' rows={10}/>
      </div>

      <button className='btn' onClick={()=>{}}>ADD</button>
    </div>
  )
}

export default Addedit
