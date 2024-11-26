import { useState,FormEvent,ChangeEvent } from "react";

export default function AddTractorListing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    specifications: "",
    history: "",
    images: "",
    sellerId: "1", // Replace with the actual seller ID after authentication
  });

  
    const handleChange = <T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>(e: ChangeEvent<T>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/tractors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, images: formData.images.split(",") }),
      });

      if (!res.ok) throw new Error("Failed to create tractor listing");
      alert("Tractor listing created successfully!");
    } catch (err) {
      if (err instanceof Error) {
    alert(err.message);
  } else {
    alert('An unknown error occurred');
  }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Add Tractor Listing</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        ></textarea>
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <textarea
          name="specifications"
          placeholder="Specifications"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <textarea
          name="history"
          placeholder="History"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        ></textarea>
        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma-separated)"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Add Listing
        </button>
      </form>
    </div>
  );
}
