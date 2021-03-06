import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsExport, updateExport } from '../actions/exportActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { EXPORT_DETAILS_RESET, EXPORT_UPDATE_RESET } from '../constants/exportConstants';

// import { Container } from './styles';

function ExportEditScreen(props) {
    const history = useHistory();
    const exportId = props.match.params.id;

    const [urgent_level, setUrgent_level] = useState('');
    const [export_date, setExport_date] = useState('');
    const [state, setState] = useState('');
    const [bonus, setBonus] = useState('');
    // const [requesterId, setRequesterId] = useState('');
    // const [executorId, setExecutorId] = useState('');
    // const [checkerId, setCheckerId] = useState('');
    // const [supplierId, setSupplierId] = useState('');
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

    // console.log(exportDetails);

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
        // dispatch({ type: EXPORT_DETAILS_RESET });
    }, [dispatch, successUpdate, props.history,]);

    useEffect(() => {
        if (!loading) {
            setUrgent_level(_export.urgent_level);
            // if (_export.export_date) {
            //     setExport_date(_export.export_date.slice(0, 10));
            // }
            setExport_date(_export.export_date ? _export.export_date.slice(0, 10) : '');
            setState(_export.state);
            // if (_export.bonus) {
            //     setBonus(_export.bonus);
            // }
            setBonus(_export.bonus);
            // setRequesterId(_export.requesterId);
            // if (_export.executorId) {
            //     setExecutorId(_export.executorId);
            // }
            // if (_export.checkerId) {
            //     setCheckerId(_export.checkerId);
            // }
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
    // console.log(exportProducts);


    const submitHandler = (e) => {
        // console.log(exportProducts);
        e.preventDefault();
        for (let i = 0; i < exportProducts.length; i++) {
            exportProducts[i] = {
                productId: productId[i],
                request_total_unit: request_total_unit[i],
            };
        }
        // console.log(exportProducts);
        dispatch(
            updateExport({
                exportId,
                urgent_level,
                export_date,
                state,
                bonus,
                // requesterId,
                // executorId,
                // checkerId,
                exportProducts,
            })
        );
    };
    const changeRequestTotalNumber = (e, index, product) => {
        let arr = [...request_total_unit];
        arr[index] = parseInt(e.target.value, 10);
        // arr[index] = e.target.value < 1 ? 1 : e.target.value >= product.S_max_qtt - product.store_curr_qty ? product.S_max_qtt - product.store_curr_qty : e.target.value;
        // console.log(product);
        setRequest_total_unit(arr);

    };

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Cập Nhật Đơn Xuất Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
                                                    {state !== "request"
                                                        ? (<div className="form-group">
                                                            <label className="form-label">ngày xuất hàng:</label>
                                                            <input
                                                                type="date"
                                                                className="form-control"
                                                                placeholder="ngày nhập hàng"
                                                                name="export_date"
                                                                value={export_date}
                                                                onChange={(e) => setExport_date(e.target.value)}
                                                            />
                                                        </div>)
                                                        : ""
                                                    }
                                                    {_export.state === "request"
                                                        ? (
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
                                                                </select>
                                                            </div>
                                                        )
                                                        : (
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
                                                        )

                                                    }
                                                    {/* <div className="form-group">
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
                                                    </div> */}
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
                                                    {/* <div className="form-group">
                                                        <label className="form-label">NV yêu cầu:</label>
                                                        <input
                                                            type="number"
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
                                                            type="number"
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
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="nhân viên kiểm tra"
                                                            name="checkerId"
                                                            value={checkerId}
                                                            onChange={(e) => setCheckerId(e.target.value)}
                                                        />
                                                    </div> */}
                                                </>
                                            </div>

                                            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                                                <>

                                                    <table className="table table-hover mt15">
                                                        <thead>
                                                            <tr>
                                                                <th className="col-md-1">mã số SP</th>
                                                                <th className="col-md-1">tên SP</th>
                                                                <th className="col-md-1">số lượng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {exportProducts.map((product, index) => (
                                                                <tr key={product.PID}>
                                                                    {/* <td>{index + 1}</td> */}
                                                                    <td>
                                                                        <Link to={`/products/${productId[index]}`}>
                                                                            {productId[index]}
                                                                        </Link>
                                                                    </td>
                                                                    <td>
                                                                        {product.name}
                                                                    </td>
                                                                    <td>
                                                                        <div className="form-group">
                                                                            <input
                                                                                type="number"
                                                                                className="form-control"
                                                                                value={request_total_unit[index]}
                                                                                onChange={(e) => changeRequestTotalNumber(e, index, product)}
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
                                        <button
                                            type="submit"
                                            className="btn btn-primary fr"
                                            disabled={_export.state === 'close'}
                                        >
                                            cập nhật đơn xuất hàng
                                        </button>
                                        <button type="reset" className="btn btn-warning fr mr-3" onClick={() => history.goBack()}>hủy bỏ</button>
                                        {loadingUpdate && <LoadingBox></LoadingBox>}
                                    </form>
                                </>
                            )}
                </div>
            </div>
        </div>
    );
}

export default ExportEditScreen;