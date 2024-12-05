import React, { useState } from 'react';

interface SpecialtiesInputProps {
  specialties: string[];
  onAddSpecialty: (specialty: string) => void;
}

export const SpecialtiesInput: React.FC<SpecialtiesInputProps> = ({ 
  specialties, 
  onAddSpecialty 
}) => {
  const [newSpecialty, setNewSpecialty] = useState("");

  const handleSpecialtyAdd = () => {
    if (newSpecialty.trim()) {
      onAddSpecialty(newSpecialty.trim());
      setNewSpecialty("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">Specialties</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newSpecialty}
          onChange={(e) => setNewSpecialty(e.target.value)}
          className="px-4 py-2 border rounded flex-grow"
          placeholder="Add a specialty"
        />
        <button
          type="button"
          onClick={handleSpecialtyAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {specialties.map((spec, index) => (
          <span key={index} className="bg-gray-200 px-3 py-1 rounded">
            {spec}
          </span>
        ))}
      </div>
    </div>
  );
};