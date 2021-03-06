import React, { Component } from 'react';
import style from './Form.module.css'
import './Form.css'
import ListPeople from './ListPeople/ListPeople';
import FillterForm from './FillterForm/FillterForm';
import ContactForm from './ContactForm/ContactForm';
import { CSSTransition } from 'react-transition-group'
import AlertModal from '../Alert/Alert'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import Actions from '../../Redux/Actions/Actions'
import contactOperation from '../../Redux/Operations/operations'
import selections from '../../Redux/Selections/selections'

const initialState = {
  name: '',
  number: '',
}

class App extends Component {
  state = {
    ...initialState
  }

  componentDidMount(){
    this.props.onGetContactOperation()
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const errorContacts = this.props.contacts

    if (errorContacts) {
      console.log(errorContacts.length, "errorContacts.lenght")
      const error = errorContacts.map(contact => contact)
      error.find(errorItem => errorItem.name === this.state.name && errorItem.number === this.state.number)
        ? this.alertShow()
        : this.props.onAddContacts({ name, number });
    }
    this.setState({ ...initialState })
  }

  alertShow = () => {
    this.props.onAlertError()
    setTimeout(() => this.props.onAlertError(), 5000)
  }

  render() {
    const { name, number } = this.state;
    const { alert } = this.props
    return (
      <>
        {alert && <CSSTransition
          classNames={style}
          in={true}
          appear={true}
          timeout={1500}
          unmountOnExit
        >
          <AlertModal />
        </CSSTransition>}
        <Form onSubmit={this.handleSubmit} className={style.formContainer}>
          <CSSTransition in={true} appear={true} classNames="title" timeout={1000} unmountOnExit>
            <h2>Phonebook</h2>
          </CSSTransition>
          <ContactForm handleChange={this.handleChange} name={name} number={number} />
          <FillterForm />
          <ListPeople />
        </Form>
      </>
    );
  }
}

const mapStateToProps = ({ state }) => {
  return {
    value: selections.getFilterSelection(state),
    alert: selections.getAlertSelection(state),
    contacts: selections.getContactSelection(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddContacts: (name, number) => dispatch(contactOperation.addContactOperation(name, number)),
    onAlertError: () => dispatch(Actions.alertError()),
    onGetContactOperation: () => dispatch(contactOperation.getContactOperation()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
