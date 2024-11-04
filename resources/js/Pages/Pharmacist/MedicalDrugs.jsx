import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const MedicalDrugs = ({ role, auth }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newDrug, setNewDrug] = useState({
        name: "",
        dosage: "",
        manufacturer: "",
        expiryDate: "",
        instructions: "",
    });
    const [drugs, setDrugs] = useState([
        {
            name: "Amlodipine",
            dosage: "5mg",
            manufacturer: "Pfizer",
            expiryDate: "2025-08-12",
            instructions: "Store in a cool, dry place",
        },
        {
            name: "Metformin",
            dosage: "500mg",
            manufacturer: "Sandoz",
            expiryDate: "2024-09-01",
            instructions: "Keep away from children",
        },
        {
            name: "Ibuprofen",
            dosage: "200mg",
            manufacturer: "Teva",
            expiryDate: "2024-07-20",
            instructions: "Take with food",
        },
    ]);
    const [editIndex, setEditIndex] = useState(null);

    const drugOptions = [
        "Amlodipine",
        "Metformin",
        "Ibuprofen",
        "Paracetamol",
        "Amoxicillin",
    ];

    const columns = React.useMemo(
        () => [
            {
                Header: "Drug Name",
                accessor: "name",
            },
            {
                Header: "Dosage",
                accessor: "dosage",
            },
            {
                Header: "Manufacturer",
                accessor: "manufacturer",
            },
            {
                Header: "Expiry Date",
                accessor: "expiryDate",
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
                            onClick={() => handleEditDrug(row.index)}
                        >
                            <FaEdit className="text-xl text-green-600" />
                        </button>
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => handleDeleteDrug(row.index)}
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
            data: drugs,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );

    const handleAddDrug = () => {
        if (isEditing) {
            const updatedDrugs = [...drugs];
            updatedDrugs[editIndex] = newDrug;
            setDrugs(updatedDrugs);
        } else {
            setDrugs([...drugs, newDrug]);
        }
        setIsModalOpen(false);
        setNewDrug({
            name: "",
            dosage: "",
            manufacturer: "",
            expiryDate: "",
            instructions: "",
        });
        setIsEditing(false);
    };

    const handleEditDrug = (index) => {
        setEditIndex(index);
        setNewDrug(drugs[index]);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteDrug = (index) => {
        const updatedDrugs = drugs.filter((_, i) => i !== index);
        setDrugs(updatedDrugs);
    };

    return (
        <>
            <Head title="Medical Drugs" />
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
                                    {isEditing ? "Edit Drug" : "New Drug"}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6 border">
                        <h2 className="text-xl font-semibold mb-4">Medical Drugs</h2>

                        <div className="overflow-x-auto">
                            <table {...getTableProps()} className="min-w-full bg-white">
                                <thead>
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
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
                                    {page.map(row => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => (
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
                                    {isEditing ? "Edit Drug" : "Add Drug"}
                                </h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddDrug();
                                    }}
                                >
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block font-medium">Drug Name</label>
                                        <select
                                            id="name"
                                            value={newDrug.name}
                                            onChange={(e) =>
                                                setNewDrug({ ...newDrug, name: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        >
                                            <option value="">Select Drug</option>
                                            {drugOptions.map((drug) => (
                                                <option key={drug} value={drug}>
                                                    {drug}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="dosage" className="block font-medium">Dosage</label>
                                        <input
                                            id="dosage"
                                            type="text"
                                            value={newDrug.dosage}
                                            onChange={(e) =>
                                                setNewDrug({ ...newDrug, dosage: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="manufacturer" className="block font-medium">Manufacturer</label>
                                        <input
                                            id="manufacturer"
                                            type="text"
                                            value={newDrug.manufacturer}
                                            onChange={(e) =>
                                                setNewDrug({ ...newDrug, manufacturer: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="expiryDate" className="block font-medium">Expiry Date</label>
                                        <input
                                            id="expiryDate"
                                            type="date"
                                            value={newDrug.expiryDate}
                                            onChange={(e) =>
                                                setNewDrug({ ...newDrug, expiryDate: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="instructions" className="block font-medium">Instructions</label>
                                        <textarea
                                            id="instructions"
                                            value={newDrug.instructions}
                                            onChange={(e) =>
                                                setNewDrug({ ...newDrug, instructions: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            {isEditing ? "Update Drug" : "Add Drug"}
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

export default MedicalDrugs;
