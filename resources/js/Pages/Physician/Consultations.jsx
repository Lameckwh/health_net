import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Consultations = ({role, auth}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newConsultation, setNewConsultation] = useState({
    patientName: "",
    consultationDate: "",
    physicianName: "",
    notes: "",
  });
  const [consultations, setConsultations] = useState([
    {
      patientName: "Samantha Phirii",
      consultationDate: "2024-08-12",
      physicianName: "Dr. John Smith",
      notes: "Follow-up on blood pressure.",
    },
    {
      patientName: "Innocent Chitimbe",
      consultationDate: "2024-09-01",
      physicianName: "Dr. Jane Doe",
      notes: "Discussed medication adjustments.",
    },
    {
      patientName: "Elagant Beauty",
      consultationDate: "2024-07-20",
      physicianName: "Dr. John Smith",
      notes: "Reviewed asthma management plan.",
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

  const physicianOptions = [
    "Dr. John Smith",
    "Dr. Jane Doe",
    "Dr. Richard Roe",
    "Dr. Alice Johnson",
  ];

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "patientName",
      },
      {
        Header: "Consultation Date",
        accessor: "consultationDate",
      },
      {
        Header: "Physician Name",
        accessor: "physicianName",
      },
      {
        Header: "Notes",
        accessor: "notes",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleEditConsultation(row.index)}
            >
              <FaEdit className="text-xl text-green-600" />
            </button>

            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleDeleteConsultation(row.index)}
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
      data: consultations,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleAddConsultation = () => {
    if (isEditing) {
      const updatedConsultations = [...consultations];
      updatedConsultations[editIndex] = newConsultation;
      setConsultations(updatedConsultations);
    } else {
      setConsultations([...consultations, newConsultation]);
    }
    setIsModalOpen(false);
    setNewConsultation({
      patientName: "",
      consultationDate: "",
      physicianName: "",
      notes: "",
    });
    setIsEditing(false);
  };

  const handleEditConsultation = (index) => {
    setEditIndex(index);
    setNewConsultation(consultations[index]);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteConsultation = (index) => {
    const updatedConsultations = consultations.filter((_, i) => i !== index);
    setConsultations(updatedConsultations);
  };

  return (
    <>
    <Head title="Consultations"/>
    <Layout role={role} authUser={auth.user}>
    <div className="">
      <div className="flex justify-end mt-4 mb-2">
        <div className="flex space-x-4 items-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <HiOutlineUserAdd className="text-xl text-white" />
            <div>{isEditing ? "Edit Consultation" : "New Consultation"}</div>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Consultations</h2>
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
              {isEditing ? "Edit Consultation" : "Add Consultation"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddConsultation();
              }}
            >
              <div className="mb-4">
                <label htmlFor="patientName" className="block font-medium">
                  Patient Name
                </label>
                <select
                  id="patientName"
                  value={newConsultation.patientName}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, patientName: e.target.value })
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
                <label htmlFor="consultationDate" className="block font-medium">
                  Consultation Date
                </label>
                <input
                  id="consultationDate"
                  type="date"
                  value={newConsultation.consultationDate}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, consultationDate: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="physicianName" className="block font-medium">
                  Physician Name
                </label>
                <select
                  id="physicianName"
                  value={newConsultation.physicianName}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, physicianName: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Physician</option>
                  {physicianOptions.map((physician) => (
                    <option key={physician} value={physician}>
                      {physician}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block font-medium">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={newConsultation.notes}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, notes: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setNewConsultation({
                      patientName: "",
                      consultationDate: "",
                      physicianName: "",
                      notes: "",
                    });
                  }}
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

export default Consultations;
