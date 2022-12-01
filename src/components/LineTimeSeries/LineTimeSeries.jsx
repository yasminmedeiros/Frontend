import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import Chart from 'react-apexcharts';

export const LineTimeSeries = (props) => {
    const [series, setSeries] = useState([{
        name: props.name,
        color: props.color,
        data: props.y,
        type: "line",
    }]);
    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
            enabled: true,
            },
            stroke: {
            curve: 'smooth'
            },
            title: {
            text: 'Matrículas por Escola',
            align: 'left'
            },
            grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
            },
            markers: {
            size: 1
            },
            xaxis: {
            categories: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
            title: {
                text: 'Anos'
            }
            },
            yaxis: {
            title: {
                text: 'Matrículas'
            },
            min: 5,
            max: 40
            },
            legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
            }   
    });

    useEffect(() => {
        setSeries([{
            ...series[0],
            data: props.y,
        }]);

        const xaxis = options.xaxis;
        setOptions({
            ...options,
            xaxis: {
                ...xaxis,
                categories: props.x,
            },
        })
    }, [props.x, props.y, props.selected]);

    return (
        <div id={props.id}>
            <Chart options={options} series={series} type={props.type} height={350} />
        </div>
    );
};