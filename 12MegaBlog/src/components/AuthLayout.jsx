// import React, {useEffect, useState} from 'react'
// import {useSelector} from 'react-redux'
// import {useNavigate} from 'react-router-dom'

// export default function Protected({children, authentication = true}) {

//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(true)
//     const authStatus = useSelector(state => state.auth.status)

//     useEffect(() => {
//         //TODO: make it more easy to understand

//         // if (authStatus ===true){
//         //     navigate("/")
//         // } else if (authStatus === false) {
//         //     navigate("/login")
//         // }
        
//         //let authValue = authStatus === true ? true : false

//         if(authentication && authStatus !== authentication){
//             navigate("/login")
//         } else if(!authentication && authStatus !== authentication){
//             navigate("/")
//         }
//         setLoader(false)
//     }, [authStatus, navigate, authentication])

//   return loader ? <h1>Loading...</h1> : <>{children}</>
// }

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    const isAuthenticated = authStatus === true;
    console.log("authStatus:", authStatus);
    console.log("authentication required:", authentication);

    // if (authentication && !isAuthenticated) {
    //   // Protected route, user not logged in
    //   navigate('/login');
    // } else if (!authentication && isAuthenticated) {
    //   // Public route (like login/signup), but user already logged in
    //   navigate('/');
    // } else {
    //   setLoader(false); // Allowed to access
    // }

    if (authStatus === null) return; // wait for store to hydrate

  if (authentication && authStatus !== authentication) {
    navigate("/login");
  } else if (!authentication && authStatus !== authentication) {
    navigate("/");
  }

  setLoader(false);
    
  }, [authStatus, navigate, authentication]);
  console.log("authStatus:", authStatus)
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
