import React from 'react';

export default function Statement({name, description}){
    return (
        <section className='statement'>
            <h1>{name}</h1>
            <br/>
            <p>{description}</p>
        </section>
    )
}