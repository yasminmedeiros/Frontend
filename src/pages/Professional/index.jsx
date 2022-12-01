import React, { useState, useEffect } from 'react';

import apiSaber from '../../services/apisaber';
import DataTable from '../../components/Datatable';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { ChartPerYear } from '../../components/ChartPerYear/ChartPerYear';
import { LineChartBySchool } from '../../components/LineChartBySchool/LineChartBySchool';
import apisaber from '../../services/apisaber';
import './styles.css';
import Select, { createFilter } from 'react-select';
import CustomOption from "../../components/Options/CustomOption";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Professional() {
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

  const [schoolsPerSize, setSchoolsPerSize] = useState(dataChart);
  const [enrollmentsPerSize, setEnrollmentsPerSize] = useState(dataChart);
  const [averagesPersize, setAveragePerSize] = useState(dataChart);
  const [schoolsPerGre, setSchoolsPerGre] = useState(dataChart);
  const [enrollmentsPerGre, setEnrollmentsPerGre] = useState(dataChart);
  const [averagesPerGre, setAveragesPerGre] = useState(dataChart);
  const [highestEnrollments, setHighestEnrollments] = useState(dataChart);
  const [enrollmentsJP, setEnrollmentsJP] = useState(dataChart);
  const [enrollmentsCG, setEnrollmentsCG] = useState(dataChart);
  const [totalEnrollmentsInYears, setTotalEnrollmentsInYears] = useState(dataLineChart);
  const [schoolsInYearsPerGre, setSchoolsInYearsPerGre] = useState(dataLineChart);
  const [schoolsInYearsPerSize, setSchoolsInYearsPerSize] = useState(dataLineChart);
  const [regularSchoolsInYears, setRegularSchoolsInYears] = useState(dataLineChart);
  const [years, setYears] = useState([]);
  const [selectedAdministrationType, setSelectedAdministrationType] = useState({ label: 'Todos', value: 3 });
  const [schoolsInfos, setSchoolsInfos] = useState([]);
  const [loadingTabel, setLoadingTabel] = useState(false);
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

  const head = ['ID', 'Escola'];
  const DataTableColumns = [
    { field: 'id', headerName: head[0], flex: 0.10, headerAlign: 'center', headerClassName: 'theme-header', align: 'center' },
    { field: 'school', headerName: head[1], flex: 0.15, headerAlign: 'center', headerClassName: 'theme-header', align: 'center' },

  ];

  function handleDownloadPdf() {
    const doc = new jsPDF();
    const lines = [];

    setLoadingTabel(true);

    schoolsInfos.forEach((item, index) => {
      lines.push([
        index + 1,
        item.school,
      ]);
    });

    doc.autoTable({
      head: [],
      body: lines,
    });

    doc.save('escolas.pdf');

    setLoadingTabel(false);
  }

  function handleDownloadCsv() {
    const serialized = schoolsInfos.map((item, index) => ({
      ID: index + 1,
      Escola: item.school,
    }));

    return serialized;
  }

  const rows = schoolsInfos.map((item, index) => ({
    id: index + 1,
    school: item.school,
  }));

  function onSelectYear(id, option) {
    switch (id) {
      case 'highestEnrollments':
        setHighestEnrollments({ ...highestEnrollments, loading: true });
        apiSaber.get(`/enrollments/get-pro-highest-enroll/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(item => item.escolas);
          const y = response.data.map(item => item.sum);

          setHighestEnrollments({ loading: false, year: option, x, y });
        });
        break;

      case 'enrollmentsJP':
        setEnrollmentsJP({ ...enrollmentsJP, loading: true });
        apiSaber.get(`/enrollments/get-pro-schools-per-city/?cityName=João Pessoa&year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(item => item.escolas);
          const y = response.data.map(item => item.sum);

          setEnrollmentsJP({ loading: false, year: option, x, y });
        });
        break;

      case 'enrollmentsCG':
        setEnrollmentsCG({ ...enrollmentsCG, loading: true });
        apiSaber.get(`/enrollments/get-pro-schools-per-city/?cityName=Campina Grande&year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(item => item.escolas);
          const y = response.data.map(item => item.sum);

          setEnrollmentsCG({ loading: false, year: option, x, y });
        });
        break;

      case 'schoolsPerSize':
        setSchoolsPerSize({ ...schoolsPerSize, loading: true });
        apiSaber.get(`/enrollments/get-pro-schools-by-size/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.slice(1, 17).map(size => size.key);
          const y = response.data.slice(1, 17).map((size) => size.data);

          setSchoolsPerSize({ loading: false, year: option, x, y });
        }).catch(error => console.log(error));
        break;

      case 'enrollmentsPerSize':
        setEnrollmentsPerSize({ ...enrollmentsPerSize, loading: true });
        apiSaber.get(`/enrollments/get-pro-enrollments-by-size/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.slice(1, 17).map(size => size.key);
          const y = response.data.slice(1, 17).map((size) => size.data);

          setEnrollmentsPerSize({ loading: false, year: option, x, y });
        }).catch(error => console.log(error));
        break;

      case 'averagesPersize':
        setAveragePerSize({ ...averagesPersize, loading: true });
        apiSaber.get(`/enrollments/get-pro-averages-by-size/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.slice(1, 17).map(size => size.key);
          const y = response.data.slice(1, 17).map((size) => size.data);

          setAveragePerSize({ loading: false, year: option, x, y });
        }).catch(error => console.log(error));
        break;

      case 'schoolsPerGre':
        setSchoolsPerGre({ ...schoolsPerGre, loading: true });
        apiSaber.get(`/enrollments/get-pro-schools-by-gre/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(size => size.key);
          const y = response.data.map((size) => size.data);

          setSchoolsPerGre({ loading: false, year: option, x, y });
        }).catch(error => console.log(error));
        break;

      case 'enrollmentsPerGre':
        setEnrollmentsPerGre({ ...enrollmentsPerGre, loading: true });
        apiSaber.get(`/enrollments/get-pro-enrollments-by-gre/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(size => size.key);
          const y = response.data.map((size) => size.data);

          setEnrollmentsPerGre({ loading: false, year: option, x, y });

        }).catch(error => console.log(error));
        break;

      case 'averagesPerGre':
        setAveragesPerGre({ ...averagesPerGre, loading: true });
        apiSaber.get(`/enrollments/get-pro-averages-by-gre/?year=${option}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(size => size.key);
          const y = response.data.map((size) => size.data);

          setAveragesPerGre({ loading: false, year: option, x, y });
        }).catch(error => console.log(error));
        break;

      default:
        break;
    }
  }

  function onSelectSchool(id, value) {
    switch (id) {
      case 'schoolsInYearsPerGre':
        setSchoolsInYearsPerGre({ ...schoolsInYearsPerGre, loading: true });
        apisaber.get(`/schools/pro-in-years-gre/?gre_id=${value}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(item => item.key);
          const y = response.data.map(item => item.data);

          setSchoolsInYearsPerGre({
            ...schoolsInYearsPerGre,
            loading: false,
            data_id: value,
            x,
            y,
          });
        });
        break;

      case 'schoolsInYearsPerSize':
        setSchoolsInYearsPerSize({ ...schoolsInYearsPerSize, loading: true });
        apisaber.get(`/schools/pro-in-years-size/?size_id=${value}&type=${selectedAdministrationType.value}`).then(response => {
          const x = response.data.map(item => item.key);
          const y = response.data.map(item => item.data);

          setSchoolsInYearsPerSize({
            ...schoolsInYearsPerSize,
            loading: false,
            data_id: value,
            x,
            y,
          });
        });
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    apiSaber.get(`/enrollments/get-years/?type=${selectedAdministrationType.value}`).then(response => {
      const options = response.data.map(item => item.year);
      setYears(options);
    }).catch(error => console.log(error));

    if (highestEnrollments.year) {
      apiSaber.get(`/enrollments/get-pro-highest-enroll/?year=${highestEnrollments.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(item => item.escolas);
        const y = response.data.map(item => item.sum);

        setHighestEnrollments({ ...highestEnrollments, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (enrollmentsJP.year) {
      apiSaber.get(`/enrollments/get-pro-schools-per-city/?cityName=João Pessoa&year=${enrollmentsJP.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(item => item.escolas);
        const y = response.data.map(item => item.sum);

        setEnrollmentsJP({ ...enrollmentsJP, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (enrollmentsCG.year) {
      apiSaber.get(`/enrollments/get-pro-schools-per-city/?cityName=Campina Grande&year=${enrollmentsCG.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(item => item.escolas);
        const y = response.data.map(item => item.sum);

        setEnrollmentsCG({ ...enrollmentsCG, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (schoolsPerSize.year) {
      apiSaber.get(`/enrollments/get-pro-schools-by-size/?year=${schoolsPerSize.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.slice(1, 17).map(size => size.key);
        const y = response.data.slice(1, 17).map((size) => size.data);

        setSchoolsPerSize({ ...schoolsPerSize, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (enrollmentsPerSize.year) {
      apiSaber.get(`/enrollments/get-pro-enrollments-by-size/?year=${enrollmentsPerSize.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.slice(1, 17).map(size => size.key);
        const y = response.data.slice(1, 17).map((size) => size.data);

        setEnrollmentsPerSize({ ...enrollmentsPerSize, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (averagesPersize.year) {
      apiSaber.get(`/enrollments/get-pro-averages-by-size/?year=${averagesPersize.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.slice(1, 17).map(size => size.key);
        const y = response.data.slice(1, 17).map((size) => size.data);

        setAveragePerSize({ ...averagesPersize, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (schoolsPerGre.year) {
      apiSaber.get(`/enrollments/get-pro-schools-by-gre/?year=${schoolsPerGre.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(size => size.key);
        const y = response.data.map((size) => size.data);

        setSchoolsPerGre({ ...schoolsPerGre, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (enrollmentsPerGre.year) {
      apiSaber.get(`/enrollments/get-pro-enrollments-by-gre/?year=${enrollmentsPerGre.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(size => size.key);
        const y = response.data.map((size) => size.data);

        setEnrollmentsPerGre({ ...enrollmentsPerGre, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    if (averagesPerGre.year) {
      apiSaber.get(`/enrollments/get-pro-averages-by-gre/?year=${averagesPerGre.year}&type=${selectedAdministrationType.value}`).then(response => {
        const x = response.data.map(size => size.key);
        const y = response.data.map((size) => size.data);

        setAveragesPerGre({ ...averagesPerGre, loading: false, x, y });
      }).catch(error => console.log(error));
    }

    apisaber.get(
      `/schools/pro-in-years-gre/?gre_id=${schoolsInYearsPerGre.data_id === 0 ? 1 : schoolsInYearsPerGre.data_id}&type=${selectedAdministrationType.value}`
    ).then(response => {
      const x = response.data.map(item => item.key);
      const y = response.data.map(item => item.data);

      setSchoolsInYearsPerGre({ ...schoolsInYearsPerGre, loading: false, x, y });
    }).catch(error => console.log(error));

    apisaber.get(
      `/schools/pro-in-years-size/?size_id=${schoolsInYearsPerSize.data_id === 0 ? 1 : schoolsInYearsPerSize.data_id}&type=${selectedAdministrationType.value}`
    ).then(response => {
      const x = response.data.map(item => item.key);
      const y = response.data.map(item => item.data);

      setSchoolsInYearsPerSize({ ...schoolsInYearsPerSize, loading: false, x, y });
    }).catch(error => console.log(error));

    apiSaber.get(`/enrollments/pro-total-in-years?type=${selectedAdministrationType.value}`).then(response => {
      const x = response.data.map(item => item.key);
      const y = response.data.map(item => item.data);

      setTotalEnrollmentsInYears({ ...totalEnrollmentsInYears, useSelect: false, loading: false, x, y });
    }).catch(error => console.log(error));

    apiSaber.get(`/enrollments/get-pro-schools-that-were-regular-in-years/?type=${selectedAdministrationType.value}`).then(response => {
      const x = response.data.map(item => item.key);
      const y = response.data.map(item => item.data);

      setRegularSchoolsInYears({ ...regularSchoolsInYears, useSelect: false, loading: false, x, y });
    }).catch(error => console.log(error));

    apisaber.get(`/enrollments/get-pro-schools-that-were-regular?type=${selectedAdministrationType.value}`).then(response => {
      const serialized = response.data.map(item => {
        return {
          id: item.school_id,
          school: item.escolas,
        }
      });

      setSchoolsInfos(serialized);
    });
  }, [selectedAdministrationType]);

  // function search(rows) {
  //   return rows.filter((row) =>
  //     searchColumns.some(
  //       (column) =>
  //         row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
  //     )
  //   );
  // }

  // const columns = escolas[0] && Object.keys(escolas[0]).filter((column) => column !== 'field1' && column !== 'Unnamed: 7');

  return (
    <div className="dash">
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
                    <LineChartBySchool
                      x={totalEnrollmentsInYears.x}
                      y={totalEnrollmentsInYears.y}
                      name='Matrículas'
                      type="line"
                      title="Total de matrículas na Paraíba ao longo dos anos"
                      id="totalEnrollmentsInYears"
                      // onChange={onSelectSchool}
                      useSelect={totalEnrollmentsInYears.useSelect}
                      loading={totalEnrollmentsInYears.loading}
                      administrationType={selectedAdministrationType.value}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-12 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <ChartPerYear
                      x={highestEnrollments.x}
                      y={highestEnrollments.y}
                      name='Matrículas'
                      type="bar"
                      title="Escolas paraibanas com maior número de matrículas"
                      id="highestEnrollments"
                      onSelect={onSelectYear}
                      options={years}
                      loading={highestEnrollments.loading}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-6 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <ChartPerYear
                      x={enrollmentsJP.x}
                      y={enrollmentsJP.y}
                      name='Matrículas'
                      // color={color}
                      type="bar"
                      title="Escolas de João Pessoa com mais Matrículas"
                      id="enrollmentsJP"
                      onSelect={onSelectYear}
                      options={years}
                      loading={enrollmentsJP.loading}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                  <div className="card-box box">
                    <ChartPerYear
                      x={enrollmentsCG.x}
                      y={enrollmentsCG.y}
                      name='Matrículas'
                      type="bar"
                      title="Escolas de Campina Grande com mais Matrículas"
                      id="enrollmentsCG"
                      onSelect={onSelectYear}
                      options={years}
                      loading={enrollmentsCG.loading}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-6 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <ChartPerYear
                      x={schoolsPerSize.x}
                      y={schoolsPerSize.y}
                      name='Escolas'
                      type="bar"
                      title="Total de Escolas por Porte"
                      id="schoolsPerSize"
                      onSelect={onSelectYear}
                      options={years}
                      loading={schoolsPerSize.loading}
                    />
                  </div>
                </div>


                <div className="col-lg-6 col-sm-12">
                  <div className="card-box box">
                    <ChartPerYear
                      x={schoolsPerGre.x}
                      y={schoolsPerGre.y}
                      name='Escolas'
                      type="bar"
                      title="Total de Escolas por GRE"
                      id="schoolsPerGre"
                      onSelect={onSelectYear}
                      options={years}
                      loading={schoolsPerGre.loading}
                      viewPercent={true}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-6 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <ChartPerYear
                      x={enrollmentsPerSize.x}
                      y={enrollmentsPerSize.y}
                      name='Matrículas'
                      // color={color}
                      type="bar"
                      title="Total de Matrículas por Porte"
                      id="enrollmentsPerSize"
                      onSelect={onSelectYear}
                      options={years}
                      loading={enrollmentsPerSize.loading}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                  <div className="card-box box">
                    <ChartPerYear
                      x={enrollmentsPerGre.x}
                      y={enrollmentsPerGre.y}
                      name='Matrículas'
                      type="bar"
                      title="Total de Matrículas por GRE"
                      id="enrollmentsPerGre"
                      onSelect={onSelectYear}
                      options={years}
                      loading={enrollmentsPerGre.loading}
                      viewPercent={true}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-6 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <ChartPerYear
                      x={averagesPersize.x}
                      y={averagesPersize.y}
                      name='Matrículas'
                      // color={color}
                      type="bar"
                      title="Média de Matrículas por Porte"
                      id="averagesPersize"
                      onSelect={onSelectYear}
                      options={years}
                      loading={averagesPersize.loading}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-12">
                  <div className="card-box box">
                    <ChartPerYear
                      x={averagesPerGre.x}
                      y={averagesPerGre.y}
                      name='Matrículas'
                      // color={color}
                      type="bar"
                      title="Média de Matrículas por GRE"
                      id="averagesPerGre"
                      onSelect={onSelectYear}
                      options={years}
                      loading={averagesPerGre.loading}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-12 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <LineChartBySchool
                      x={schoolsInYearsPerGre.x}
                      y={schoolsInYearsPerGre.y}
                      name='Escolas'
                      type="line"
                      title="Total de escolas por GRE ao longo dos anos"
                      id="schoolsInYearsPerGre"
                      onChange={onSelectSchool}
                      useSelect={schoolsInYearsPerGre.useSelect}
                      loading={schoolsInYearsPerGre.loading}
                      by="gre"
                      administrationType={selectedAdministrationType.value}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-lg-12 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <LineChartBySchool
                      x={schoolsInYearsPerSize.x}
                      y={schoolsInYearsPerSize.y}
                      name='Escolas'
                      type="line"
                      title="Total de escolas por porte ao longo dos anos"
                      id="schoolsInYearsPerSize"
                      onChange={onSelectSchool}
                      useSelect={schoolsInYearsPerSize.useSelect}
                      loading={schoolsInYearsPerSize.loading}
                      by="size"
                      administrationType={selectedAdministrationType.value}
                    />
                  </div>
                </div>
              </div>


              <div className="row mt-4 mb-4">
                <div className="col-lg-12 col-sm-12 mb-sm-4">
                  <div className="card-box box">
                    <LineChartBySchool
                      x={regularSchoolsInYears.x}
                      y={regularSchoolsInYears.y}
                      name='Escolas'
                      type="line"
                      title="Quantidade de escolas regulares que se tornaram profissionais ao longo dos anos"
                      id="regularSchoolsInYears"
                      loading={regularSchoolsInYears.loading}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 bm-4">
              <div className="col">
                <div className="table box">
                  <DataTable
                    title="Escolas regulares que se tornaram profissionais"
                    infos={schoolsInfos}
                    rows={rows}
                    columns={DataTableColumns}
                    head={head}
                    downloadCsv={handleDownloadCsv}
                    downloadPdf={handleDownloadPdf}
                    loading={loadingTabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Professional;
