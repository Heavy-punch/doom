import React from 'react';
import BarChart from '../components/BarChart';

// import { Container } from './styles';

function StatisticScreen(props) {

    return (
        <div className="container-fluid">
            <div className="row no-mg">
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <BarChart />
                    <h2>this is barchart</h2>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <BarChart />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <BarChart />
                </div>
            </div>
        </div>
    );
}

export default StatisticScreen;














