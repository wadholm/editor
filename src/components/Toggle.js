import React from 'react'

const Toggle = (props) => {

    const toggleMode = () => {
        var result = document.getElementsByClassName("switch-input")[0].checked ? 'On' : 'Off'
        // console.log(result);
        if (result === "On") {
            props.darkMode();
        } else {
            props.resetDarkMode();
        }

    }

    return (
        <>
        <div data-testid="toggle" className="toggle">
        <label className="switch switch-flat">
        	<input className="switch-input" type="checkbox" onClick={toggleMode}/>
        	<span className="switch-label" data-on="Codemode On" data-off="Codemode Off"></span> 
        	<span className="switch-handle"></span> 
        </label>
        </div>
        </>
    );
}

export default Toggle
