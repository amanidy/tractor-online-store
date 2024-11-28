"use client"

import { useRouter } from 'next/navigation';
import { useState, FormEvent, ChangeEvent } from "react";
import { useUser } from "./context/UserContext";

export default function Register() {
  const router = useRouter();
  const { setUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = <T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try { 
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
          
      const result = await response.json();

      if (response.ok && result.user) {
        // Set user in context
        setUser({
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          role: result.user.role
        });

        localStorage.setItem('userId', result.user.id);

        const fullName = `${result.user.name} `.trim();
        localStorage.setItem('sellerName', fullName);
 

        
        if (result.user.role === 'seller') {
          router.push('/seller');
        } else {
          router.push('/pages/tractors');
        }

        alert("Registration successful!");
      } else {
        setError(result.error || "Registration failed");
      }
    }
    catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }  
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-600">Register</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded border-gray-400 text-gray-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded border-gray-400 text-gray-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded border-gray-400 text-gray-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded border-gray-400 text-gray-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded border-gray-400"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}