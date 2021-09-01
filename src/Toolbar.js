
import React, {Component} from 'react'


class Toolbar extends Component {

  saveMe = () => {
    this.props.handleSave(this.state)
  }

  render() {
    return (
    <div className="toolbar">
      <i onClick={this.saveMe} className="material-icons">save</i>
    </div>
    )
  }
}


export default Toolbar
