import React from 'react';

// import { Container } from './styles';

function ShelfAddScreen() {
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Kệ Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <form >
                        <div className="form-group">
                            <label className="form-label">tên kệ hàng:</label>
                            <input type="text" className="form-control" id="" placeholder="tên kệ hàng" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >kiểu kệ hàng:</label>
                            <input type="text" className="form-control" id="" placeholder="kiểu kệ hàng" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >vị trí đặt:</label>
                            <input type="text" className="form-control" id="" placeholder="vị trí đặt" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >trạng thái:</label>
                            <input type="text" className="form-control" id="" placeholder="trạng thái" />
                        </div>
                        <button type="submit" className="btn btn-primary fr">thêm kệ hàng</button>
                        <button type="submit" className="btn btn-warning fr mr-3">hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShelfAddScreen;