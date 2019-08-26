import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import AppTitle from './common/appTitle.jsx';

const CodeSolution = () => {
  
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Exercise Tracker REST API</h1>} />
      <div className="code-solution">
        <h2>Code Solution</h2>
        <ol>
          
          <li>I can create a user by posting form data username to <code>/api/exercise/new-user</code> and returned will be an object with <i>username</i> and <i>_id</i>.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q1}
          </SyntaxHighlighter>
          
          <li>I can get an array of all users by getting <code>api/exercise/users</code> with the same info as when creating a user.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q2}
          </SyntaxHighlighter>
          
          <li>I can add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to <code>/api/exercise/add</code>. If no date supplied it will use current date. Returned will the the user object with also with the exercise fields added.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q3}
          </SyntaxHighlighter>
          
          <li>I can retrieve a full exercise log of any user by getting <code>/api/exercise/log</code> with a parameter of userId(_id). Return will be the user object with added array log and count (total exercise count).</li>
          
          <li>I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)</li>
        
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q4}
          </SyntaxHighlighter>
          
        </ol>
      </div>   
      
    </div>
  );
}


 const q1 = `// POST - /api/exercise/new-user
exports.createUser = async (req, res, next) => {
  try {
    const {username} = req.body
    const user = await db.Users.create({username});
    
    return res.json({
      username: user.username,
      _id: user._id
    })
     
  } catch (err) {
    if(err.code == 11000) {
      // if username already exist
      return next({status: 400, message: 'username already taken'})
    } 
    return next(err)
  }
};`
  
  const q2 = `// GET - /api/exercise/users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.Users.find();
    return res.json(users);
  } catch (error) {
    return next(error);
  }
};`
  
  const q3 = `// POST - /api/exercise/add
exports.addExercise = async (req, res, next) => {
  try {
    const user = await db.Users.findById(req.body.userId);
    
    if(!user) return next({status: 400, message: 'unknown _id'})
    
    const exercise = new db.Exercises(req.body)
    exercise.username = user.username
    
    const saveEx = await exercise.save();
    
    res.json({
      _id: saveEx.userId,
      description: saveEx.description,
      duration: saveEx.duration,
      date: saveEx.date.toDateString(),
      username: saveEx.username
    })
     
  } catch (err) {
    return next(err)
  }
};`

  const q4 = `// prefix - /api/exercise/log?{userId}[&from][&to][&limit]
// { } = required, [ ] = optional
exports.logExercises = async (req, res, next) => {
  try {
    const from = new Date(req.query.from)
    const to = new Date(req.query.to)
    const user = await db.Users.findById(req.query.userId);
    
    if(!user) return next({status: 400, message: 'unknown userId'})
    
    const exercises = await db.Exercises.find({
      userId: req.query.userId,
      date: {
        $lt: to == 'Invalid Date' ? Date.now() : to.getTime(),
        $gt: from == 'Invalid Date' ? 0 : from.getTime()
      }})
      .sort('-date')
      .limit(parseInt(req.query.limit));
  
    res.json({
      _id: req.query.userId,
      username: user.username,
      from : from == 'Invalid Date' ? undefined : from.toDateString(),
      to : to == 'Invalid Date' ? undefined : to.toDateString(),
      count: exercises.length,
      log: exercises.map(elm => ({
        description : elm.description,
        duration : elm.duration,
        date: elm.date.toDateString()
      }))
    })
     
  } catch (err) {
    return next(err)
  }
};
`

export default CodeSolution;