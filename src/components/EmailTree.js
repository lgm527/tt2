import React from 'react';
import emailjs from 'emailjs-com';
import '../style/EmailTree.scss';

export default class EmailTree extends React.Component {

  state = {
    email: '',
    complete: false
  }

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === '') {
      window.alert('* Please provide an email address *')
    } else {
    const templateParams = {
     email: this.state.email,
     species: this.props.species,
     address: this.props.address
    };
    emailjs.send('Gmail', 'EmailTreeDetails', templateParams, process.env.REACT_APP_EMAIL_KEY)
       .then((response) => {
           window.alert(`${this.props.species} is sent 🙂`);
           this.setState({complete: true, email: ''})
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
          <label>Email: </label>
          <input type='email' placeholder='Email' name='email' id='email' value={this.state.email} onChange={this.onChange} />
          <input type='submit' value='Send' />
        </form>
      </div>
    )
  }
}
