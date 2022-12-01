import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from '../Spinner';
import Chart from 'react-apexcharts';
import Select, { createFilter } from 'react-select';
import CustomOption from "../Options/CustomOption";
import apisaber from "../../services/apisaber";

import './styles.css';
import { NoDataMessage } from "../NoDataMessage";

export const ChartBySchool = (props) => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState({
        value: '',
        label: '',
    });
    const [series, setSeries] = useState([{
        name: props.name,
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

    
    function handleSelectChange(item) {
        if (!item) {
            props.onChange(props.id, data[0].value);
            setSelected({
                value: data[0].value,
                label: data[0].label,
            });

            return;
        }
        props.onChange(props.id, item.value);
        setSelected(item);
    };

    function verifyEmptyData(data) {
        for (const item of data) {
            if (item > 0 || item != "0") return true;
        }

        return false;
    }

    useEffect(() => {
        if (data.length === 0 && props.useSelect) {
            apisaber.get(`/schools/get-all-integral-schools-that-were-regular/?type=${props.administrationType}`).then(response => {
                setData(response.data);
                setSelected({
                    value: response.data[0].value,
                    label: response.data[0].label,
                });
                console.log(response.data[0].value, response.data[0].label);
            }).catch(error => console.log(error));
        }

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
    }, [
        props.x,
        props.y,
        props.administrationType,
        data.length,
        options.xaxis.categories,
        props.useSelect,
        selected.value
    ]);

    return (
        <div id={props.id} className="container-line-chart">
            {!props.loading  ? (
                <div className="container-select-chart">
                    <div className="select">
                        {props.useSelect && (
                            <Select
                                className="basic-single"
                                classNamePrefix="custom-select"
                                isClearable={true}
                                isSearchable={true}
                                value={selected}
                                options={data}
                                components={{ Option: CustomOption }}
                                filterOption={createFilter({ ignoreAccents: false })}
                                onChange={value => handleSelectChange(value)}
                            />
                        )}
                        <div />
                    </div>
                    {verifyEmptyData(props.y) ? (
                        <Chart
                            className="chart"
                            options={options}
                            series={series}
                            type={props.type}
                            height={350}
                        />
                    ) : (
                        <NoDataMessage />
                    )}
                </div>
            ) : (
                <div className="box-spinner-line-chart">
                    <Spinner />
                </div>
            )}
        </div>
    );
};