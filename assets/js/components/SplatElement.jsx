import React from 'react'

export default ({ name, image, vote }) => (
    <div className='splatelement' onClick={vote}>
        <div className='splatelement-content'>
            <div
                className='splatelement-image'
                style={{ backgroundImage: `url(${image})` }}
            >
                &nbsp;
            </div>
            <div className='splatelement-text'>{name}</div>
            <div className='splatelement-dimlayer' />
        </div>
    </div>
)
