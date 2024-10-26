import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Complaints = ({ role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    date: "",
    complaintText: "",
  });
  const [complaints, setComplaints] = useState([
    {
      date: "2024-08-12",
      complaintText: "Delayed response from staff.",
    },
    {
      date: "2024-09-01",
      complaintText: "Unavailability of prescribed medication.",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Complaint",
        accessor: "complaintText",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleEditComplaint(row.index)}
            >
              <FaEdit className="text-xl text-green-600" />
            </button>

            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleDeleteComplaint(row.index)}
            >
              <FaTrash className="text-xl text-red-600" />
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
      data: complaints,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleAddComplaint = () => {
    if (isEditing) {
      const updatedComplaints = [...complaints];
      updatedComplaints[editIndex] = newComplaint;
      setComplaints(updatedComplaints);
    } else {
      setComplaints([...complaints, newComplaint]);
    }
    setIsModalOpen(false);
    setNewComplaint({
      date: "",
      complaintText: "",
    });
    setIsEditing(false);
  };

  const handleEditComplaint = (index) => {
    setEditIndex(index);
    setNewComplaint(complaints[index]);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteComplaint = (index) => {
    const updatedComplaints = complaints.filter((_, i) => i !== index);
    setComplaints(updatedComplaints);
  };

  return (
    <>
      <Head title="Complaints" />
      <Layout role={role}>
        <div className="">
          <div className="flex justify-end mt-4 mb-2">
            <div className="flex space-x-4 items-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
                onClick={() => setIsModalOpen(true)}
              >
                <HiOutlineUserAdd className="text-xl text-white" />
                <div>{isEditing ? "Edit Complaint" : "New Complaint"}</div>
              </button>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Complaints</h2>
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
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-md w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">
                  {isEditing ? "Edit Complaint" : "Add Complaint"}
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComplaint();
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="date" className="block font-medium">
                      Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={newComplaint.date}
                      onChange={(e) =>
                        setNewComplaint({ ...newComplaint, date: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="complaintText" className="block font-medium">
                      Complaint
                    </label>
                    <textarea
                      id="complaintText"
                      value={newComplaint.complaintText}
                      onChange={(e) =>
                        setNewComplaint({ ...newComplaint, complaintText: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      {isEditing ? "Update Complaint" : "Add Complaint"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Complaints;
