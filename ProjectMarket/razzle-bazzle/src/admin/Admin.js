import React from 'react';
import {Link} from 'react-router-dom';

import '../static/css/admin.css';


function Admin(){


    return(
        <div className="home">
            <div className="admin-picks-wrapper">
               <div className="pick">
                  <Link to='/admin/up-for-picks'>UP FOR PICKS</Link>
               </div>
               <div className="pick">
                  <Link to='/admin/picked'>PICKED</Link>
               </div>
            </div>
        </div>
    )
}

export default Admin;