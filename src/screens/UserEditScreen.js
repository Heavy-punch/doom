import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function UserEditScreen(props) {
    const history = useHistory();
    const userId = props.match.params.id;

    const [avatar, setavatar] = useState([]);
    const [gender, setGender] = useState('');
    const [is_active, setIs_active] = useState('');

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    console.log(is_active);

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/users');
        }
        if (!user || user.ShID !== userId) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(detailsUser(userId));
        }
        dispatch({ type: USER_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setGender(user.gender);
            setIs_active(user.is_active);
        }
    }, [loading,]);

    const submitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        if (avatar.length > 0) {
            formData.append('avatar', avatar[avatar.length - 1]);
        }
        formData.append('gender', gender);
        formData.append('is_active', is_active ? 1 : 0);
        dispatch(
            updateUser(
                formData,
                userId,
            )
        );

    };
    const onChangeImage = (e) => {
        setavatar([...avatar, e.target.files[0]]);
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Sửa Thông Tin Người Dùng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label className="form-label" >hình ảnh:</label>
                                            <input
                                                type="file"
                                                className="form-control-file border"
                                                name="image"
                                                onChange={onChangeImage}
                                            // onChange={(e) => setImage(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">giới tính:</label>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === "male"} />
                                                    nam
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === "female"} />
                                                    nữ
                                                </label>
                                            </div>
                                            <div className="radio">
                                                <label>
                                                    <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} checked={gender === "other"} />
                                                    khác
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group chkb">
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                value={is_active}
                                                checked={is_active}
                                                onChange={(e) => setIs_active(e.target.checked)}
                                            />
                                            <label htmlFor="is_active" className="form-label">kích hoạt</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary fr">sửa thông tin người dùng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default UserEditScreen;