
import React from "react"
import 'medium-draft/lib/index.css';
import 'assets/css/editor/editor.css'


import {
    Editor,
    createEditorState,
} from 'medium-draft';
class EditorComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorTitleContent: '',
            editorState: createEditorState(), // for empty content
            minHeight: 15,
        };

        /*
        this.state = {
          editorState: createEditorState(data), // with content
        };
        */

        this.onChange = (editorState) => {
            this.setState({ editorState });
        };

        this.titleOnKeypress = (event) => {
            if(event.key === "Enter"){
                event.preventDefault()
            }
        }

        this.refsEditor = React.createRef();

    }

    componentDidMount() {
        document.getElementById("editorTitle").focus()
        //this.refsEditor.current.focus();
        this.resizeTextArea()
    }

    

    resizeTextArea = () => {
        const target = document.getElementById("editorTitle");
        const paddingTop = parseInt(getComputedStyle(target).getPropertyValue('padding-top'));
        const paddingBottom = parseInt(getComputedStyle(target).getPropertyValue('padding-bottom'));
        const verticalPadding = paddingTop + paddingBottom;

        target.style.height = 0;
        target.style.height = Math.max(target.scrollHeight - verticalPadding, this.state.minHeight) + 'px';


   
        /* Remove unwanted spaces and new lines from the field */

        var str = target.value;
        str = str.replace(/ +/g, ' ');
        this.setState({ editorTitleContent: str });    
   
      
        
    }


    render() {
        const { editorState } = this.state;


        return (
            <section className="pt-1">
                <div id="container" className="editorView">
                    <div class="editorTitle">
                        <textarea
                            id="editorTitle"
                            maxLength="100"
                            placeholder="Title"
                            onChange={this.resizeTextArea}
                            value={this.state.editorTitleContent}
                            style={{ minHeight: this.state.minHeight}}
                            onKeyPress={this.titleOnKeypress}
                        />

                    </div>

                    <div className="editorBody" data-placeholder="Type some text">
                        <Editor
                            ref={this.refsEditor}
                            editorState={editorState}
                            onChange={this.onChange}
                             />
                    </div>
                </div>
            </section>
        );
    }
};

export default EditorComp