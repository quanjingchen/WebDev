import React from "react";

function Note() {
    const title = "this is notetitle";
    const content = "this is notecontent";
    return <div className="note"><h1>{title}</h1>
    <p>{content}</p>
    </div>
}

export default Note;