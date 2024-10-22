import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Patients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    district: "",
    nationalId: "",
    medicalCondition: "",
  });
  const [patients, setPatients] = useState([
    {
      name: "Lucius Malizani",
      gender: "Male",
      dateOfBirth: "1990-01-01",
      nationality: "Malawian",
      district: "Lilongwe",
      nationalId: "A123456789",
      medicalCondition: "Diabetes",
    },
    {
      name: "Lameck Mbewe",
      gender: "Male",
      dateOfBirth: "1992-05-12",
      nationality: "Malawian",
      district: "Blantyre",
      nationalId: "B987654321",
      medicalCondition: "Hypertension",
    },
    {
      name: "Victoria Kasoti",
      gender: "Female",
      dateOfBirth: "1995-07-23",
      nationality: "Malawian",
      district: "Zomba",
      nationalId: "C456789123",
      medicalCondition: "Asthma",
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "name",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
      },
      {
        Header: "Nationality",
        accessor: "nationality",
      },
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header: "National ID",
        accessor: "nationalId",
      },
      {
        Header: "Medical Condition",
        accessor: "medicalCondition",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleEditPatient(row.index)}
            >
              <FaEdit className="text-xl text-green-600" />
            </button>

            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => handleDeletePatient(row.index)}
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
      data: patients,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  const handleAddPatient = () => {
    if (isEditing) {
      const updatedPatients = [...patients];
      updatedPatients[editIndex] = newPatient;
      setPatients(updatedPatients);
    } else {
      setPatients([...patients, newPatient]);
    }
    setIsModalOpen(false);
    setNewPatient({
      name: "",
      gender: "",
      dateOfBirth: "",
      nationality: "",
      district: "",
      nationalId: "",
      medicalCondition: "",
    });
    setIsEditing(false);
  };

  const handleEditPatient = (index) => {
    setEditIndex(index);
    setNewPatient(patients[index]);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeletePatient = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
  };

  return (
    <>
    <Head title="Patients"/>
    <Layout>
    <div className="">
      <div className="flex justify-end mt-4 mb-2">
        <div className="flex space-x-4 items-end">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <HiOutlineUserAdd className="text-xl text-white" />
            <div>{isEditing ? "Edit Patient" : "New Patient"}</div>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Patients</h2>
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
              {isEditing ? "Edit Patient" : "Add Patient"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPatient();
              }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium">
                  Patient Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newPatient.name}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="gender" className="block font-medium">
                  Gender
                </label>
                <select
                  id="gender"
                  value={newPatient.gender}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, gender: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="dateOfBirth" className="block font-medium">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={newPatient.dateOfBirth}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, dateOfBirth: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nationality" className="block font-medium">
                  Nationality
                </label>
                <input
                  id="nationality"
                  type="text"
                  value={newPatient.nationality}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, nationality: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="district" className="block font-medium">
                  District
                </label>
                <input
                  id="district"
                  type="text"
                  value={newPatient.district}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, district: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="nationalId" className="block font-medium">
                  National ID
                </label>
                <input
                  id="nationalId"
                  type="text"
                  value={newPatient.nationalId}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, nationalId: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="medicalCondition" className="block font-medium">
                  Medical Condition
                </label>
                <input
                  id="medicalCondition"
                  type="text"
                  value={newPatient.medicalCondition}
                  onChange={(e) =>
                    setNewPatient({ ...newPatient, medicalCondition: e.target.value })
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

export default Patients;
