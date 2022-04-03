import React from 'react'
import "./languagemodal.css"

const LanguageModal = (props) => {
    const updatePreferredLanguage = (e) => {
        e.preventDefault()
        props.setPreferredLanguage(
            document.getElementById("preferredLan").value
        )
    }

  return (
    <div className='languagemodal'>
        <div className='languagemodal-title'>Google Translate Settings</div>
        <div>Preferred Language</div>
        <input id='preferredLan'
            type="text"
            defaultValue={props.preferredLanguage}
        />
        <input 
            type="submit" 
            value="Save" 
            onClick={e=>updatePreferredLanguage(e)}
        />
    </div>
  )
}

export default LanguageModal