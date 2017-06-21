import * as React from 'react';

import {Bar, Doughnut, Line, Pie} from '../../../index/index';

export interface IChartState{
    users: IData[];
    barData: IData[];
    lineData: any[];
}

export interface IData{
    label: string;
    value: number|string;
    background: string;
}

// export interface ILineData{
//     label: string;
//     value: number|string;
// }

export default class ChartExample extends React.Component<{}, IChartState>{

    // private lineColor = 'rgba(255,99,132,0.4)';

    constructor(){
        super();

        this.state = {
            barData: [
                {
                    background: 'rgba(255,99,132,0.2)',
                    label: 'Doni',
                    value: 70,
                },
                {
                    background: 'rgba(255,99,132,0.2)',
                    label: 'Gent',
                    value: '101'
                },
                {
                    background: 'rgba(255,99,132,0.2)',
                    label: 'Shkumbin',
                    value: 65
                }
            ],
            lineData: [
                [
                    {
                        label: 'January',
                        value: 70,
                    },
                    {
                        label: 'February',
                        value: '11'
                    },
                    {
                        label: 'March',
                        value: 65
                    },
                    {
                        label: 'April',
                        value: 24
                    },
                    {
                        label: 'June',
                        value: 54
                    },
                    {
                        label: 'July',
                        value: 97
                    },
                    {
                        label: 'August',
                        value: 19
                    },
                    {
                        label: 'September',
                        value: 42
                    },
                    {
                        label: 'October',
                        value: 79
                    },
                    {
                        label: 'November',
                        value: 49
                    },
                    {
                        label: 'December',
                        value: 36
                    }
                ],
                [
                    {
                        label: 'January',
                        value: 33,
                    },
                    {
                        label: 'February',
                        value: '11'
                    },
                    {
                        label: 'March',
                        value: 51
                    },
                    {
                        label: 'April',
                        value: 70
                    },
                    {
                        label: 'June',
                        value: 37
                    },
                    {
                        label: 'July',
                        value: 41
                    },
                    {
                        label: 'August',
                        value: 73
                    },
                    {
                        label: 'September',
                        value: 42
                    },
                    {
                        label: 'October',
                        value: 45
                    },
                    {
                        label: 'November',
                        value: 99
                    },
                    {
                        label: 'December',
                        value: 55
                    }
                ]
            ],
            users: [
                {
                    background: '#5CCDDF',
                    label: 'Doni',
                    value: 70,
                },
                {
                    background: '#F48770',
                    label: 'Gent',
                    value: '101'
                },
                {
                    background: '#F2C14A',
                    label: 'Shkumbin',
                    value: 65
                }
            ]
        };
    }

    public render() {

        return(
            <fieldset style={{display: 'inline-block'}}>
                <legend>Pie Chart</legend>
                <Pie data={this.state.users} title="Subscribers" size={250}/>
                <hr/>
                <Doughnut
                    data={this.state.users}
                    title="Doughnut.. yummy"
                    titlePos="bottom"
                    legendPos="left"
                    legendStyle="italic"
                    boxWidth={20}
                    borderWidth={3}
                    size={200}
                />
                <hr/>
                <Line
                    data={this.state.lineData}
                    title={'Line Chart'}
                    height={300}
                    width={600}
                    maintainAspectRatio
                    label={'Emails sent per month'}
                    gridLinesY
                    gridLinesX
                />
                <Line
                    fill
                    data={this.state.lineData}
                    title={'Line Chart'}
                    height={300}
                    width={600}
                    maintainAspectRatio
                    label={'Emails sent per month'}
                    gridLinesY
                    borderWidth={1}
                    lineTension={0}
                    pointRadius={5}
                    pointStyle="rect"
                />
                <Line
                    noLine
                    data={this.state.lineData}
                    title={'Line Chart'}
                    height={300}
                    width={600}
                    maintainAspectRatio
                    label={'Emails sent per month'}
                    gridLinesY
                    gridLinesX
                    lineTension={0}
                    pointRadius={10}
                    pointStyle="star"
                />
                <Line
                    data={this.state.lineData}
                    title={'Line Chart'}
                    height={300}
                    width={600}
                    maintainAspectRatio
                    label={'Emails sent per month'}
                    borderWidth={1}
                    steppedLine
                />
                <hr/>
                <Bar
                    data={this.state.barData}
                    title={'Chart Title'}
                    height={200}
                    width={400}
                    maintainAspectRatio
                    label={'Number of subscribers'}
                    minValue={40}
                    gridLinesY
                    gridLinesX
                    borderColor={'rgba(255,99,132,1)'}
                    borderWidth={1}
                    barPercentage={0.5}
                />
                <Bar
                    data={this.state.users}
                    title={'Chart title'}
                    height={200}
                    width={400}
                    maintainAspectRatio
                    label={'Number of subscribers'}
                    minValue={20}
                    barPercentage={0.8}
                />
            </fieldset>
        );
    }
}
