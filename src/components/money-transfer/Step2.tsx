"use client";
import { useState } from "react";
import { UserPlus } from "lucide-react"; // optional icon

interface Recipient {
  id: number;
  name: string;
}

interface TransferRecipientData {
  recipientId: string;
  recipientName: string;
}

interface Step2Props {
  onNext: (data: TransferRecipientData) => void;
  onPrev: () => void;
}

export default function Step2({ onNext, onPrev }: Step2Props) {
  // existing recipients (later you can load from API)
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);

  const [selected, setSelected] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAddRecipient = () => {
    if (!newName.trim()) return;
    const newRec = { id: Date.now(), name: newName.trim() };
    setRecipients([...recipients, newRec]);
    setSelected(String(newRec.id));
    setNewName("");
    setShowForm(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 border-b pb-2">
        Money Transfer
      </h2>

      {/* Recipients Dropdown + Add Button */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Recipients</label>
        <div className="flex">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="flex-1 border rounded-l px-4 py-2 outline-none"
          >
            <option value="">Select Recipient</option>
            {recipients.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-900 text-white px-4 rounded-r hover:bg-blue-800"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add New Recipient Form */}
      {showForm && (
        <div className="border rounded p-4 mb-4 bg-gray-50">
          <label className="block mb-1 text-sm font-medium">
            New Recipient Name
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            className="w-full border rounded px-3 py-2 mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddRecipient}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setNewName("");
              }}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={() =>
            selected &&
            onNext({
              recipientId: selected,
              recipientName:
                recipients.find((r) => r.id.toString() === selected)?.name ||
                "",
            })
          }
          disabled={!selected}
          className={`px-4 py-2 rounded text-white font-medium transition 
            ${
              selected
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
