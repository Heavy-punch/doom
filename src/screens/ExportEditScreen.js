import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { detailsExport, updateExport } from '../actions/exportActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { EXPORT_UPDATE_RESET } from '../constants/exportConstants';

// import { Container } from './styles';

function ExportEditScreen(props) {
    const history = useHistory();
    const exportId = props.match.params.id;

    const [urgent_level, setUrgent_level] = useState('');
    const [export_date, setExport_date] = useState('');
    const [state, setState] = useState('');
    const [bonus, setBonus] = useState('');
    const [requesterId, setRequesterId] = useState('');
    const [executorId, setExecutorId] = useState('');
    const [checkerId, setCheckerId] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [exportProducts, setExportProducts] = useState([]);
    const [productId, setProductId] = useState([]);
    const [request_total_unit, setRequest_total_unit] = useState([]);


    const exportDetails = useSelector((state) => state.exportDetails);
    const { loading, error, _export } = exportDetails;

    const exportUpdate = useSelector((state) => state.exportUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = exportUpdate;

    const dispatch = useDispatch();

    console.log(_export);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: EXPORT_UPDATE_RESET });
            props.history.push('/exports');
        }
        if (!_export || _export.ShID !== exportId) {
            dispatch({ type: EXPORT_UPDATE_RESET });
            dispatch(detailsExport(exportId));
        }
        dispatch({ type: EXPORT_UPDATE_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setUrgent_level(_export.urgent_level);
            setExport_date(new Date(_export.export_date).toISOString().slice(0, 10));
            setState(_export.state);
            setBonus(_export.bonus);
            setRequesterId(_export.requesterId);
            setExecutorId(_export.executorId);
            setCheckerId(_export.checkerId);
            setSupplierId(_export.supplierId);
            setSupplierId(_export.supplierId);
            setExportProducts(_export.products);
            var arr = [];
            var brr = [];
            for (let i = 0; i < _export.products.length; i++) {
                arr[i] = _export.products[i].PID;
                brr[i] = _export.products[i].ProductInExport.request_total_unit;
            }
            setProductId(arr);
            setRequest_total_unit(brr);
        }
    }, [loading,]);


    const submitHandler = (e) => {
        e.preventDefault();
        for (let i = 0; i < exportProducts.length; i++) {
            exportProducts[i] = {
                productId: productId[i],
                request_total_unit: request_total_unit[i],
            };
        }
        dispatch(
            updateExport({
                exportId,
                urgent_level,
                export_date,
                state,
                bonus,
                requesterId,
                executorId,
                checkerId,
                supplierId,
                exportProducts,
            })
        );
    };
    const changeRequestTotalNumber = (e, index) => {
        let arr = [...request_total_unit];
        arr[index] = parseInt(e.target.value, 10);
        setRequest_total_unit(arr);
    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Cập Nhật Đơn Nhập Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    <form onSubmit={submitHandler}>

                                        <div className="row">
                                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                                <>
                                                    <div className="form-group">
                                                        <label className="form-label" >độ ưu tiên:</label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            name="status"
                                                            value={urgent_level}
                                                            onChange={(e) => setUrgent_level(e.target.value)}
                                                        >
                                                            <option value="normal">bình thường</option>
                                                            <option value="prior">ưu tiên</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">ngày xuất hàng:</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="ngày nhập hàng"
                                                            name="export_date"
                                                            value={export_date}
                                                            onChange={(e) => setExport_date(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label" >tình trạng:</label>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            name="state"
                                                            value={state}
                                                            onChange={(e) => setState(e.target.value)}
                                                        >
                                                            <option value="request">yêu cầu</option>
                                                            <option value="executed">đã thực hiện</option>
                                                            <option value="close">đóng</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">ghi chú:</label>
                                                        <textarea
                                                            className="form-control"
                                                            rows="3"
                                                            placeholder="ghi chú"
                                                            value={bonus}
                                                            onChange={(e) => setBonus(e.target.value)}
                                                        >
                                                        </textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV yêu cầu:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên yêu cầu"
                                                            name="requesterId"
                                                            value={requesterId}
                                                            onChange={(e) => setRequesterId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV thực hiện:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên thực hiện"
                                                            name="executorId"
                                                            value={executorId}
                                                            onChange={(e) => setExecutorId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">NV kiểm tra:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhân viên kiểm tra"
                                                            name="checkerId"
                                                            value={checkerId}
                                                            onChange={(e) => setCheckerId(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="form-label">nhà cung cấp:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="nhà cung cấp"
                                                            name="supplierId"
                                                            value={supplierId}
                                                            onChange={(e) => setSupplierId(e.target.value)}
                                                        />
                                                    </div>
                                                </>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                                <>

                                                    <table className="table table-hover mt15">
                                                        <thead>
                                                            <tr>
                                                                <th className="col-md-1">productId</th>
                                                                <th className="col-md-1">request_total_unit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {exportProducts.map((product, index) => (
                                                                <tr key={product.PID}>
                                                                    {/* <td>{index + 1}</td> */}
                                                                    <td>{productId[index]}</td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                // placeholder="nhân viên yêu cầu"
                                                                                // name="request_total_unit"
                                                                                value={request_total_unit[index]}
                                                                                onChange={(e) => changeRequestTotalNumber(e, index)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>



                                                </>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary fr">cập nhật đơn nhập hàng</button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default ExportEditScreen;