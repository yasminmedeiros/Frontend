import React, { useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import { CustomPagination } from './footer'

import { Spinner } from '../Spinner';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
// import { DownloadButton } from '../DownloadButton/DownloadButton';

import './styles.css';
import { NoDataMessage } from '../NoDataMessage';

/** props
 * 
 * title
 * infos
 * rows
 * columns
 * head
 * downloadCsv
 * downloadPdf
 * loading
 * 
 */

const Tabela = (props) => {

  return (
    <div id="datatable">
      {props.infos.length > 0 ? (
        <div className='content-table'>
          <div className='header-table'>
            <div className="download-area">
              Download
              <CSVLink data={props.downloadCsv()} filename={'escolas.csv'}>
                <button variant='outlined'>
                  CSV
                </button>
              </CSVLink>

              <button variant='outlined' onClick={props.downloadPdf}>
                PDF
              </button>

              {props.loading && (<Spinner className="loading-buttons" />)}
            </div>

            <h1>{props.title}</h1>
          </div>

          <DataGrid
            rows={props.rows}
            columns={props.columns}
            autoPageSize
            pagination
            components={{
              pagination: CustomPagination,
              // Header: () => <DownloadButton schoolsInfos={schoolsInfos} />
            }}
          />
        </div>
      ) : (
        <NoDataMessage />
      )}
    </div>
  );
};

export default Tabela;
