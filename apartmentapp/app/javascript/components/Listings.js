import React, { Component } from 'react'
import {Link} from "react-router-dom"



 class Listings extends Component {
   render() {
     const {apartments} = this.props
     let apt = apartments.map(apt => {
       return <li key = {apt.id}>{apt.address} : {apt.location} {apt.zipcode} {apt.description} {apt.cost}
       <div><Link to={`/apartments/${apt.id}`}>Show Details</Link></div>
       </li>
     })
     return(
       <ul className = "list">
         <h3>{apt}</h3>
       </ul>
    );
   }
 }

export default Listings