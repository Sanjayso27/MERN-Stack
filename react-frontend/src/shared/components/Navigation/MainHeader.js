import React from 'react'

import './MainHeader.css'
const MainHeader = props => {
    return (
        <header className='main-header'>
            {/* special props,always refer to things passed between the opening and closing tags of this component in where it's is used*/}
            {props.children}
        </header>
    )
}

export default MainHeader
