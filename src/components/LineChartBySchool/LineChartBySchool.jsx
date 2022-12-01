import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from '../../components/Spinner';
import Select, { createFilter } from 'react-select';
import CustomOption from "../Options/CustomOption";
import Chart from 'react-apexcharts';
import './styles.css';
import apisaber from "../../services/apisaber";
import { NoDataMessage } from "../NoDataMessage";

export const LineChartBySchool = (props) => {
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
            height: 350,
            type: 'line', //props.type,
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        colors: ['#A0D995'],
        title: {
            text: props.title,
            align: 'center',
        },
        markers: {
            size: 8,
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
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
            switch (props.by) {
                case 'school':
                    apisaber.get(`/enrollments/get-schools/?name=${selected.value}`).then(response => {
                        setData(response.data);
                        setSelected({
                            value: response.data[0].value,
                            label: response.data[0].label,
                        });
                        console.log(response.data[0].value, response.data[0].label);
                    }).catch(error => console.log(error));

                    break;
                case 'gre':
                    apisaber.get("/enrollments/get-gres").then(response => {
                        setData(response.data);
                        setSelected({
                            value: response.data[0].value,
                            label: response.data[0].label,
                        });
                    }).catch(error => console.log(error));

                    break;
                case 'size':
                    apisaber.get("/enrollments/get-sizes").then(response => {
                        setData(response.data);
                        setSelected({
                            value: response.data[0].value,
                            label: response.data[0].label,
                        });
                    }).catch(error => console.log(error));

                    break;
                default:
                    break;
            }
        }
        setSeries(prevSeries => {
            return [{
                ...prevSeries[0],
                data: props.y,
            }];
        });

        setOptions(prevOptions => {
            return {
                ...prevOptions,
                xaxis: {
                    categories: props.x,
                },
            };
        });
    }, [
        props.x,
        props.y,
        data.length,
        options.xaxis.categories,
        props.useSelect,
        selected.value
    ]);

    useEffect(() => {
        if (data.length != 0 && props.by == 'school') {
            apisaber.get(`/enrollments/get-schools/?name=${''}&type=${props.administrationType}`).then(response => {
                setData(response.data);
                console.log(response.data)
                setSelected({
                    value: response.data[0].value,
                    label: response.data[0].label,
                });
            }).catch(error => console.log(error));
        }
    }, [props.administrationType])

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
}