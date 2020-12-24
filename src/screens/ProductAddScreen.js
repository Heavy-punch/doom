import React from 'react';

// import { Container } from './styles';

function ProductAddScreen() {
    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Sản Phẩm</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <form >
                        <div className="form-group">
                            <label className="form-label">tên sản phẩm:</label>
                            <input type="text" className="form-control" id="" placeholder="tên sản phẩm" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">hình ảnh:</label>
                            <input type="file" className="form-control-file border" name="file" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">giá nhập SP:</label>
                            <input type="text" className="form-control" id="" placeholder="giá nhập" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">giá bán SP:</label>
                            <input type="text" className="form-control" id="" placeholder="giá bán" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">thương hiệu:</label>
                            <input type="text" className="form-control" id="" placeholder="thuong hieu" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã số ngành hàng:</label>
                            <input type="text" className="form-control" id="" placeholder="ID ngành hàng" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mô tả :</label>
                            <textarea className="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">số lượng:</label>
                            <input type="text" className="form-control" id="" placeholder="số lượng" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">số lượng điều chỉnh:</label>
                            <div className="form-group row">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon">tồn kho ít nhất</span>
                                        <input id="msg" type="text" className="form-control" name="msg" />
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon">tồn kho nhiều nhất</span>
                                        <input id="msg" type="text" className="form-control" name="msg" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon">cửa hàng ít nhất</span>
                                        <input id="msg" type="text" className="form-control" name="msg" />
                                    </div>
                                </div>
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon">cửa hàng nhiều nhất</span>
                                        <input id="msg" type="text" className="form-control" name="msg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã số lô hàng:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="mã số lô hàng" />
                                <div className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-plus-circle" aria-hidden="true"></i><span className="ml-3">tạo mới</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã vạch:</label>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="mã vạch" />
                                <div className="input-group-btn">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-barcode" aria-hidden="true"></i><span className="ml-3">quét</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">mã giảm giá:</label>
                            <input type="text" className="form-control" id="" placeholder="mã giảm giá" />
                        </div>
                        <button type="submit" className="btn btn-primary fr">thêm sản phẩm</button>
                        <button type="submit" className="btn btn-warning fr mr-3">hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductAddScreen;






