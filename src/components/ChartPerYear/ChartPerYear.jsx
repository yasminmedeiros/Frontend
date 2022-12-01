import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from '../Spinner';
import Chart from 'react-apexcharts';
import Switch from "@material-ui/core/Switch";

import './styles.css';
import { NoDataMessage } from "../NoDataMessage";

export const ChartPerYear = (props) => {
    const [series, setSeries] = useState([{
        name: props.name,
        color: props.color,
        data: props.y,
    }]);
    const [options, setOptions] = useState({
        chart: {
            type: props.type,
            height: 450,
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: [
            '#E5BEDD', '#FFA8B8', '#DCD9F8',
            '#F7D8C3', '#FFC8C3', '#BCCEF4',
            '#B5DCF9', '#A9E5E3', '#A2EDCE',
            '#A0D995', '#C5D084', '#D2C797',
            '#FAE187', '#E8BA86', '#D3BEAD',
            '#8CC2C2'
        ],
        title: {
            text: props.title,
            align: 'center',
            floating: true,
            margin: 20,
        },
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['#000']
            },
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val.toLocaleString('pt-BR', { minimumFractionDigits: 0 })
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            }
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        xaxis: {
            categories: props.x,
            labels: {
                rotate: -60,
                rotateAlways: false,
                style: {
                    fontSize: '10px',
                    colors: ["#304758"],
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 'bold',
                },
            },
            style: {
                marginBottom: '50px'
            },
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: false,
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: function (val, opt) {
                        return val + ':';
                    }
                },
                formatter: function (val) {
                    return typeof val === "number" ? val.toFixed(0) : val;
                },
            }
        }
    });

    const [pieSeries, setPieSeries] = useState([]);
    const [pieOptions, setPieOptions] = useState({
        chart: { type: 'donut', },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: [
            '#E5BEDD', '#FFA8B8', '#DCD9F8',
            '#F7D8C3', '#FFC8C3', '#BCCEF4',
            '#B5DCF9', '#A9E5E3', '#A2EDCE',
            '#A0D995', '#C5D084', '#D2C797',
            '#FAE187', '#E8BA86', '#D3BEAD',
            '#8CC2C2'
        ],
        title: {
            text: props.title,
            align: 'center',
            floating: true
        },
        labels: props.x,
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(2) + "%";
            },
            textAnchor: 'middle',
            style: {
                fontSize: '14px',
                colors: ['#000'],
            },
            offsetX: 0,
            dropShadow: {
                enabled: false
            },
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '12px',
                colors: ['#000'],
            },
            theme: true,
        },
        plotOptions: {
            pie: {
                customScale: 0.9,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '15px',
                            colors: ["#304758"],
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 'bold',
                            color: '#000',
                        },
                        value: {
                            show: true,
                            fontSize: '15px',
                            colors: ["#304758"],
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 'bold',
                            color: '#000',
                            formatter: function (val, opts) {
                                let index = opts.globals.series.indexOf(parseFloat(val));
                                return val
                                    + ' - '
                                    + parseFloat(opts.globals.seriesPercent[index]).toFixed(2)
                                    + '%';
                            },
                        },
                    },

                }
            }
        }
    });

    const [viewPercent, setViewPercent] = useState(false);
    const [selected, setSelected] = useState(props.options[0]);

    function handleSelectChange(value) {
        props.onSelect(props.id, value);
        setSelected(value);
    }

    function changeView() {
        setViewPercent(!viewPercent);
    }

    function verifyEmptyData(data) {
        for (const item of data) {
            if (item > 0 || item != "0") return true;
        }

        return false;
    }

    useEffect(() => {
        setPieSeries(() => {
            if (props.y.length > 0) {
                if (typeof props.y[0] == 'number') {
                    return props.y;
                }
                else {
                    return props.y.map(item => parseFloat(item));
                }
            }
        });
        setPieOptions(prevPieOptions => {
            return {
                ...prevPieOptions,
                labels: props.x,
            };
        });


        setSeries(prevSeries => {
            return [{
                ...prevSeries[0],
                data: props.y,
            }];
        });
        setOptions(prevOptions => {
            const xaxis = prevOptions.xaxis;

            return {
                ...prevOptions,
                xaxis: {
                    ...xaxis,
                    categories: props.x,
                },
            }
        });
    }, [props.y, props.x, viewPercent]);

    return (
        <div id={props.id} className="container-chart">
            {!props.loading ? (
                <>
                    <div>
                        {props.viewPercent ? (
                            <label>
                                <Switch
                                    aria-label="Percentual"
                                    size="small"
                                    onChange={changeView}
                                    checked={viewPercent}
                                    color="primary"
                                />
                                <span>Percentual</span>
                            </label>
                        ) : (
                            <div></div>
                        )}
                        <select
                            className="select-year"
                            onChange={(e) => handleSelectChange(e.target.value)}
                            value={selected}
                        >
                            {(props.options || []).map((option, index) => {
                                return (<option key={index}>{option}</option>);
                            })}
                        </select>
                    </div>
                    {verifyEmptyData(props.y) ? (
                        !viewPercent ? (
                            <Chart
                                id={props.type}
                                className={props.type}
                                options={options}
                                series={series}
                                type={props.type}
                                height={450}
                            />
                        ) : (
                            <Chart
                                id='donut'
                                className='donut'
                                options={pieOptions}
                                series={pieSeries}
                                type='donut'
                                height={450}
                            />
                        )
                    ) : (
                        <NoDataMessage />
                    )}
                </>
            ) : (
                <div className="box-spinner">
                    <Spinner />
                </div>
            )}

        </div>
    );
};