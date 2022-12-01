import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ChartPerYear } from '../../components/ChartPerYear/ChartPerYear';
import Header from "../../components/Header";
import apisaber from '../../services/apisaber';
import Select, { createFilter } from 'react-select';
import CustomOption from "../../components/Options/CustomOption";
import { LineChartBySchool } from '../../components/LineChartBySchool/LineChartBySchool';

export const Students = () => {
    const dataChart = {
        loading: true,
        year: 2021,
        x: [],
        y: [],
    };
    
    const dataLineChart = {
        loading: true,
        data_id: 0, //4556
        useSelect: true,
        x: [],
        y: [],
    };

    const [studentRetention, setStudentRetention] = useState(dataChart);
    const [studentEJA, setStudentEJA] = useState(dataChart);
    // const [infantilRetention, setInfantilRetention] = useState(dataChart);
    const [fundamentalRetention, setFundamentalRetention] = useState(dataChart);
    const [medioRetention, setMedioRetention] = useState(dataChart);
    const [ejaRetention, setEjaRetention] = useState(dataChart);
    const [censoEarlyFundamentalComparison, setCensoEarlyFundamentalComparison] = useState(dataChart);
    const [censoInfantilComparison, setCensoInfantilComparison] = useState(dataChart);
    const [censoMedioComparison, setCensoMedioComparison] = useState(dataChart);
    const [censoLateFundamentalComparison, setCensoLateFundamentalComparison] = useState(dataChart);
    const [censoEJAFundamentalComparison, setCensoEJAFundamentalComparison] = useState(dataChart);
    const [censoEJAMedioComparison, setCensoEJAMedioComparison] = useState(dataChart);
    const [censoIntegralComparison, setCensoIntegralComparison] = useState(dataChart);
    const [earlyFundamentalInYears, setEarlyFundamentalInYears] = useState(dataLineChart);
    const [lateFundamentalInYears, setLateFundamentalInYears] = useState(dataLineChart);
    const [firstMedioInYears, setFirstMedioInYears] = useState(dataLineChart);
    const [secondMedioInYears, setSecondMedioInYears] = useState(dataLineChart);
    const [thirdMedioInYears, setThirdMedioInYears] = useState(dataLineChart);
    const [integralInYears, setIntegralInYears] = useState(dataLineChart);
    const year_comparison = [2021]
    const [years, setYears] = useState([]);
    const [selectedAdministrationType, setSelectedAdministrationType] = useState({ label: 'Todos', value: 3 });
    const [optionsAdministrationType] = useState([
        {
            label: 'Todos',
            value: 3,
        },
        {
            label: 'Municipal',
            value: 1,
        },
        {
            label: 'Estadual',
            value: 0,
        }
    ]);

    function onSelectYear(id, option) {
        switch (id) {
            case 'studentRetention':
                setStudentRetention({ ...studentRetention, loading: true });
                apisaber.get(`/enrollmentsratings/get-student-retention/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
                    const x = response.data.map(size => size.key);
                    const y = response.data.map((size) => size.data);

                    setStudentRetention({ loading: false, year: option, x, y });
                }).catch(error => console.log(error));
                break;

            case 'studentEJA':
                apisaber.get(`/enrollmentsratings/get-returning-students-eja/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
                    const x = response.data.map(size => size.key);
                    const y = response.data.map((size) => size.data);

                    setStudentEJA({ loading: false, year: option, x, y });
                }).catch(error => console.log(error));

                break;

            // case 'infantilRetention':
            //     apisaber.get(`/enrollmentsratings/get-infantil-retention?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
            //         const x = response.data.map(size => size.key);
            //         const y = response.data.map(size => size.data);

            //         setInfantilRetention({ loading: false, year: option, x, y });
            //     }).catch(error => console.log(error));

            //     break;

            case 'fundamentalRetention':
                apisaber.get(`/enrollmentsratings/get-fundamental-retention?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
                    const x = response.data.map(size => size.key);
                    const y = response.data.map(size => size.data);

                    setFundamentalRetention({ loading: false, year: option, x, y });
                }).catch(error => console.log(error));

                break;

            case 'medioRetention':
                apisaber.get(`/enrollmentsratings/get-medio-retention?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
                    const x = response.data.map(size => size.key);
                    const y = response.data.map(size => size.data);

                    setMedioRetention({ loading: false, year: option, x, y });
                }).catch(error => console.log(error));

                break;

            case 'ejaRetention':
                apisaber.get(`/enrollmentsratings/get-eja-retention?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
                    const x = response.data.map(size => size.key);
                    const y = response.data.map(size => size.data);

                    setEjaRetention({ loading: false, year: option, x, y });
                }).catch(error => console.log(error));

                break;

            default:
                break;
        }
    }

    useEffect(() => {
        apisaber.get(`/enrollments/get-years/?type=${selectedAdministrationType.value}`).then(response => {
            const options = response.data.map(item => item.year);
            setYears(options);
        }).catch(error => console.log(error));

        apisaber.get(`/enrollmentsratings/get-student-retention/?year=${studentRetention.year}&type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map((size) => size.data);

            setStudentRetention({ ...studentRetention, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollmentsratings/get-returning-students-eja/?year=${studentEJA.year}&type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map((size) => size.data);

            setStudentEJA({ ...studentEJA, loading: false, x, y });
        }).catch(error => console.log(error));

        // apisaber.get(`/enrollmentsratings/get-infantil-retention?year=${infantilRetention.year}&type=${selectedAdministrationType.value}`).then(response => {
        //     const x = response.data.map(size => size.key);
        //     const y = response.data.map(size => size.data);

        //     setInfantilRetention({ ...infantilRetention, loading: false, x, y });
        // }).catch(error => console.log(error));

        apisaber.get(`/enrollmentsratings/get-fundamental-retention?year=${fundamentalRetention.year}&type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setFundamentalRetention({ ...fundamentalRetention, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollmentsratings/get-medio-retention?year=${medioRetention.year}&type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setMedioRetention({ ...medioRetention, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollmentsratings/get-eja-retention?year=${ejaRetention.year}&type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setEjaRetention({ ...ejaRetention, loading: false, x, y });
        }).catch(error => console.log(error));
// censo
        apisaber.get(`/enrollments/get-censo-early-fundamental-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoEarlyFundamentalComparison({ ...censoEarlyFundamentalComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-late-fundamental-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoLateFundamentalComparison({ ...censoLateFundamentalComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-infantil-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoInfantilComparison({ ...censoInfantilComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-integral-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoIntegralComparison({ ...censoIntegralComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-medio-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoMedioComparison({ ...censoMedioComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-eja-fundamental-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoEJAFundamentalComparison({ ...censoEJAFundamentalComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-censo-eja-medio-comparison?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setCensoEJAMedioComparison({ ...censoEJAMedioComparison, loading: false, x, y });
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-early-fundamental-students-in-years?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setEarlyFundamentalInYears({ ...earlyFundamentalInYears, useSelect: false, loading: false, x, y})
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-late-fundamental-students-in-years?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setLateFundamentalInYears({ ...lateFundamentalInYears, useSelect: false, loading: false, x, y})
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-first-medio-students-in-years?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setFirstMedioInYears({ ...firstMedioInYears, useSelect: false, loading: false, x, y})
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-second-medio-students-in-years?type=${ selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setSecondMedioInYears({ ...secondMedioInYears, useSelect: false, loading: false, x, y})
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-third-medio-students-in-years?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setThirdMedioInYears({ ...thirdMedioInYears, useSelect: false, loading: false, x, y})
        }).catch(error => console.log(error));

        apisaber.get(`/enrollments/get-integral-students-in-years?type=${selectedAdministrationType.value}`).then(response => {
            const x = response.data.map(size => size.key);
            const y = response.data.map(size => size.data);

            setIntegralInYears({ ...integralInYears, useSelect: false, loading: false, x, y});
        }).catch(error => console.log(error));

    }, [selectedAdministrationType]);

    return (
        <div className='dash'>
            <Header />
            <div id="wrapper">
                <div className="content-area">
                    <div className="container-sm container-fluid">
                        <div className="main">

                            <div className='administration-type'>
                                <Select
                                    className="basic-single"
                                    classNamePrefix="custom-select"
                                    isSearchable={false}
                                    value={selectedAdministrationType}
                                    options={optionsAdministrationType}
                                    components={{ Option: CustomOption }}
                                    filterOption={createFilter({ ignoreAccents: false })}
                                    onChange={value => setSelectedAdministrationType(value)}
                                />
                            </div>


                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={studentRetention.x}
                                            y={studentRetention.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Retenção de alunos"
                                            id="studentRetention"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={studentRetention.loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={studentEJA.x}
                                            y={studentEJA.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Alunos que retornaram pelo EJA"
                                            id="studentEJA"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={studentEJA.loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={infantilRetention.x}
                                            y={infantilRetention.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Retenção de alunos no ensino infantil"
                                            id="infantilRetention"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={infantilRetention.loading}
                                        />
                                    </div>
                                </div>
                            </div> */}

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={fundamentalRetention.x}
                                            y={fundamentalRetention.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Retenção de alunos no ensino fundamental"
                                            id="fundamentalRetention"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={fundamentalRetention.loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={medioRetention.x}
                                            y={medioRetention.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Retenção de alunos no ensino médio"
                                            id="medioRetention"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={medioRetention.loading}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={ejaRetention.x}
                                            y={ejaRetention.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Retenção de alunos no EJA"
                                            id="ejaRetention"
                                            onSelect={onSelectYear}
                                            options={years}
                                            loading={ejaRetention.loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoEarlyFundamentalComparison.x}
                                            y={censoEarlyFundamentalComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos Fundamental (Anos Iniciais) Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoEarlyFundamentalComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoLateFundamentalComparison.x}
                                            y={censoLateFundamentalComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos Fundamental (Anos Finais) Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoLateFundamentalComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoInfantilComparison.x}
                                            y={censoInfantilComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos Infantil Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoInfantilComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoIntegralComparison.x}
                                            y={censoIntegralComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos Integral Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoIntegralComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoMedioComparison.x}
                                            y={censoMedioComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos Médio Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoMedioComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoEJAFundamentalComparison.x}
                                            y={censoEJAFundamentalComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos do EJA Fundamental Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoEJAFundamentalComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <ChartPerYear
                                            x={censoEJAMedioComparison.x}
                                            y={censoEJAMedioComparison.y}
                                            name='Alunos'
                                            type="bar"
                                            title="Quantidade de Alunos do EJA Médio Censo vs Saber"
                                            // id="ejaRetention"
                                            // onSelect={onSelectYear}
                                            options={year_comparison}
                                            loading={censoEJAMedioComparison.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={earlyFundamentalInYears.x}
                                        y={earlyFundamentalInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas do Ensino Fundamental (Anos Iniciais) ao longo dos anos"
                                        id="earlyFundamentalInYears"
                                        useSelect={earlyFundamentalInYears.useSelect}
                                        loading={earlyFundamentalInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={lateFundamentalInYears.x}
                                        y={lateFundamentalInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas do Ensino Fundamental (Anos Finais) ao longo dos anos"
                                        id="lateFundamentalInYears"
                                        useSelect={lateFundamentalInYears.useSelect}
                                        loading={lateFundamentalInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={firstMedioInYears.x}
                                        y={firstMedioInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas na 1ª série ao longo dos anos"
                                        id="firstMedioInYears"
                                        useSelect={firstMedioInYears.useSelect}
                                        loading={firstMedioInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={secondMedioInYears.x}
                                        y={secondMedioInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas na 2ª série ao longo dos anos"
                                        id="secondMedioInYears"
                                        useSelect={secondMedioInYears.useSelect}
                                        loading={secondMedioInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={thirdMedioInYears.x}
                                        y={thirdMedioInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas na 3ª série ao longo dos anos"
                                        id="thirdMedioInYears"
                                        useSelect={thirdMedioInYears.useSelect}
                                        loading={thirdMedioInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 mb-4">
                                <div className="col-lg-12 col-sm-12 mb-sm-4">
                                    <div className="card-box box">
                                        <LineChartBySchool
                                        x={integralInYears.x}
                                        y={integralInYears.y}
                                        name='Matrículas'
                                        type="line"
                                        title="Total matrículas em escolas integrais ao longo dos anos"
                                        id="integralInYears"
                                        useSelect={integralInYears.useSelect}
                                        loading={integralInYears.loading}
                                        administrationType={selectedAdministrationType.value}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}