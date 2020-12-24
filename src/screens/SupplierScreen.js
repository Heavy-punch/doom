import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listsuppliers } from '../actions/supplierActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

// import { Container } from './styles';

function SupplierScreen() {
    const history = useHistory();
    const dispatch = useDispatch();
    const supplierList = useSelector((state) => state.supplierList);
    const { loading, error, suppliers } = supplierList;
    useEffect(() => {
        dispatch(listsuppliers());
    }, [dispatch]);
    // console.log(suppliers);
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Nhà Cung Cấp</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            type="text"
                            name="search-bar"
                            className="form-control"
                        />
                        <span className="input-group-btn">
                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="fa fa-search mr-3" aria-hidden="true"></i>
                                tìm kiếm
                            </button>
                        </span>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {suppliers.length === 0 && <MessageBox>No supplier Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>stt</th>
                                                <th>id</th>
                                                <th>tên</th>
                                                <th>email</th>
                                                <th>địa chỉ</th>
                                                <th>số điện thoại</th>
                                                <th>mã số thuế</th>
                                                <th>thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {suppliers.map((supplier, index) => (
                                                <tr key={supplier.SupID}>
                                                    <td>{index + 1}</td>
                                                    <td>{supplier.SupID}</td>
                                                    <td>{supplier.name}</td>
                                                    <td>{supplier.Email}</td>
                                                    <td>{supplier.Address}</td>
                                                    <td>{supplier.telephoneNumber}</td>
                                                    <td>{supplier.Tax_ID}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-warning m-10">sửa</button>
                                                        <button type="button" className="btn btn-danger m-10">xóa</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            )}
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/suppliers/add`))}>thêm nhà cung cấp</button>
                </div>
            </div>
        </div>
    );
}

export default SupplierScreen;