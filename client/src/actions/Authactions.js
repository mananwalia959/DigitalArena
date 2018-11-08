import axios from 'axios';


export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] ='Bearer '+ token;
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

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};



