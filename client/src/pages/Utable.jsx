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

const Table = ({ rno }) => {
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
        const response = await axios.get(
          `http://localhost:5555/tirereports/${rno}`
        );
        setTireReport(response.data);
        console.log("responce from server:", response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rno]);

  const results = tireReport.reports;
  const phoneNo = tireReport.phoneNo;
  const regisNo = tireReport.regisNo;

  const data = useMemo(() => results, [tireReport]);
  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    {
      Header: "Label",
      accessorKey: "label",
    },
    {
      Header: "Tire Damage",
      accessorKey: "damage",
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
      accessorKey: "imageUrl", // Assuming you have an 'imageUrl' property in your data
      cell: (cell) => (
        <button onClick={() => handleShowImageClick(cell.row.original.imageName)}>
          Show Image
        </button>
      ),
    },
  ];
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: data,
    columns: columns,
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

  // You can use the 'rno' prop to render the necessary data in your table
  if (loading) {
    // Render loading state or a placeholder
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
    <br />
      <div >
        <h6 id="text" > Registration number : {regisNo}</h6>
        <h6 id="text" > Phone Number : {phoneNo}</h6>
      </div>
      <div>
        <input
        id="searchbox"
        className="form-control"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="search..."
        />

        <table
          id="usertable"
          className="table table-striped table-hover table-bordered"
        >
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
              <tr key={row.id}  >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="buttons">
          <button id="firstpage" onClick={() => table.setPageIndex(0)}>
            First page
          </button>
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
          <button
            id="lastpage"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last page
          </button>
        </div>
      </div>
      {modalopen&& (
        <Modal
          onClose={handleCloseModal}
          imageName={imageName}
        />
      )}
    </div>
  );
};

export default Table;
