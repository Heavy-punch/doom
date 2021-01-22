import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteExport, listExports } from '../actions/exportActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { EXPORT_DELETE_RESET } from '../constants/exportConstants';
import Pagination from '../components/Pagination';


// import { Container } from './styles';

function ExportScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const exportList = useSelector((state) => state.exportList);
    const { loading, error, exports } = exportList;
    const exportDelete = useSelector((state) => state.exportDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = exportDelete;

    useEffect(() => {
        if (successDelete) {
            dispatch({ type: EXPORT_DELETE_RESET });
        }
        dispatch(listExports());
    }, [dispatch, successDelete]);
    // console.log(exports);

    const [EXstate, setEXState] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [exportsPerPage] = useState(5);

    const indexOfLastProduct = currentPage * exportsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - exportsPerPage;
    // const currentExports = exports !== undefined ? exports.slice(indexOfFirstProduct, indexOfLastProduct) : [];
    const [currentExports, setCurrentExports] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        if (!loading) {
            switch (EXstate) {
                case 'request':
                    setFilteredList(exports.filter(im => im.state === 'request'));
                    setCurrentExports(exports.filter(im => im.state === 'request').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                case 'executed':
                    setFilteredList(exports.filter(im => im.state === 'executed'));
                    setCurrentExports(exports.filter(im => im.state === 'executed').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                case 'close':
                    setFilteredList(exports.filter(im => im.state === 'close'));
                    setCurrentExports(exports.filter(im => im.state === 'close').slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
                default:
                    setFilteredList(exports);
                    setCurrentExports(exports.slice(indexOfFirstProduct, indexOfLastProduct));
                    break;
            }
        }
    }, [dispatch, loading, currentPage, EXstate]);

    // console.log(currentExports);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const deleteHandler = (delItem) => {
        if (window.confirm('Are you sure to delete?')) {
            var delList = [];
            delList.push(delItem);
            dispatch(deleteExport(delList));
            // console.log(delList);
        }
    };

    const editHandler = (editItem) => {
        if ((editItem.state === 'close') && (window.alert('đơn nhập hàng đã đóng, chỉ xem?'))) {
            props.history.push(`/exports/${editItem.ExID}/edit`)
        }
        else {
            props.history.push(`/exports/${editItem.ExID}/edit`)
        }
    };
    const onChangeState = (e) => {
        setEXState(e.target.value)
        paginate(1);
    };
    return (
        <div className="container-fluid">

            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Xuất Hàng</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
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
                </div> */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loadingDelete && <LoadingBox></LoadingBox>}
                    {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {exports.length === 0 && <MessageBox>No export Found</MessageBox>}
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th className="col-sm-1 col-md-1 center">stt</th>
                                                <th className="col-sm-1 col-md-1 center">id</th>
                                                <th className="col-md-2 center">ngày yêu cầu</th>
                                                <th className="col-md-1 center">độ ưu tiên</th>
                                                <th className="col-md-1 center">NV yêu cầu</th>
                                                <th className="col-md-1 center">NV thực hiện</th>
                                                <th className="col-md-1 center">NV kiểm hàng</th>
                                                {/* <th className="col-md-1">trạng thái</th> */}
                                                <th className="col-md-2">
                                                    <div className="OP-state">
                                                        <span>trạng thái</span>
                                                        <span>
                                                            <select
                                                                type="text"
                                                                className="form-control"
                                                                name="state"
                                                                value={EXstate}
                                                                // onChange={(e) => setIMState(e.target.value)}
                                                                onChange={onChangeState}
                                                            >
                                                                <option value="">tất cả</option>
                                                                <option value="request">yêu cầu</option>
                                                                <option value="executed">đã thực hiện</option>
                                                                <option value="close">đóng</option>
                                                            </select>
                                                        </span>
                                                    </div>
                                                </th>
                                                <th className="col-md-2 center">thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentExports.map((exp, index) => (
                                                <tr key={exp.ExID}>
                                                    <td className="center">{index + 1}</td>
                                                    <td className="center">{exp.ExID}</td>
                                                    <td className="center">{(new Date(exp.request_export_date)).toLocaleDateString()}</td>
                                                    <td className="center">{exp.urgent_level}</td>
                                                    <td className="center">{exp.requesterId}</td>
                                                    <td className="center">{exp.executorId}</td>
                                                    <td className="center">{exp.checkerId}</td>
                                                    <td className="center"><span className={exp.state === "request" ? "label label-info" : exp.state === "executed" ? "label label-success" : "label label-default"}>{exp.state}</span></td>
                                                    <td className="center">
                                                        <button
                                                            type="button"
                                                            className="btn btn-warning m-10"
                                                            onClick={() => editHandler(exp)}
                                                        >
                                                            <i className="fa fa-pencil" aria-hidden="true"></i> sửa
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger m-10"
                                                            onClick={() => deleteHandler(exp.ExID)}
                                                        >
                                                            <i className="fa fa-trash" aria-hidden="true"></i> xóa
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* <Pagination itemsPerPage={exportsPerPage} totalItems={exports.length} paginate={paginate}></Pagination> */}
                                    {filteredList.length > exportsPerPage ? (<Pagination itemsPerPage={exportsPerPage} totalItems={filteredList.length} paginate={paginate}></Pagination>) : <br />}
                                </>
                            )
                    }
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button type="button" className="btn btn-primary fr" onClick={() => (history.push(`/exports/add`))}>tạo đơn xuất hàng</button>
                </div>
            </div>

        </div>
    );
}

export default ExportScreen;



<span class="label label-info">Label</span>
