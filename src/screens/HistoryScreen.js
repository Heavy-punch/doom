import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Pagination from '../components/Pagination';
import { historyUser } from '../actions/userActions';


// import { Container } from './styles';

function HistoryScreen(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const userHistory = useSelector((state) => state.userHistory);
    const { loading, error, histories } = userHistory;

    useEffect(() => {
        dispatch(historyUser());
    }, [dispatch]);

    console.log(histories);

    const [currentPage, setCurrentPage] = useState(1);
    const [historiesPerPage] = useState(5);

    const indexOfLastProduct = currentPage * historiesPerPage;
    const indexOfFirstProduct = indexOfLastProduct - historiesPerPage;
    const currentHistories = histories !== undefined ? histories.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    // console.log(currentHistories);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (date) => {
        var day = ['chủ nhật', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm', 'thứ sáu', 'thứ bảy'];


    };

    return (
        <div className="container-fluid">

            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Lịch sử</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row" >
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-15">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                                <>
                                    {histories.length === 0 && <MessageBox>No log Found</MessageBox>}
                                    <div className="table-list">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1 center">stt</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-1 center">id</th>
                                                    <th className="col-xs-1 col-sm-1 col-md-1 col-lg-2 center">thời gian</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">thao tác</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">bảng</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">nhân viên thực hiện</th>
                                                    <th className="col-xs-2 col-sm-2 col-md-2 col-lg-2 center">đối tượng ảnh hưởng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentHistories.map((history, index) => (
                                                    <tr key={history.id}>
                                                        <td className="center">{index + 1}</td>
                                                        <td className="center">{history.id}</td>
                                                        <td className="center">{(new Date(history.createdAt)).toLocaleDateString() + " " + (new Date(history.createdAt)).toLocaleTimeString()}</td>
                                                        <td className="center">{history.action}</td>
                                                        <td className="center">{history.tableOfAction}</td>
                                                        <td className="center">{history.MngID}</td>
                                                        <td className="center">ID:{history.affectedRowID} *** tên: {history.nameInRow}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {histories.length > historiesPerPage ? <Pagination itemsPerPage={historiesPerPage} totalItems={histories.length} paginate={paginate}></Pagination> : <br />}
                                </>
                            )}
                </div>
            </div>

        </div>
    );
}

export default HistoryScreen;