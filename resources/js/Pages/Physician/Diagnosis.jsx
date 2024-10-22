import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Diagnosis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newDiagnosis, setNewDiagnosis] = useState({
    patientName: "",
    diagnosisDate: "",
    condition: "",
    physician: "",
  });
  const [diagnoses, setDiagnoses] = useState([
    {
      patientName: "Lucius Malizani",
      diagnosisDate: "2023-06-15",
      condition: "Diabetes",
      physician: "Dr. Smith",
    },
    {
      patientName: "Lameck Mbewe",
      diagnosisDate: "2023-07-20",
      condition: "Hypertension",
      physician: "Dr. Johnson",
    },
    {
      patientName: "Victoria Kasoti",
      diagnosisDate: "2023-08-05",
      condition: "Asthma",
      physician: "Dr. Brown",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Diagnosis Date",
        accessor: "diagnosisDate",
      },
      {
        Header: "Condition",
        accessor: "condition",
      },
      {
        Header: "Physician",
        accessor: "physician",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleEditDiagnosis(row.index)}
            >
              <FaEdit className="text-xl text-green-600" />
            </button>

            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleDeleteDiagnosis(row.index)}
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
      data: diagnoses,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleAddDiagnosis = () => {
    if (isEditing) {
      const updatedDiagnoses = [...diagnoses];
      updatedDiagnoses[editIndex] = newDiagnosis;
      setDiagnoses(updatedDiagnoses);
    } else {
      setDiagnoses([...diagnoses, newDiagnosis]);
    }
    setIsModalOpen(false);
    setNewDiagnosis({
      patientName: "",
      diagnosisDate: "",
      condition: "",
      physician: "",
    });
    setIsEditing(false);
  };

  const handleEditDiagnosis = (index) => {
    setEditIndex(index);
    setNewDiagnosis(diagnoses[index]);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteDiagnosis = (index) => {
    const updatedDiagnoses = diagnoses.filter((_, i) => i !== index);
    setDiagnoses(updatedDiagnoses);
  };

  return (
<>
<Head title="Diagnosis"/>
<Layout>
<div className="">
      <div className="flex justify-end mt-4 mb-2">
        <div className="flex space-x-4 items-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <HiOutlineUserAdd className="text-xl text-white" />
            <div>{isEditing ? "Edit Diagnosis" : "New Diagnosis"}</div>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Diagnosis Records</h2>
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
          <div className="bg-white p-6 rounded-md w-full max-w-lg mx-4">
            <h2 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Diagnosis" : "Add Diagnosis"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddDiagnosis();
              }}
            >
              <div className="mb-4">
                <label htmlFor="patientName" className="block font-medium">
                  Patient Name
                </label>
                <input
                  id="patientName"
                  type="text"
                  value={newDiagnosis.patientName}
                  onChange={(e) =>
                    setNewDiagnosis({ ...newDiagnosis, patientName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="diagnosisDate" className="block font-medium">
                  Diagnosis Date
                </label>
                <input
                  id="diagnosisDate"
                  type="date"
                  value={newDiagnosis.diagnosisDate}
                  onChange={(e) =>
                    setNewDiagnosis({ ...newDiagnosis, diagnosisDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="condition" className="block font-medium">
                  Condition
                </label>
                <input
                  id="condition"
                  type="text"
                  value={newDiagnosis.condition}
                  onChange={(e) =>
                    setNewDiagnosis({ ...newDiagnosis, condition: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="physician" className="block font-medium">
                  Physician
                </label>
                <input
                  id="physician"
                  type="text"
                  value={newDiagnosis.physician}
                  onChange={(e) =>
                    setNewDiagnosis({ ...newDiagnosis, physician: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {isEditing ? "Update" : "Add"}
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

export default Diagnosis;
