import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import Loading from "../components/Loading";



const Table = () => {
  const [tireReport, setTireReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageName, setimageName] = useState("");
  const [modalopen, setModalopen] = useState(false);

  const handleShowImageClick = (imageName) => {
    console.log(imageName);
    setimageName(imageName);
    setModalopen(true);
  };
  
  const handleCloseModal = () => {
    setModalopen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/tirereports/`);
        setTireReport(response.data);
        console.log("responce from server:",response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []);

  const data = useMemo(() => tireReport, [tireReport]);
  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      Header: "Registration Number",
      accessorKey: "regisNo",
    },
    {
      Header: "Phone Number",
      accessorKey: "phoneNo",
    },
    {
      Header: "Label",
      accessorKey: "label",
    },
    {
      Header: "Toll Location",
      accessorKey: "tollPlaza",
    },
    {
      Header: "Date",
      accessorKey: "createdAt",
    },
    {
      Header: "Show Image",
      accessorKey: "imageUrl",
      cell: (cell) => (
        <button
          onClick={() => handleShowImageClick(cell.row.original.imageName)}
        >
          Show Image
        </button>
      ),
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data : data,
    columns : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (loading) {
    <Loading />
  }
  return (
    <>
    <div className="container" id="dealer">
    <h1>Tire Reports</h1>
    <br />
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="search"
      />
      <table id="usertable"className="table table-striped table-hover table-bordered">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                id="userth"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th 
                id="userth"
                key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="buttons">
        <button
        id="prevpage"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
        id="nextpage"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
      </div>
    </div>
    {modalopen && <Modal onClose={handleCloseModal} imageName={imageName} />}
    </>
  );
};

export default Table;
