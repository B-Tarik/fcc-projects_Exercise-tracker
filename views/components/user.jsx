import React, {useState} from 'react';

const User = ({setResult}) => {
  
  const [userId, setUserId] = useState('');
  
  const url = "https://fcc-bt-exercise-tracker.glitch.me/api/exercise/";
  
  const createUser = e => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    
    var obj = {};
    data.forEach((value, key) => obj[key] = value);
    
    fetch(url + 'new-user', {
      method: 'POST', 
      body: JSON.stringify(obj),
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then((data) => {
      
      document.getElementById('output').scrollIntoView();
      setResult(data)

    })
    .catch(error => console.error('Error:', error));

    e.target.reset();

  }
  
  const getAllUsers = e => {
    e.preventDefault();
    
    fetch(url + 'users')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      
      document.getElementById('output').scrollIntoView();
      setResult(data)
      
    })
    .catch(error => console.error('Error:', error));
  }
  
  return (
    <div className="submit-user">
      
      <h3>Create a New User</h3>
      <div className="form-container">
        <form  className="submit-user-form-1" onSubmit={createUser}>
          <input className="form-user" id="uname" type="text" name="username" placeholder="username" required/>
          <input className="form-submit" type="submit" value="Submit"/>
        </form>
      </div>
      
      <h3>Get All users:</h3>
      <div className="form-container">
        <form className="submit-user-form-2" onSubmit={getAllUsers}>
          <input className="form-submit" type="submit" value="Submit"/>
        </form>
      </div>

    </div>
  )
}

export default User;