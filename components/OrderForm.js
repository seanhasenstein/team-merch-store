import React, { useReducer, useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { emailIsValid } from '../utils';
import styles from '../styles/form.module.css';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  student: '',
  email: '',
  phone: '',
  fnError: '',
  lnError: '',
  studentError: '',
  emailError: '',
  phoneError: '',
  formError: '',
  honeypot: '',
  status: 'IDLE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value };
    case 'updateStatus':
      return { ...state, status: action.value };
    case 'updateErrorValue':
      return { ...state, [action.field]: action.value };
    default:
      return INITIAL_STATE;
  }
};

const OrderForm = () => {
  const orderContext = useContext(OrderContext);
  const { orderItems } = orderContext;
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: event.target.value,
    });
  };

  const updateStatus = value => {
    dispatch({
      type: 'updateStatus',
      value,
    });
  };

  const updateErrorValue = (field, value) => {
    dispatch({
      type: 'updateErrorValue',
      field,
      value,
    });
  };

  const validateForm = () => {
    let fnError, lnError, studentError, emailError, phoneError;

    if (!state.firstName) fnError = 'A first name is required.';
    if (!state.lastName) lnError = 'A last name is required.';
    if (!state.student) studentError = 'A student is required.';
    if (!state.email) emailError = 'An email address is required.';
    if (!state.phone) phoneError = 'A phone number is required.';
    if (state.email && !emailIsValid(state.email))
      emailError = 'A valid email address is required.';
    if (
      (state.phone && state.phone.replace(/\D/g, '').length < 10) ||
      state.phone.replace(/\D/g, '').length > 10
    )
      phoneError = 'A valid 10 digit phone number is required.';

    if (fnError || lnError || studentError || emailError || phoneError) {
      updateErrorValue('fnError', fnError);
      updateErrorValue('lnError', lnError);
      updateErrorValue('studentError', studentError);
      updateErrorValue('emailError', emailError);
      updateErrorValue('phoneError', phoneError);

      return false;
    }

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (state.honeypot) return;

    if (orderItems.length === 0) {
      updateErrorValue(
        'formError',
        'You must have at least 1 in your order to submit.',
      );

      return;
    }

    const isValid = validateForm();

    if (isValid) {
      updateStatus('PENDING');

      const { firstName, lastName, student, email, phone } = state;

      fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          student,
          email,
          phone,
          orderItems,
        }),
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

      updateStatus('SUCCESS');

      console.log('FORM SUBMISSION!', { state });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h3 className={styles.title}>Order Information</h3>
        <form
          className={styles.form}
          action="POST"
          onSubmit={handleSubmit}
          aria-label="submit order"
        >
          <div className={styles.group}>
            <div className={styles.half}>
              <label htmlFor="firstName">First name</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                id="firstName"
                value={state.firstName}
                onChange={updateFieldValue('firstName')}
              />
              {state.fnError ? (
                <div className={styles.error}>{state.fnError}</div>
              ) : null}
            </div>
            <div className={styles.half}>
              <label htmlFor="lastName">Last name</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                id="lastName"
                value={state.lastName}
                onChange={updateFieldValue('lastName')}
              />
              {state.lnError ? (
                <div className={styles.error}>{state.lnError}</div>
              ) : null}
            </div>
          </div>
          <label htmlFor="student">Student athlete</label>
          <input
            className="form-input"
            type="text"
            name="student"
            id="student"
            value={state.student}
            onChange={updateFieldValue('student')}
          />
          {state.studentError ? (
            <div className={styles.error}>{state.studentError}</div>
          ) : null}
          <label htmlFor="email">Email address</label>
          <input
            className="form-input"
            type="text"
            name="email"
            id="email"
            value={state.email}
            onChange={updateFieldValue('email')}
          />
          {state.emailError ? (
            <div className={styles.error}>{state.emailError}</div>
          ) : null}
          <label htmlFor="phone">Phone number</label>
          <input
            className="form-input"
            type="text"
            name="phone"
            id="phone"
            placeholder="(123) 456-7890"
            value={state.phone}
            onChange={updateFieldValue('phone')}
          />
          {state.phoneError ? (
            <div className={styles.error}>{state.phoneError}</div>
          ) : null}
          {/* TODO: add the honeypot! */}
          <button type="submit" disabled={state.status === 'PENDING'}>
            {state.status === 'PENDING' ? 'Loading...' : 'Submit Your Order'}
          </button>
          {state.formError ? (
            <div className={styles['form-error']}>{state.formError}</div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
