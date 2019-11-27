import React from "react"
import PropTypes from "prop-types"
import "bootswatch/dist/journal/bootstrap.min.css";
import { BrowserRouter as  Router, Route } from 'react-router-dom'

//Pages
import Listings from "./Listings"
import About from "./About"
import NewListing from "./NewListing"

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

        addListing = (attrs) => {
      return fetch("/apartments", {
          method: 'POST',
          headers: {
              "Content-type":"application/json"
          },
          body: JSON.stringify({apartment:attrs})
      }).then(response => {
          if(response.status === 201){
              this.getApartments()
          }
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
                  <a className="navbar-brand" href="/home/">App_artment Finder</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <a className="nav-link" href="/listings/">Listings</a>
                      </li>
                      {!logged_in ? null:
                      <li className="nav-item">
                        <a className="nav-link" href="/newlisting/">New Listing</a>
                      </li>}
                      <li className="nav-item">
                        <a className="nav-link" href="/about/">About</a>
                      </li>
                    </ul>
                  </div>
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
                </nav>
            
            <Route exact path="/listings" render = {(props) => <Listings {...props} apartments = {apartments} />} />
            {!logged_in ? null : <Route path = "/newlisting" render = {(props) => <NewListing {...props} onSubmit = {this.addListing}/>} />}
            <Route path="/about" exact component={About} />

        </div>
      </Router>
    );
  }
}

export default MainApp
