import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useTable, useSortBy, usePagination } from "react-table";

const Treatments = ({role}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTreatment, setNewTreatment] = useState({
        treatmentName: "",
        description: "",
    });
    const [treatments, setTreatments] = useState([
        {
            treatmentName: "Medication & Lifestyle Changes",
            description: "Used to manage hypertension and cholesterol.",
        },
        {
            treatmentName: "Insulin & Diet Control",
            description:
                "Helps manage Diabetes Type 2 by regulating blood sugar.",
        },
        {
            treatmentName: "Inhaler & Medication",
            description: "For controlling asthma symptoms.",
        },
    ]);
    const [editIndex, setEditIndex] = useState(null);

    const columns = React.useMemo(
        () => [
            {
                Header: "Treatment Name",
                accessor: "treatmentName",
            },
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => handleEditTreatment(row.index)}
                        >
                            <FaEdit className="text-xl text-green-600" />
                        </button>

                        <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => handleDeleteTreatment(row.index)}
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
            data: treatments,
            initialState: { pageIndex: 0 },
        },
        useSortBy,
        usePagination
    );

    const handleAddTreatment = () => {
        if (isEditing) {
            const updatedTreatments = [...treatments];
            updatedTreatments[editIndex] = newTreatment;
            setTreatments(updatedTreatments);
        } else {
            setTreatments([...treatments, newTreatment]);
        }
        setIsModalOpen(false);
        setNewTreatment({ treatmentName: "", description: "" });
        setIsEditing(false);
    };

    const handleEditTreatment = (index) => {
        setEditIndex(index);
        setNewTreatment(treatments[index]);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleDeleteTreatment = (index) => {
        const updatedTreatments = treatments.filter((_, i) => i !== index);
        setTreatments(updatedTreatments);
    };

    return (

                <div className="">
                    <div className="flex justify-end mt-4 mb-2">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <HiOutlineUserAdd className="text-xl text-white" />
                            <div>
                                {isEditing ? "Edit Treatment" : "New Treatment"}
                            </div>
                        </button>
                    </div>

                    <div className="bg-white shadow-sm rounded-lg p-6 border">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Treatments Available
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
                                        ? "Edit Treatment"
                                        : "Add Treatment"}
                                </h2>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddTreatment();
                                    }}
                                >
                                    <div className="mb-4">
                                        <label
                                            htmlFor="treatmentName"
                                            className="block font-medium"
                                        >
                                            Treatment Name
                                        </label>
                                        <input
                                            id="treatmentName"
                                            type="text"
                                            value={newTreatment.treatmentName}
                                            onChange={(e) =>
                                                setNewTreatment({
                                                    ...newTreatment,
                                                    treatmentName:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="description"
                                            className="block font-medium"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={newTreatment.description}
                                            onChange={(e) =>
                                                setNewTreatment({
                                                    ...newTreatment,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            {isEditing
                                                ? "Update Treatment"
                                                : "Add Treatment"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

    );
};

export default Treatments;
