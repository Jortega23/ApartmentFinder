import React from "react"
import {Redirect} from 'react-router-dom'

export default class NewListing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                address: "",
                location: ""
            },
            createSucess: false
        }
    }

    localSubmit = () => {
        const{onSubmit} = this.props
        const{form} = this.state
        onSubmit(form).then(() => {
            this.setState({createSucess: true})
        })
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }
    

    render () {
        const{form, createSucess} = this.state
        const{address, location} = form
        return (
          <React.Fragment>
              {createSucess ? <Redirect to="/listings/" />: null}
              <h1>New Apartment</h1>
              <div>
                  <label>Address</label>
                  <input name="address" value = {address} onChange = {this.onChange} type = 'text' />
              </div>
              <div>
                <label>City</label>
                <input name="location" value = {location} onChange = {this.onChange} type = 'text' />
              </div>
              <button onClick={this.localSubmit}>Submit</button>
          </React.Fragment>
        );
    }
}