import { addCategory, getCategories } from "@/app/actions/categories";

export default async function CategoriesPage() {
  const { categories } = await getCategories();

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <h1 className="text-2xl font-semibold">Categories</h1>

      <form className="flex gap-2 mb-4" action={addCategory}>
        <input
          name="name"
          type="text"
          placeholder="New category name"
          className="border rounded-md p-2 w-full"
          required
        />
        <button className="bg-green-500 text-white rounded-md p-2">Add</button>
      </form>

      <table className="min-w-full border-collapse border border-neutral-200">
        <thead>
          <tr className="bg-gray-100 dark:bg-neutral-800">
            <th className="border border-neutral-300 p-2">Category Name</th>
            <th className="border border-neutral-300 p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map(category => (
              <tr
                key={category.id}
                className="hover:bg-gray-50 dark:hover:bg-neutral-700"
              >
                <td className="border border-neutral-300 p-2">{category.name}</td>
                <td className="border border-neutral-300 p-2">
                  {new Date(category.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="border border-neutral-300 p-4 text-center text-gray-500"
              >
                No Categories Yet, please create new category
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
