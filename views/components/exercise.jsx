import React, {useState} from 'react';
import queryString from 'query-string';

const Exercise = ({setResult}) => {
  
  const [userId, setUserId] = useState('');
  
  const url = "https://fcc-bt-exercise-tracker.glitch.me/api/exercise/";
  
  const handleSubmit = e => {
    e.preventDefault();
    window.location.href = "https://fcc-bt-exercise-tracker.glitch.me/api/exercise/users";
  }
  
  const addExercise = e => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    
    var obj = {};
    data.forEach((value, key) => obj[key] = value);
    
    fetch(url + 'add', {
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
  
  const getUserLog = e => {
    e.preventDefault();
    
    const data = new FormData(e.target);
    
    var obj = {};
    data.forEach((value, key) => obj[key] = value);
    
    const stringified = queryString.stringify(obj);
    
    fetch(url + 'log?' + stringified)
    .then(res => res.json())
    .then((data) => {
      
      document.getElementById('output').scrollIntoView();
      setResult(data)

    })
    .catch(error => console.error('Error:', error));

    e.target.reset();

  }
  
  
  
  return (
    <div className="submit-exercie">
      
      <h3>Add exercises</h3>
      <div className="form-container">
        <form className="submit-exercie-form-1" onSubmit={addExercise}>
          <input className="form-exercie-1" id="uid" type="text" name="userId" placeholder="userId*" required/>
          <input className="form-exercie-2" id="desc" type="text" name="description" placeholder="description*" required/>
          <input className="form-exercie-3" id="dur" type="number" name="duration" placeholder="duration* (mins.)" min="1" max="120" required/>
          <input className="form-exercie-4" id="dat" type="date" name="date" placeholder="date (yyyy-mm-dd)"/>
          <input className="form-submit" type="submit" value="Submit"/>
        </form>
      </div>
      
      <h3>Get user log</h3>
      <div className="form-container">
        <form className="submit-exercie-form-2" onSubmit={getUserLog}>
          <input className="form-exercie-1" type="text" name="userId" placeholder="userId*" required/>
          <input className="form-submit" type="submit" value="Submit"/>
        </form>
      </div>
      
      <h3>Get user log by date</h3>
      <div className="form-container">
        <form className="submit-exercie-form-1" onSubmit={getUserLog}>
          <input className="form-exercie-1" type="text" name="userId" placeholder="userId*" required/>
          <input className="form-exercie-2" type="date" name="from" placeholder="from" />
          <input className="form-exercie-3" type="date" name="to" placeholder="to" />
          <input className="form-exercie-4" type="number" name="limit" placeholder="limit" />
          <input className="form-submit" type="submit" value="Submit"/>
        </form>
      </div>
      
    </div>
  )
}

export default Exercise;