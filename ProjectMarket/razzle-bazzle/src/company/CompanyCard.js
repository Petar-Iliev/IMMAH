import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/companycard.css';
import face from '../static/svgs/emojis/angry.svg'
function CompanyCard({author,date,id,msg,emoji}){


  

    return(
      
             <article className="company-card">
        <header className="card-header">
          <p>{date.split('T')[0].split('-').join(' ')}</p>
          
    <Link to={`/post/${id}`}>{msg.length<1 && 'POST'} {msg.slice(0,40)}{msg.length>40 && '...'}</Link>
        </header>

        <div className="card-author">
          <a className="author-avatar" href="#">
            <img src={emoji} />
          </a>
          <svg className="half-circle" viewBox="0 0 106 57">
            <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
          </svg>

           {/* <Face className='half-circle'/> */}
          <div className="author-name">
            <div className="author-name-prefix">Author</div>
            {author}
          </div>
        </div>
        {/* <div className="tags">
          <span href="#">html</span>
          <span href="#">css</span>
          <span href="#">web-dev</span>
        </div> */}
      </article>
      
    )
}

export default CompanyCard;