import { SPECIAL_DAYS } from "@/const/data"; // Ensure SPECIAL_DAYS includes specialization
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

function SpecialMedicalDays() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDuty, setNewDuty] = useState({
    doctorName: "",
    day: "",
    specialization: "", // Field for specialization
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDuty((prevDuty) => ({ ...prevDuty, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the submission of the new duty
    console.log("New Duty Submitted:", newDuty);
    // Close the modal after submission
    setIsModalOpen(false);
    // Clear the form
    setNewDuty({ doctorName: "", day: "", specialization: "" });
  };

  return (
    <div className="p-4 rounded-lg bg-[#EEEEEE] w-full">
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-bold text-blue-500">Special Medical Days</h2>

      </div>
      <ul className="space-y-1">
        {SPECIAL_DAYS.map((duty) => (
          <li key={duty.id} className="border-b border-gray-300 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-700 text-[0.7rem] font-semibold block">
                  {duty.doctorName}
                </span>
                <span className="text-gray-400 text-[0.6rem]">
                  {duty.day}
                </span>
              </div>
              <div>
                <span className="text-gray-500 text-[0.7rem] block">
                 {duty.specialization}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Add New Duty</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="doctorName">
                  Doctor's Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  id="doctorName"
                  value={newDuty.doctorName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="day">
                  Day of the Week
                </label>
                <input
                  type="text"
                  name="day"
                  id="day"
                  value={newDuty.day}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="specialization">
                  Specialization (e.g., Cancer, Maternity)
                </label>
                <input
                  type="text"
                  name="specialization"
                  id="specialization"
                  value={newDuty.specialization}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded w-full p-2"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Duty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecialMedicalDays;
