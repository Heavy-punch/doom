import React from 'react';

// import { Container } from './styles';

function CategoryAddScreen() {
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Ngành Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <form >
                        <div className="form-group">
                            <label className="form-label">tên ngành hàng:</label>
                            <input type="text" className="form-control" id="" placeholder="tên ngành hàng" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >hình ảnh:</label>
                            <input type="file" className="form-control-file border" name="file" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" >danh sách kệ hàng:</label>
                            <input type="text" className="form-control" id="" placeholder="danh sách kệ hàng" />
                            <small id="emailHelp" className="form-text text-muted">ID cách nhau một khoảng trống</small>
                        </div>

                        <button type="submit" className="btn btn-primary fr">thêm ngành hàng</button>
                        <button type="submit" className="btn btn-warning fr mr-3">hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoryAddScreen;