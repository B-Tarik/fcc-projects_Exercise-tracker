import React, {useState} from 'react';

import User from './user.jsx';
import Exercise from './exercise.jsx';
import Output from './output.jsx';
import AppTitle from './common/appTitle.jsx';

const Home = ({history}) => {
  
  const [result, setResult] = useState('');
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Exercise Tracker REST API</h1>} />
      <User setResult={setResult}/>
      <Exercise setResult={setResult}/>
      <Output result={result} />
      
    </div>
  );
  
}

export default Home;