import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { FaTrashAlt } from "react-icons/fa";
import { HiOutlineUserAdd, HiOutlineSearch } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Users = () => {
  const { props } = usePage(); // Fetch props passed from Inertia
  const usersData = props.users; // Get users data from the backend

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({ row }) => (
          <div className="relative">
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded-md"
              onClick={() => handleRoleChange(row.original)}
            >
              {row.original.role}
            </button>
          </div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span
            className={`px-2 py-1 rounded ${
              value === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {value}
          </span>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDeactivateUser(row.original)}
            >
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: usersData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleDeactivateUser = (user) => {
    console.log("Deactivating user:", user.name);
    // Logic for deactivating user
  };

  const handleRoleChange = (user, newRole) => {
    console.log(`Changing role for ${user.name} to ${newRole}`);
    // Logic to change the user's role
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mt-4 mb-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <HiOutlineUserAdd className="text-xl text-white" />
          <div>Add User</div>
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users Information</h2>
          <div className="max-w-md">
            <div className="flex rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full outline-none bg-gray-200 rounded-md text-gray-600 text-sm px-4 py-2"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">
                <HiOutlineSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full bg-white">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="text-left p-4 border-b"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="p-4 border-b">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                {"<<"}
              </button>
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                {"<"}
              </button>
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                {">"}
              </button>
              <button
                onClick={() => gotoPage(pageOptions.length - 1)}
                disabled={!canNextPage}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                {">>"}
              </button>
            </div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
