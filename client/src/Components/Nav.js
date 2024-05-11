import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Nav(){
    const handle=sessionStorage.getItem('handle')
    const Nav = useNavigate();
    const handleClick=()=>{Nav("/problemset")}

    const logout=()=>{
        sessionStorage.clear();
        Nav('/')
    }
    return(
        <div className='nav-wrapper'>
        <nav className='navbar'>
            <ul className='nav-content'>
                <li onClick={handleClick}>PROBLEMSET</li>
                <li onClick={()=>Nav('/submissions')}>MY SUBMISSIONS</li>
                <li onClick={()=>{Nav('/ide')}}>IDE</li>
            </ul>
                <div onClick={logout}>Logout</div>
                <div>{handle}</div>
        </nav>
        </div>
    )
}