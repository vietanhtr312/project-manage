import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const AddMemberPopup = ({ onClose, onAdd, taskId }) => {
  const { getProjectMembers, getTaskMembers } = useContext(ProjectContext);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchTaskMembers = async () => {
      try {
        const taskMember = await getTaskMembers(taskId);
        setSelectedMember(taskMember[0].member._id)
      } catch (error) {
        console.error("Error fetching task members:", error);
      }
    };
    fetchTaskMembers();
  }, [taskId]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await getProjectMembers();
        setMembers(members.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, [getProjectMembers]);

  const handleAddMember = () => {
    if (selectedMember) {
      onAdd(taskId, selectedMember);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md min-h-[420px] flex flex-col justify-between border border-blue-100">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">
              Add Member
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-blue-600 text-3xl font-bold transition-colors duration-150"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="mb-6 mt-10">
            <label
              htmlFor="member"
              className="block text-sm font-semibold text-blue-700 mb-2"
            >
              Select Member
            </label>
            <div className="relative">
              <select
                id="member"
                name="member"
                value={selectedMember || ""}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="custom_select block w-full border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 py-2 px-3 bg-blue-50 text-blue-900 transition"
              >
                <option value="">Select a member</option>
                {members &&
                  members.length > 0 &&
                  members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.name}
                    </option>
                  ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none">
                ▼
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleAddMember}
          disabled={!selectedMember}
          className={`w-full py-2 rounded-lg font-semibold transition duration-200 shadow-md ${selectedMember
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
              : "bg-blue-200 text-blue-400 cursor-not-allowed"
            }`}
        >
          Add Member
        </button>
      </div>
    </div>
  );
};

export default AddMemberPopup;
