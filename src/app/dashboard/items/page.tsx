"use client";

import { useState, useEffect } from "react";

// Define the Item type
type Item = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  photos: string[]; // Array to store photo URLs
};

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    photos: [],
  });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  // Mock fetch function to simulate fetching items from an API
  const fetchItems = () => {
    setItems([
      {
        id: 1,
        name: "Running Shoes",
        category: "Footwear",
        price: 120,
        stock: 50,
        description: "Comfortable running shoes",
        photos: ["https://via.placeholder.com/100"],
      },
      {
        id: 2,
        name: "Yoga Mat",
        category: "Accessories",
        price: 30,
        stock: 100,
        description: "Non-slip yoga mat",
        photos: ["https://via.placeholder.com/100"],
      },
      {
        id: 3,
        name: "Training Jacket",
        category: "Clothing",
        price: 60,
        stock: 20,
        description: "Lightweight jacket for workouts",
        photos: ["https://via.placeholder.com/100"],
      },
    ]);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = () => {
    if (
      newItem.name &&
      newItem.category &&
      newItem.description &&
      newItem.photos.length > 0
    ) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      resetNewItem();
    }
  };

  const resetNewItem = () => {
    setNewItem({
      id: 0,
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
      photos: [],
    });
    setPhotoFiles([]);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setPhotoFiles([]); // Reset photo files for editing
  };

  const handleUpdateItem = () => {
    if (editingItem) {
      setItems(prevItems =>
        prevItems.map(item => (item.id === editingItem.id ? editingItem : item))
      );
      setEditingItem(null);
      setPhotoFiles([]);
    }
  };

  const handleDeleteItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleInputChange = (field: keyof Item, value: string | number) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };

  // Handle photo file changes
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newFiles = filesArray.slice(0, 5); // Limit to 5 photos
      setPhotoFiles(newFiles);
      const photoURLs = newFiles.map(file => URL.createObjectURL(file));
      if (editingItem) {
        setEditingItem({
          ...editingItem,
          photos: [...editingItem.photos, ...photoURLs],
        });
      } else {
        setNewItem({
          ...newItem,
          photos: [...newItem.photos, ...photoURLs],
        });
      }
    }
  };

  // Handle removing a photo
  const handleRemovePhoto = (index: number) => {
    if (editingItem) {
      const updatedPhotos = editingItem.photos.filter((_, i) => i !== index);
      setEditingItem({ ...editingItem, photos: updatedPhotos });
    }
  };

  return (
    <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-4 w-full h-full">
      <h1 className="text-2xl font-semibold">Items Management</h1>

      {/* Add New Item Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Product Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          className="border rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={e => setNewItem({ ...newItem, category: e.target.value })}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
          className="border rounded-md p-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newItem.stock}
          onChange={e => setNewItem({ ...newItem, stock: Number(e.target.value) })}
          className="border rounded-md p-2"
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
          className="border rounded-md p-2 col-span-1 md:col-span-2"
        ></textarea>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
          className="border rounded-md p-2 col-span-1 md:col-span-2"
        />
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white rounded-md p-2 md:col-span-2"
        >
          Add Product
        </button>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="border border-neutral-300 p-2">Product Name</th>
              <th className="border border-neutral-300 p-2">Category</th>
              <th className="border border-neutral-300 p-2">Price (USD)</th>
              <th className="border border-neutral-300 p-2">Stock</th>
              <th className="border border-neutral-300 p-2">Description</th>
              <th className="border border-neutral-300 p-2">Photos</th>
              <th className="border border-neutral-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="border border-neutral-300 p-2">
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={e => handleInputChange("name", e.target.value)}
                      className="border rounded-md p-1 w-full"
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="border border-neutral-300 p-2">
                  {editingItem?.id === item.id ? (
                    <input
                      type="text"
                      value={editingItem.category}
                      onChange={e => handleInputChange("category", e.target.value)}
                      className="border rounded-md p-1 w-full"
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td className="border border-neutral-300 p-2">
                  {editingItem?.id === item.id ? (
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={e => handleInputChange("price", Number(e.target.value))}
                      className="border rounded-md p-1 w-full"
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>
                <td className="border border-neutral-300 p-2">
                  {editingItem?.id === item.id ? (
                    <input
                      type="number"
                      value={editingItem.stock}
                      onChange={e => handleInputChange("stock", Number(e.target.value))}
                      className="border rounded-md p-1 w-full"
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td className="border border-neutral-300 p-2">
                  {editingItem?.id === item.id ? (
                    <textarea
                      value={editingItem.description}
                      onChange={e => handleInputChange("description", e.target.value)}
                      className="border rounded-md p-1 w-full"
                    ></textarea>
                  ) : (
                    item.description
                  )}
                </td>
                <td className="border border-neutral-300 p-2">
                  <div className="flex flex-wrap gap-2">
                    {item.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        {editingItem?.id === item.id && (
                          <button
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                    {/* Input for adding new photos while editing */}
                    {editingItem?.id === item.id && (
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="border rounded-md p-1 w-20"
                      />
                    )}
                  </div>
                </td>
                <td className="border border-neutral-300 p-2 text-center">
                  {editingItem?.id === item.id ? (
                    <button
                      onClick={handleUpdateItem}
                      className="bg-green-500 text-white rounded-md p-1"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditItem(item)}
                      className="bg-yellow-500 text-white rounded-md p-1"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 text-white rounded-md p-1 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
