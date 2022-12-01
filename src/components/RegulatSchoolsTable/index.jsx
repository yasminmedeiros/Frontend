import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { DataGrid } from '@material-ui/data-grid';
import { CustomPagination } from './footer'

import { useEffect } from 'react';
import { Spinner } from '../Spinner';

import './styles.css';


const Tabela = (props) => {
    const [schoolsInfos, setSchoolsInfos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
    }, [props.administrationType]);

    return (
        <div id="datatable">
            {schoolsInfos.length > 0 ? (
                <div className='content-table'>
                    <div className="download-area">
                        Download
                        <CSVLink data={handleDownloadCsv()} filename={'escolas.csv'}>
                            <button variant='outlined'>
                                CSV
                            </button>
                        </CSVLink>

                        <button variant='outlined' onClick={handleDownloadPdf}>
                            PDF
                        </button>

                        {loading && (<Spinner className="loading-buttons" />)}
                    </div>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        autoPageSize
                        pagination
                        components={{
                            pagination: CustomPagination,
                            // Header: () => <DownloadButton schoolsInfos={schoolsInfos} />
                        }}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

export default Tabela;
