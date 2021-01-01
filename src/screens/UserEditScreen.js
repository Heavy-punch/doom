import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSupplier, detailsSupplier, updateSupplier } from '../actions/supplierActions';
import { SUPPLIER_CREATE_RESET, SUPPLIER_UPDATE_RESET } from '../constants/supplierConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function UserEditScreen(props) {
    const history = useHistory();
    const supplierId = props.match.params.id;

    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [Tax_ID, setTax_ID] = useState('');

    const supplierDetails = useSelector((state) => state.supplierDetails);
    const { loading, error, supplier } = supplierDetails;

    console.log(supplierId);

    const supplierUpdate = useSelector((state) => state.supplierUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = supplierUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: SUPPLIER_UPDATE_RESET });
            props.history.push('/suppliers');
        }
        if (!supplier || supplier.ShID !== supplierId) {
            dispatch({ type: SUPPLIER_UPDATE_RESET });
            dispatch(detailsSupplier(supplierId));
        }
        dispatch({ type: SUPPLIER_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setName(supplier.name);
            setEmail(supplier.Email);
            setAddress(supplier.Address);
            setTelephoneNumber(supplier.telephoneNumber);
            setTax_ID(supplier.Tax_ID);

        }
    }, [loading,]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateSupplier({
                SupID: supplierId,
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
                    <h2>Sửa Nhà Cung Cấp</h2>
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
                                        <button type="submit" className="btn btn-primary fr">Sửa nhà cung cấp</button>
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