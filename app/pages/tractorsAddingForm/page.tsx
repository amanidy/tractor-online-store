"use client"
import { useState, FormEvent, ChangeEvent, useRef} from "react";
import Image from "next/image";
//import { useUser } from "./context/UserContext";
//import { useRouter } from 'next/navigation';

export default function AddTractorListing() {
  //const { user } = useUser();
 // const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    specifications: "",
    history: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);



  //console.log('Current User:', user);
 {/* console.log('User Role:', user?.role);
  // Redirect if not a seller
  useEffect(() => {
    if (user?.role !== 'seller') {
      router.push('/unauthorized');
    }
  }, [user, router]);

  // If not a seller, return null or a loading state
  if (!user || user.role !== 'seller') {
    return <div>Loading or Unauthorized...</div>;
  }*/} 

  const handleChange = <T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>(
    e: ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    
    // Special handling for price to ensure only numeric input
    if (name === 'price') {
      // Remove non-numeric characters and limit to 2 decimal places
      const numericValue = value.replace(/[^0-9.]/g, '');
      const formattedValue = numericValue.split('.').map((part, index) => 
        index === 0 ? part : part.slice(0, 2)
      ).join('.');
      
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Limit to 5 images
      const limitedFiles = fileArray.slice(0, 5);
      
      setImages(limitedFiles);

      const filePreviewUrls = limitedFiles.map(file => URL.createObjectURL(file));
      setPreviews(filePreviewUrls);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);

    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(updatedPreviews);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate price
    const priceNumber = parseFloat(formData.price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid price');
      return;
    }

    // Validate image count
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    const formDataToSubmit = new FormData();
    const userId = localStorage.getItem('userId');
    
    if (userId !== null) {
    formDataToSubmit.append('userId', userId);
  } else {
  console.error('User  ID is not found in localStorage');
  
}

    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    // Add user ID from user context
    //formDataToSubmit.append('userId', user.id);

    // Add images
    images.forEach((file) => {
      formDataToSubmit.append(`images`, file);
    });

    


    try {
      const res = await fetch("/api/tractors", {
        method: "POST",
        body: formDataToSubmit,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create tractor listing");
      }

      alert("Tractor listing created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        specifications: "",
        history: "",
      });
      setImages([]);
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-500">Add Tractor Listing</h1>
        
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          required
          maxLength={100}
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          required
          maxLength={500}
        ></textarea>
        
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          required
          pattern="^\d+(\.\d{1,2})?$"
        />
        
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          required
          maxLength={100}
        />
        
        <textarea
          name="specifications"
          placeholder="Specifications"
          value={formData.specifications}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          maxLength={300}
        ></textarea>
        
        <textarea
          name="history"
          placeholder="History"
          value={formData.history}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-gray-500"
          maxLength={300}
        ></textarea>
        
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded text-gray-500"
            accept="image/*"
          />
          <p className="text-xs text-gray-500 mt-1">Max 5 images, PNG or JPEG</p>
        </div>

        {previews.length > 0 && (
          <div className="mb-4">
            <h3 className="text-gray-500 mb-2">Image Previews (Max 5):</h3>
            <div className="grid grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    width={150} 
                    height={150} 
                    className="object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
}