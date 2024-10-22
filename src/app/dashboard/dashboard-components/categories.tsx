import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// Define the Category type
type Category = {
  id: number;
  name: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  // Mock fetch function to simulate fetching categories from an API
  const fetchCategories = () => {
    setCategories([
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
      { id: 4, name: "Category 4" },
    ]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newCat: Category = {
        id: Date.now(),
        name: newCategory,
      };
      setCategories((prevCategories) => [...prevCategories, newCat]);
      setNewCategory("");
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setEditingValue(category.name);
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, name: editingValue } : cat
        )
      );
      setEditingCategory(null);
      setEditingValue("");
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <h1 className="text-2xl font-semibold">Categories</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white rounded-md p-2"
        >
          Add
        </button>
      </div>

      <table className="min-w-full border-collapse border border-neutral-200">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800">
            <th className="border border-neutral-300 p-2">Category Name</th>
            <th className="border border-neutral-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700">
              <td className="border border-neutral-300 p-2">
                {editingCategory?.id === category.id ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="border rounded-md p-1 w-full"
                  />
                ) : (
                  category.name
                )}
              </td>
              <td className="border border-neutral-300 p-2">
                {editingCategory?.id === category.id ? (
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={handleUpdateCategory} className="text-green-500 hover:text-green-700">
                      <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />
                    </button>
                    <button onClick={() => setEditingCategory(null)} className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => handleEditCategory(category)} className="text-yellow-500 hover:text-yellow-700">
                      <FontAwesomeIcon icon={faPencilAlt} className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-700">
                      <FontAwesomeIcon icon={faTrashAlt} className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
