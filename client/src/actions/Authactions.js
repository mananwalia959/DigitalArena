import axios from 'axios';


const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};



export const loginUser = userData =>dispatch => {
 
      const { token,name,email } = userData;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      console.log(name)
      // Set current user
      return (dispatch({
        type:'SET_CURRENT_USER',
        payload:{
          name,
          email
        }
      })
    );
    
    
};


// Set logged in user

export const setCurrentUser = user => {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  };
};




