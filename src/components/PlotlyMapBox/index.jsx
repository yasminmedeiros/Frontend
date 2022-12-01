import React from "react";
import 'plotly.js';
import Plotly from 'react-plotly.js';
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "../Spinner";
import './styles.css';
import { NoDataMessage } from "../NoDataMessage";

const PlotlyMapBox = (props) => {
    const [data, setData] = useState();
    const [config, setConfig] = useState();
    const [layout, setLayout] = useState();

    function verifyEmptyData(data) {
        for (const item of data) {
            let value = parseInt(item.data);
            if (value > 0 || value != "0") return true;
        }

        return false;
    }

    useEffect(() => {
        let lon = [];
        let lat = [];
        let z = [];
    
        props.locations.forEach(school => {
            lon.push(parseFloat(school.longitude));
            lat.push(parseFloat(school.latitude));
            z.push(parseInt(school.data));
        });

        setData([{
            lon: lon, lat: lat, radius: 10,
            z: z,
            type: "densitymapbox",
            coloraxis: 'coloraxis', zmin: 0, zmax: 10000,
            // hoverinfo: 'skip'
        }]);

        setLayout({
            mapbox: {
                center: { lon: -37.2779, lat: -7.02556 },
                style: "outdoors",
                zoom: 6,
            },
            // width: 1000,
            coloraxis: { colorscale: "Viridis" },
            title: {
                text: `<b>${props.title}</b>`,
                font: {
                    family: 'Helvetica, Arial, sans-serif',
                    size: 18,
                    color: '#000000'
                }
            },
            margin: { t: 30, b: 30 }
        });

        setConfig({
            mapboxAccessToken: "pk.eyJ1IjoiYW5uaWViZWx0cmFvIiwiYSI6ImNrajdpZGlhODF1aTkzMG5wcjJrN2w0dWsifQ.w5XFiBxyFEbkQwRtekWV7Q",
            responsive: true 
        });

    }, [props.locations, props.title]);

    return (
        <div id="plotly">
            { props.locations.length > 0 ? (
                verifyEmptyData(props.locations) ? (
                    <Plotly
                    data={data}
                    layout={layout}
                    config={config}
                    style={{ width: '100%', height: '100%' }}
                />
                ) : (
                    <NoDataMessage />
                )
            ) : (
                <Spinner className="spinner-plotly" />
            )}
        </div>
    );
};

export default PlotlyMapBox;