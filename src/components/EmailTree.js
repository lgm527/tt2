import React from 'react';
import emailjs from 'emailjs-com';
import '../style/EmailTree.scss';

export default class EmailTree extends React.Component {

  state = {
    name: '',
    email: '',
    complete: false
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault();

    const diam = this.props.tree.stump_diam === '0' ? this.props.tree.tree_dbh : this.props.tree.stump_diam;

    if (this.state.name === '' || this.state.email === '') {
      window.alert('* Whoops, something in the form is blank *')
    } else {
    const templateParams = {
     name: this.state.name,
     email: this.state.email,
     species: this.props.tree.spc_common,
     address: this.props.tree.address,
     status: this.props.tree.status,
     health: this.props.tree.health,
     diameter: diam
    };
    emailjs.send('Gmail', 'EmailTreeDetails', templateParams, process.env.REACT_APP_EMAIL_KEY)
       .then((response) => {
           window.alert(`${this.props.tree.spc_common} is sent 🙂`);
           this.setState({name: '', email: '', complete: true})
       }, (error) => {
           window.alert('Contact unsuccessful because: ', error);
      });
    }
  }

  onClick = () => {
    this.setState({complete: false})
  }


  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Name: </label>
          <input type='text' placeholder='your name' name='name' id='name' value={this.state.name} onChange={this.onChange} />
          <label>Email: </label>
          <input type='email' placeholder='email address' name='email' id='email' value={this.state.email} onChange={this.onChange} />
          <input type='submit' value='send'/>
        </form>
      </div>
    )
  }
}





// Hey there, {{name}} has shared a tree with you!
// The {{species}} at {{address}} needs some love, here are the details:
// Status: {{status}}
// Health: {{health}}
// Diameter: {{diameter}} inches
// Tree Care Tips: https://www.nycgovparks.org/trees/tree-care
//
// Sign up here to volunteer: https://www.milliontreesnyc.org/html/care/tree.shtml
//
// 🌳 & ❤️
