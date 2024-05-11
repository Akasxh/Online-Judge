import React from 'react';
import Nav from './Nav';
import Editor from './Editor';
import Statement from './Statement';
import { useLocation,useParams } from 'react-router-dom';
import SubEditor from './SubEditor';

function Problem(){
    const location = useLocation();
    const {name , description, code, lang} = location.state;
    const {id} = useParams();

    return(
        <div className='main-wrapper'>
            <Nav/>
            <div className='main-content'>
              <Statement name={name} description={description}/>
              {(code===undefined)?<Editor id={id} name={name}/>:<SubEditor id={id} name={name} codecontent={code} lang={lang}/>}
            </div>
        </div>
    )
}

export default Problem;