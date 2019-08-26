import React from 'react';
import AppTitle from './common/appTitle.jsx';

const UserStory = () => {
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Exercise Tracker REST API</h1>} />
      
      <div className="user-story" >
        <h2>User Story</h2>
        <ol>
          
          <li>I can create a user by posting form data username to <code>/api/exercise/new-user</code> and returned will be an object with <i>username</i> and <i>_id</i>.</li>
          
          <li>I can get an array of all users by getting <code>api/exercise/users</code> with the same info as when creating a user.</li>
          
          <li>I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to <code>/api/exercise/add</code>. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.</li>
          
          <li>I can retrieve a full exercise log of any user by getting <code>/api/exercise/log</code> with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).</li>
          
          <li>I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)</li>
        
        </ol>
      </div>      
      
    </div>
  );
}

export default UserStory;