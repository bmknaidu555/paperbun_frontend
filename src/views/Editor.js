import React from "react"
import EditorNavbar from "components/navbar/EditorNavbar.js"
import EditorComp from "components/editor/editor"

function Editor(){
    return (
        <React.Fragment>
            <EditorNavbar/>
            <EditorComp/>
        </React.Fragment>

    )
}

export default Editor