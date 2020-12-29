import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSupplier } from '../actions/supplierActions';
import { SUPPLIER_CREATE_RESET } from '../constants/supplierConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function SupplierAddScreen(props) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [Tax_ID, setTax_ID] = useState('');

    const dispatch = useDispatch();
    const supplierCreate = useSelector((state) => state.supplierCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
    } = supplierCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: SUPPLIER_CREATE_RESET });
            props.history.push('/suppliers');
        }
        dispatch({ type: SUPPLIER_CREATE_RESET });
    }, [successCreate, dispatch, props.history]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createSupplier({
                name,
                Address,
                Tax_ID,
                Email,
                telephoneNumber
            })
        );

    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Nhà Cung Cấp</h2>
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
                            <label className="form-label">tên nhà cung cấp:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="tên nhà cung cấp"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            <label className="form-label">email:</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã số thuế:</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="MST"
                                value={Tax_ID}
                                onChange={(e) => setTax_ID(e.target.value)}
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
                        <button type="submit" className="btn btn-primary fr">thêm nhà cung cấp</button>
                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SupplierAddScreen;