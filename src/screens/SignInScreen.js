import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function SignInScreen(props) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(account, password));
    };

    const userSignin = useSelector((state) => state.userSignin);
    const { loading, error } = userSignin;
    return (
        <div className="signin-form-wraper">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1><b>Sign In</b></h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="account">Account:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="account"
                        placeholder="Enter account"
                        required
                        onChange={(e) => setAccount(e.target.value)}
                    ></input>
                </div>
                <div className="mt-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div className="ali-end">
                    <button className="btn btn-primary mt-3" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignInScreen;




