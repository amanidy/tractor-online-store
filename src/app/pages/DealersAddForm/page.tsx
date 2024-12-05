"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useUser } from "../../context/userContext"; 
import { SpecialtiesInput } from "../../components/dealers/Speacialists";
import { ProductsInput } from "../../components/dealers/ProductsInput";

interface DealerForm {
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  dealerType: "TractorParts" | "EquipmentSupplier" | "Comprehensive";
  specialties: string[];
  products: { name: string; category: string; price: number; inStock: boolean }[];
}

const DealerAddForm: React.FC = () => {
  const { user } = useUser(); 
  const [formData, setFormData] = useState<DealerForm>({
    name: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    dealerType: "TractorParts",
    specialties: [],
    products: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecialtyAdd = (specialty: string) => {
    setFormData({
      ...formData,
      specialties: [...formData.specialties, specialty],
    });
  };

  const handleProductAdd = (product: { name: string; category: string; price: number; inStock: boolean }) => {
    setFormData({
      ...formData,
      products: [...formData.products, product],
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      
      console.log("Current User:", user);

      if (!user || !user.id) {
        throw new Error("User not authenticated or missing user ID");
      }

      const response = await fetch("/api/dealers", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify({ ...formData, userId: user.id }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          location: "",
          contactEmail: "",
          contactPhone: "",
          dealerType: "TractorParts",
          specialties: [],
          products: [],
        });
      } else {
        setError(result.error || "Failed to add dealer");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Dealer</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Dealer added successfully!</p>}

      
      <div className="mb-4">
        <label className="block text-gray-700">Dealer Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Email</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Phone</label>
        <input
          type="text"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Dealer Type</label>
        <select
          name="dealerType"
          value={formData.dealerType}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="TractorParts">Tractor Parts</option>
          <option value="EquipmentSupplier">Equipment Supplier</option>
          <option value="Comprehensive">Comprehensive</option>
        </select>
      </div>

     
      <SpecialtiesInput 
        specialties={formData.specialties}
        onAddSpecialty={handleSpecialtyAdd}
      />

      
      <ProductsInput 
        products={formData.products}
        onAddProduct={handleProductAdd}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Adding Dealer..." : "Add Dealer"}
      </button>
    </form>
  );
};

export default DealerAddForm;