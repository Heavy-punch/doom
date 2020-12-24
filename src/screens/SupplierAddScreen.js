import React from 'react';

// import { Container } from './styles';

function SupplierAddScreen() {
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
                    <form >
                        <div className="form-group">
                            <label className="form-label">tên nhà cung cấp:</label>
                            <input type="text" className="form-control" id="" placeholder="tên nhà cung cấp" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">địa chỉ:</label>
                            <input type="text" className="form-control" id="" placeholder="địa chỉ" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">email:</label>
                            <input type="text" className="form-control" id="" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã số thuế:</label>
                            <input type="text" className="form-control" id="" placeholder="MST" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">số điện thoại:</label>
                            <input type="text" className="form-control" id="" placeholder="số điện thoại" />
                        </div>
                        <button type="submit" className="btn btn-primary fr">thêm nhà cung cấp</button>
                        <button type="submit" className="btn btn-warning fr mr-3">hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SupplierAddScreen;