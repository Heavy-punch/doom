import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { profileUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



// import { Container } from './styles';

function ProfileScreen(props) {
    const userProfile = useSelector((state) => state.userProfile);
    const { loading, error, profile } = userProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileUser());
    }, [dispatch]
    );
    return (
        <div className="container-fluid">
            <button type="button" className="btn btn-primary" onClick={() => props.history.goBack()}>quay lại</button>
            {loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <>
                            <ul>
                                <li>{profile.FName}</li>
                                <li>{profile.accountName}</li>
                                <li>{profile.Address}</li>
                            </ul>
                        </>
                    )
            }
        </div>
    );
}

export default ProfileScreen;



