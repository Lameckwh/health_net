import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  HiOutlineUserAdd,
  HiOutlineEye,
  HiOutlineDocument,
} from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const MedicalHistory = ({role, auth}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newRecord, setNewRecord] = useState({
    patientName: "",
    dateOfDiagnosis: "",
    condition: "",
    treatment: "",
  });
  const [medicalRecords, setMedicalRecords] = useState([
    {
      patientName: "Samantha Phirii",
      dateOfDiagnosis: "2024-08-12",
      condition: "Hypertension",
      treatment: "Medication & Lifestyle Changes",
    },
    {
      patientName: "Innocent Chitimbe",
      dateOfDiagnosis: "2024-09-01",
      condition: "Diabetes Type 2",
      treatment: "Insulin & Diet Control",
    },
    {
      patientName: "Elagant Beauty",
      dateOfDiagnosis: "2024-07-20",
      condition: "Asthma",
      treatment: "Inhaler & Medication",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const patientOptions = [
    "Samantha Phirii",
    "Innocent Chitimbe",
    "Elagant Beauty",
    "John Doe",
    "Jane Smith",
  ];

  const conditionOptions = [
    "Hypertension",
    "Diabetes Type 2",
    "Asthma",
    "Chronic Back Pain",
    "Migraine",
  ];

  const treatmentOptions = [
    "Medication & Lifestyle Changes",
    "Insulin & Diet Control",
    "Inhaler & Medication",
    "Physical Therapy",
    "Painkillers",
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Date of Diagnosis",
        accessor: "dateOfDiagnosis",
      },
      {
        Header: "Condition",
        accessor: "condition",
      },
      {
        Header: "Treatment",
        accessor: "treatment",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleEditRecord(row.index)}
            >
              <FaEdit className="text-xl text-green-600" />
            </button>

            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleDeleteRecord(row.index)}
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
      data: medicalRecords,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleAddMedicalRecord = () => {
    if (isEditing) {
      const updatedRecords = [...medicalRecords];
      updatedRecords[editIndex] = newRecord;
      setMedicalRecords(updatedRecords);
    } else {
      setMedicalRecords([...medicalRecords, newRecord]);
    }
    setIsModalOpen(false);
    setNewRecord({
      patientName: "",
      dateOfDiagnosis: "",
      condition: "",
      treatment: "",
    });
    setIsEditing(false);
  };

  const handleEditRecord = (index) => {
    setEditIndex(index);
    setNewRecord(medicalRecords[index]);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (index) => {
    const updatedRecords = medicalRecords.filter((_, i) => i !== index);
    setMedicalRecords(updatedRecords);
  };

  return (
<>
<Head title="Medical History"/>
<Layout role={role} authUser={auth.user}>
<div className="">
      <div className="flex justify-end mt-4 mb-2">
        <div className="flex space-x-4 items-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <HiOutlineUserAdd className="text-xl text-white" />
            <div>{isEditing ? "Edit Record" : "New Record"}</div>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Medical History</h2>
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
              {isEditing ? "Edit Medical Record" : "Add Medical Record"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddMedicalRecord();
              }}
            >
              <div className="mb-4">
                <label htmlFor="patientName" className="block font-medium">
                  Patient Name
                </label>
                <select
                  id="patientName"
                  value={newRecord.patientName}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, patientName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Patient</option>
                  {patientOptions.map((patient) => (
                    <option key={patient} value={patient}>
                      {patient}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfDiagnosis" className="block font-medium">
                  Date of Diagnosis
                </label>
                <input
                  id="dateOfDiagnosis"
                  type="date"
                  value={newRecord.dateOfDiagnosis}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, dateOfDiagnosis: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="condition" className="block font-medium">
                  Condition
                </label>
                <select
                  id="condition"
                  value={newRecord.condition}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, condition: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Condition</option>
                  {conditionOptions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="treatment" className="block font-medium">
                  Treatment
                </label>
                <select
                  id="treatment"
                  value={newRecord.treatment}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, treatment: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Treatment</option>
                  {treatmentOptions.map((treatment) => (
                    <option key={treatment} value={treatment}>
                      {treatment}
                    </option>
                  ))}
                </select>
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
                  {isEditing ? "Update Record" : "Add Record"}
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

export default MedicalHistory;
