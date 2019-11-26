import React from "react"
import PropTypes from "prop-types"
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { BrowserRouter as  Router, Route } from 'react-router-dom'

//Pages
import Listings from "./Listings"
import About from "./About"

class MainApp extends React.Component {
  constructor(props){
    super(props)
    this.state={
      apartments: [],
    }
    this.getApartments()
  }

  
  

getApartments = () =>{
    fetch("/apartments")
    .then( response =>{
      return response.json()
    })
    .then( apts=>{
      this.setState({apartments:apts})
    })
}


  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route
      } = this.props
     const{apartments} = this.state
      return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Apartment Finder</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                  <ul className="navbar-nav mr-auto">
                    
                    <li className="nav-item">
                      <a className="nav-link" href="/listings">Listings</a>
                    </li>
                   
                    <li className="nav-item">
                      <a className="nav-link" href="/about">About</a>
                    </li>
                   
                    <li className="nav-item">
                      <a className="nav-link" href="#"></a>
                    </li>
                    
                    <li className="nav-item">
                      <a className="nav-link">
                        <div>
                          {logged_in &&
                          <div>
                              <a href={sign_out_route}>Sign Out</a>
                          </div>
                          }
                            {!logged_in &&
                          <div>
                              <a href={sign_in_route}>Sign In</a>
                            </div>
                          }
                        </div>
                        </a>

                    </li>
                  
                  </ul>
                </div>
              </nav>
            
            <Route exact path="/listings" render = {(props) => <Listings {...props} apartments = {apartments} />} />
            <Route path="/about" exact component={About} />

        </div>
      </Router>
    );
  }
}

export default MainApp
