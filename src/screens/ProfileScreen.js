import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { changePassword, profileUser, updateMe } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_CHANGEPASSWORD_RESET, USER_UPDATE_ME_RESET } from '../constants/userConstants';



// import { Container } from './styles';

function ProfileScreen(props) {
    const [avatar, setAvatar] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const userProfile = useSelector((state) => state.userProfile);
    const { loading, error, profile } = userProfile;

    const userChangePassword = useSelector((state) => state.userChangePassword);
    const {
        loading: loadingChangePassword,
        error: errorChangePassword,
        success: successChangePassword,
    } = userChangePassword;

    const userUpdateMe = useSelector((state) => state.userUpdateMe);
    const {
        loading: loadingUpdateMe,
        error: errorUpdateMe,
        success: successUpdateMe,
    } = userUpdateMe;

    console.log(avatar);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileUser());
    }, [dispatch, successUpdateMe]
    );

    useEffect(() => {
        if (successChangePassword) {
            dispatch({ type: USER_CHANGEPASSWORD_RESET });
            props.history.goBack();
        }
        if (successUpdateMe) {
            dispatch({ type: USER_UPDATE_ME_RESET });
            setAvatar([]);
        }
        dispatch({ type: USER_UPDATE_ME_RESET });
        dispatch({ type: USER_CHANGEPASSWORD_RESET });
    }, [successChangePassword, successUpdateMe, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword({
            oldPassword,
            newPassword,
            confirmPassword: reNewPassword,
        }));
    };
    const submitAvatar = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('avatar', avatar[avatar.length - 1]);
        dispatch(
            updateMe(
                formData
            )
        );

    }
    const onChangeAvatar = (e) => {
        setAvatar([...avatar, e.target.files[0]]);
    };
    return (
        <div className="container-fluid">
            <button type="button" className="btn btn-primary" onClick={() => props.history.goBack()}>quay lại</button>
            {loading ? (<LoadingBox></LoadingBox>)
                : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    : (
                        <>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">

                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                    <ul>
                                        <li className="user avatar-lager">
                                            {/* {(profile.avt_url !== null) ? <img src={profile.avt_url} alt={profile.FName} /> : <img src="./images/user1.png" alt="asfas" />} */}
                                            <form onSubmit={submitAvatar}>
                                                <label htmlFor="upload-photo">{(profile.avt_url !== null) ? <img src={profile.avt_url} alt={profile.FName} /> : <img src="./images/user1.png" alt="asfas" />}</label>
                                                <input type="file" name="photo" id="upload-photo" onChange={onChangeAvatar} />
                                                {avatar.length > 0 && <button type="submit">thay đổi?</button>}
                                            </form>
                                            {loadingUpdateMe && <LoadingBox></LoadingBox>}
                                            {errorUpdateMe && <MessageBox variant="danger">{errorUpdateMe}</MessageBox>}
                                        </li>
                                        <li>tên: {profile.FName}</li>
                                        <li>accountName: {profile.accountName}</li>
                                        <li>địa chỉ: {profile.Address}</li>
                                        <li>email: {profile.email}</li>
                                        <li>số điện thoại: {profile.telephoneNumber}</li>
                                        <li>loại người dùng: {profile.managerType}</li>
                                        <li>ngày bắt đầu làm việc: {(profile.date_start_working).split("-").reverse().join("-")}</li>
                                    </ul>
                                </div>

                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label className="form-label">password:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="password"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">password mới:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="password mới"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">nhập lại password mới:</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="nhập lại password mới"
                                                value={reNewPassword}
                                                onChange={(e) => setReNewPassword(e.target.value)}
                                            />
                                        </div>
                                        {errorChangePassword && <MessageBox variant="danger">{errorChangePassword}</MessageBox>}
                                        <button
                                            type="submit"
                                            className="btn btn-primary fr"
                                        >
                                            đổi password
                                        </button>
                                        {loadingChangePassword && <LoadingBox></LoadingBox>}
                                    </form>
                                </div>
                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">

                                </div>
                            </div>

                        </>
                    )
            }
        </div>
    );
}

export default ProfileScreen;






