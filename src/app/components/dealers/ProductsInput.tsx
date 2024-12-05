import React, { useState } from 'react';

interface Product {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface ProductsInputProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
}

export const ProductsInput: React.FC<ProductsInputProps> = ({ 
  products, 
  onAddProduct 
}) => {
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    inStock: true,
  });

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : name === "price" ? Number(value) : value,
    });
  };

  const handleProductAdd = () => {
    if (newProduct.name.trim() && newProduct.category.trim() && newProduct.price > 0) {
      onAddProduct({ ...newProduct });
      setNewProduct({
        name: "",
        category: "",
        price: 0,
        inStock: true,
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700">Products</label>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleProductChange}
          className="px-4 py-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleProductChange}
          className="px-4 py-2 border rounded w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleProductChange}
          className="px-4 py-2 border rounded w-full"
          required
        />
        <label className="flex items-center">
          <input
            type="checkbox"
            name="inStock"
            checked={newProduct.inStock}
            onChange={handleProductChange}
            className="mr-2"
          />
          <span className="text-gray-700">In Stock</span>
        </label>
        <button
          type="button"
          onClick={handleProductAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Product
        </button>
      </div>
      
      {products.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700">Added Products</h3>
          <ul className="list-disc list-inside">
            {products.map((product, index) => (
              <li key={index} className="text-gray-600">
                {product.name} - {product.category} - ${product.price} -{" "}
                {product.inStock ? "In Stock" : "Out of Stock"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};