import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Prescriptions = ({role, auth}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newPrescription, setNewPrescription] = useState({
        patientName: "",
        prescriptionDate: "",
        medication: "",
        dosage: "",
        instructions: "",
    });
    const [prescriptions, setPrescriptions] = useState([
        {
            patientName: "Samantha Phirii",
            prescriptionDate: "2024-08-12",
            medication: "Amlodipine",
            dosage: "5mg",
            instructions: "Once daily in the morning",
        },
        {
            patientName: "Innocent Chitimbe",
            prescriptionDate: "2024-09-01",
            medication: "Metformin",
            dosage: "500mg",
            instructions: "Twice daily with meals",
        },
        {
            patientName: "Elagant Beauty",
            prescriptionDate: "2024-07-20",
            medication: "Albuterol",
            dosage: "2 puffs",
            instructions: "Use as needed for wheezing",
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

    const medicationOptions = [
        "Amlodipine",
        "Metformin",
        "Albuterol",
        "Ibuprofen",
        "Paracetamol",
    ];

    const columns = React.useMemo(
        () => [
            {
                Header: "Patient Name",
                accessor: "patientName",
            },
            {
                Header: "Prescription Date",
                accessor: "prescriptionDate",
            },
            {
                Header: "Medication",
                accessor: "medication",
            },
            {
                Header: "Dosage",
                accessor: "dosage",
            },
            {
                Header: "Instructions",
                accessor: "instructions",
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => handleEditPrescription(row.index)}
                        >
                            <FaEdit className="text-xl text-green-600" />
                        </button>

                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => handleDeletePrescription(row.index)}
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
            data: prescriptions,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );

    const handleAddPrescription = () => {
        if (isEditing) {
            const updatedPrescriptions = [...prescriptions];
            updatedPrescriptions[editIndex] = newPrescription;
            setPrescriptions(updatedPrescriptions);
        } else {
            setPrescriptions([...prescriptions, newPrescription]);
        }
        setIsModalOpen(false);
        setNewPrescription({
            patientName: "",
            prescriptionDate: "",
            medication: "",
            dosage: "",
            instructions: "",
        });
        setIsEditing(false);
    };

    const handleEditPrescription = (index) => {
        setEditIndex(index);
        setNewPrescription(prescriptions[index]);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeletePrescription = (index) => {
        const updatedPrescriptions = prescriptions.filter(
            (_, i) => i !== index
        );
        setPrescriptions(updatedPrescriptions);
    };

    return (
        <>
            <Head title="Prescriptions" />
            <Layout role={role} authUser={auth.user}>
                <div className="">
                    <div className="flex justify-end mt-4 mb-2">
                        <div className="flex space-x-4 items-end">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <HiOutlineUserAdd className="text-xl text-white" />
                                <div>
                                    {isEditing
                                        ? "Edit Prescription"
                                        : "New Prescription"}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6 border">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Prescriptions
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table
                                {...getTableProps()}
                                className="min-w-full bg-white"
                            >
                                <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                        className="text-left p-4 border-b"
                                                    >
                                                        {column.render(
                                                            "Header"
                                                        )}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="p-4 border-b"
                                                    >
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
                                    {isEditing
                                        ? "Edit Prescription"
                                        : "Add Prescription"}
                                </h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddPrescription();
                                    }}
                                >
                                    <div className="mb-4">
                                        <label
                                            htmlFor="patientName"
                                            className="block font-medium"
                                        >
                                            Patient Name
                                        </label>
                                        <select
                                            id="patientName"
                                            value={newPrescription.patientName}
                                            onChange={(e) =>
                                                setNewPrescription({
                                                    ...newPrescription,
                                                    patientName: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">
                                                Select Patient
                                            </option>
                                            {patientOptions.map((patient) => (
                                                <option
                                                    key={patient}
                                                    value={patient}
                                                >
                                                    {patient}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="prescriptionDate"
                                            className="block font-medium"
                                        >
                                            Prescription Date
                                        </label>
                                        <input
                                            id="prescriptionDate"
                                            type="date"
                                            value={
                                                newPrescription.prescriptionDate
                                            }
                                            onChange={(e) =>
                                                setNewPrescription({
                                                    ...newPrescription,
                                                    prescriptionDate:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="medication"
                                            className="block font-medium"
                                        >
                                            Medication
                                        </label>
                                        <select
                                            id="medication"
                                            value={newPrescription.medication}
                                            onChange={(e) =>
                                                setNewPrescription({
                                                    ...newPrescription,
                                                    medication: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">
                                                Select Medication
                                            </option>
                                            {medicationOptions.map(
                                                (medication) => (
                                                    <option
                                                        key={medication}
                                                        value={medication}
                                                    >
                                                        {medication}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="dosage"
                                            className="block font-medium"
                                        >
                                            Dosage
                                        </label>
                                        <input
                                            id="dosage"
                                            type="text"
                                            value={newPrescription.dosage}
                                            onChange={(e) =>
                                                setNewPrescription({
                                                    ...newPrescription,
                                                    dosage: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="instructions"
                                            className="block font-medium"
                                        >
                                            Instructions
                                        </label>
                                        <textarea
                                            id="instructions"
                                            value={newPrescription.instructions}
                                            onChange={(e) =>
                                                setNewPrescription({
                                                    ...newPrescription,
                                                    instructions:
                                                        e.target.value,
                                                })
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
                                                setNewPrescription({
                                                    patientName: "",
                                                    prescriptionDate: "",
                                                    medication: "",
                                                    dosage: "",
                                                    instructions: "",
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

export default Prescriptions;
