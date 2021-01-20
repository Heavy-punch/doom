import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'

// import { Container } from './styles';

function DoughnutChart(props) {
    // console.log(props.labels);
    // var a = props.doughnutData.map(() => 'rgba(' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' + '0.2)')
    var backgroundColor = [];
    var borderColor = [];
    const myFunc = (() => {
        for (let i = 0; i < props.doughnutData.length; i++) {
            let r = Math.ceil(Math.random() * 255);
            let g = Math.ceil(Math.random() * 255);
            let b = Math.ceil(Math.random() * 255);
            backgroundColor.push('rgba(' + r + ',' + g + ',' + b + ',0.2)');
            borderColor.push('rgba(' + r + ',' + g + ',' + b + ',1)');
        }
    })();

    return (
        <div>
            <Doughnut
                data={{
                    labels: props.doughnutData.map(x => x.cate.name),
                    // labels: ['a', 'b', 'c'],
                    datasets: [
                        {
                            label: 'abc',
                            data: props.doughnutData.map(x => x.qty),
                            // data: [1, 4, 6],
                            backgroundColor,
                            // backgroundColor: [
                            //     'rgba(255,99,132,0.2)',
                            //     'rgba(54,162,235,0.2)',
                            //     'rgba(255,206,86,0.2)',
                            // ],
                            borderColor,
                            // borderColor: [
                            //     'rgba(255,99,132,1)',
                            //     'rgba(54,162,235,1)',
                            //     'rgba(255,206,86,1)',
                            // ],
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

export default DoughnutChart;