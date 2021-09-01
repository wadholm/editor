
import React, {Component} from 'react'
import { Editor } from "@tinymce/tinymce-react";
import Toolbar from './Toolbar'


class App extends Component {
  initialState = {
    text: "",
  }

  state = this.initialState

  handleEditorChange = (e) => {
    // console.log(
    //   "Content was updated: ",
    //   e.target.getContent()
    // );
    this.setState({text: e.target.getContent()})
  }

  handleSave = () => {
    console.log(this.state.text.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' '));
  }

  render() {
    const { text } = this.state.text
    return (
      <div className="container">
        <Toolbar handleSave={this.handleSave} />
        <Editor
        apiKey="ghjg81e9b3or0nb7gu2jzett3idmypu5en8xwqlf948upxya"
        initialValue= {text}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            // eslint-disable-next-line no-multi-str
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={this.handleEditorChange}
      />
      </div>
    )
  }
}

export default App
