import React from 'react';
import { Bar } from 'react-chartjs-2'

// import { Container } from './styles';

function BarChart(props) {
    return (
        <div>
            <Bar
                data={{
                    labels: ['a', 'b', 'c'],
                    datasets: [
                        {
                            label: 'abc',
                            data: [1, 4, 6],
                            backgroundColor: [
                                'rgba(255,99,132,0.2)',
                                'rgba(54,162,235,0.2)',
                                'rgba(255,206,86,0.2)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54,162,235,1)',
                                'rgba(255,206,86,1)',
                            ],
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