import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { authActions } from '../store/auth';

import classes from './Auth.module.css';

const Auth = () => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (password.length >= 6 && email.includes('@')) {
      setIsValid(true)
    }
    else {
      setIsValid(false)
    }
  }, [email, password])

  const dispatch = useDispatch()

  const loginHandler = (e) => {
    e.preventDefault()

    if (password.length < 6 || !email.includes('@') ) {
      return
    }
    dispatch(authActions.login())
  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler} >
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' placeholder="Valid Email" value={email} onChange={(event) => { setEmail(event.target.value) }}  />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' placeholder="6 digits min" value={password} onChange={(event) => { setPassword(event.target.value) }} />
          </div>
          {isValid && <button className="btn" >Login</button>}
          {!isValid && <button className="disabled" >Login</button>}
        </form>
      </section>
    </main>
  );
};

export default Auth;
