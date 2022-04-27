import React from "react";
import "./languagemodal.css";

const LanguageModal = (props) => {
  const updatePreferredLanguage = (e) => {
    e.preventDefault();
    props.setPreferredLanguage(document.getElementById("preferredLan").value);
  };

  return (
    <div className="languagemodal">
      <div className="languagemodal-title">Google Translate Settings</div>
      <div>Preferred Language</div>
      <input
        id="preferredLan"
        type="text"
        defaultValue={props.preferredLanguage}
      />
      <input
        type="submit"
        value="Save"
        onClick={(e) => updatePreferredLanguage(e)}
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          style={{ display: "inline-block", margin: "0" }}
          type="checkbox"
          checked="true"
          onChange={() => props.setAutoT(!props.autoT)}
        />
        <p style={{ margin: "0", paddingLeft: "0.5rem" }}>Auto Translate</p>
      </div>
    </div>
  );
};

export default LanguageModal;
