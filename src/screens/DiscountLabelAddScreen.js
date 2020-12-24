import React from 'react';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

function DiscountLabelAddScreen() {
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };

    // var d = new Date();
    // var c = d.getFullYear() + '-' + d.getMonth() + '-' + String(d.getDate()).padStart(2, '0');
    // console.log(c);

    return (
        <div className="container-fluid">
            <div className="row center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <h2>Thêm Nhãn Khuyến Mãi</h2>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <form >
                        <div className="form-group">
                            <label className="form-label">tên sự kiện:</label>
                            <input type="text" className="form-control" id="" placeholder="tên sự kiện" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mức độ giảm:</label>
                            <input type="text" className="form-control" id="" placeholder="mức độ giảm giá" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">mô tả :</label>
                            <textarea className="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <div className="form-group row">
                            <div className="col-xs-6">
                                <label className="form-label" >ngày bắt đầu:</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-xs-6">
                                <label className="form-label" >ngày kết thúc:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="flex-start">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider> */}
                        <button type="submit" className="btn btn-primary fr">thêm ngành hàng</button>
                        <button type="submit" className="btn btn-warning fr mr-3">hủy bỏ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DiscountLabelAddScreen;