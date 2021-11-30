import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { CreateUser } from '../views/CreateUser';
import { CreateBook } from '../views/CreateBook';
import { RentBooks } from '../views/RentBooks';
import '../styles/general.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createUser" component={CreateUser} />
        <Route exact path="/createBook" component={CreateBook} />
        <Route exact path="/rentBooks" component={RentBooks} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Switch>
    </Router>

  );
}

export default App;