import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

const DataTable = ({ data, columns }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: data,
      columns: columns,
      responsive: true, // Membuat tabel responsif
      paging: true, // Mengaktifkan paging
      lengthChange: true, // Menampilkan opsi ganti panjang halaman
      searching: true, // Membuat kotak pencarian
      ordering: true, // Mengaktifkan pengurutan
      info: true, // Menampilkan informasi jumlah data
      autoWidth: false, // Menonaktifkan penyesuaian lebar otomatis
    });

    return () => {
      // Hancurkan tabel saat komponen dilepas
      table.destroy();
    };
  }, [data, columns]);

  return (
    <table className="table table-striped table-bordered table-hover" ref={tableRef}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default DataTable;
