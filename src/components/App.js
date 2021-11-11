import Board from './Board';
import {Switch, Route, Redirect } from "react-router-dom"
import '../css/mooddetail.css'
import '../css/moodboard.css'

function App() {
  return (
    <div className="moodboard">
      <Switch>
          <Route exact path='/home/' component={Board} ></Route>
          <Route path='*' exact component={Board} />
        </Switch>
    </div>
  );
}

export default App;
