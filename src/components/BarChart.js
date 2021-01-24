import React from 'react';
import { Bar } from 'react-chartjs-2'

// import { Container } from './styles';

function BarChart(props) {
    var months = ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"];
    var backgroundColor = [];
    var borderColor = [];
    const myFunc = (() => {
        for (let i = 0; i < props.barChartData.length; i++) {
            let r = Math.ceil(Math.random() * 255);
            let g = Math.ceil(Math.random() * 255);
            let b = Math.ceil(Math.random() * 255);
            backgroundColor.push('rgba(' + r + ',' + g + ',' + b + ',0.2)');
            borderColor.push('rgba(' + r + ',' + g + ',' + b + ',1)');
        }
    })();
    return (
        <div>
            <Bar
                data={{
                    labels: props.barChartData.map(x => months[(new Date(x.time).getMonth())]),
                    datasets: [
                        {
                            label: 'lợi nhuận',
                            data: props.barChartData.map((x, index) => x.profit),
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            borderWidth: 1,
                        },
                        {
                            label: 'tổng thu',
                            data: props.barChartData.map((x, index) => x.total),
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            borderWidth: 1,
                        },
                    ],

                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    );
}

export default BarChart;