import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSupplier, createUser } from '../actions/userActions';
import { USER_CREATE_RESET } from '../constants/userConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function UserAddScreen(props) {
    const history = useHistory();
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [password, setPassword] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [BDay, setBDay] = useState('');
    const [gender, setGender] = useState('');
    const [salary, setSalary] = useState('');
    const [date_start_working, setDate_start_working] = useState('');
    const [managerType, setManagerType] = useState('normal');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const userCreate = useSelector((state) => state.userCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = userCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: USER_CREATE_RESET });
            props.history.push('/users');
        }
        dispatch({ type: USER_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createUser({
                FName,
                LName,
                accountName,
                password,
                telephoneNumber,
                Address,
                BDay,
                gender,
                salary,
                date_start_working,
                managerType,
                email,
            })
        );

    };
    // const onChangeImage = (e) => {
    //     // console.log('image: ', image);
    //     setImage([...image, e.target.files[0]]);
    //     // setImage(e.target.files[0]);
    //     // console.log('image: ', image);
    //     // console.log(image);
    // };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Người Dùng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    {loadingCreate && <LoadingBox></LoadingBox>}
                    {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
                    <form onSubmit={submitHandler}>
                        <div className="form-group">
                            <label className="form-label">Họ:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="họ"
                                value={LName}
                                onChange={(e) => setLName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">tên đệm & tên:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="tên đệm & tên"
                                value={FName}
                                onChange={(e) => setFName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Tên tài khoản:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="tên tài khoản"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">số điện thoại:</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="số điện thoại"
                                value={telephoneNumber}
                                onChange={(e) => setTelephoneNumber(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">địa chỉ:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="địa chỉ"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >ngày sinh:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={BDay}
                                onChange={(e) => setBDay(e.target.value)}
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
                        <div className="form-group">
                            <label className="form-label">Lương:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="lương"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Ngày bắt đầu làm việc:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={date_start_working}
                                onChange={(e) => setDate_start_working(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >loại người dùng:</label>
                            <select
                                type="text"
                                className="form-control"
                                name="managertype"
                                value={managerType}
                                onChange={(e) => setManagerType(e.target.value)}
                            >
                                <option value="prime">nâng cao</option>
                                <option value="normal">bình thường</option>
                            </select>
                        </div>



                        <button type="submit" className="btn btn-primary fr">thêm người dùng</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                        {loadingCreate && <LoadingBox></LoadingBox>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserAddScreen;




