import { useState, useEffect } from 'react';

// Define the User type
type User = {
  id: number;
  fullName: string;
  phoneNumber: string;
  country: string;
  email: string;
  isActive: boolean;
};

export default function UsersControl() {
  const [users, setUsers] = useState<User[]>([]);

  // Mock fetch function to simulate fetching users from an API
  const fetchUsers = () => {
    setUsers([
      { id: 1, fullName: "John Doe", phoneNumber: "+123456789", country: "USA", email: "john@example.com", isActive: true },
      { id: 2, fullName: "Jane Smith", phoneNumber: "+987654321", country: "Canada", email: "jane@example.com", isActive: true },
      { id: 3, fullName: "Alice Johnson", phoneNumber: "+112233445", country: "UK", email: "alice@example.com", isActive: false },
      { id: 4, fullName: "Bob Brown", phoneNumber: "+556677889", country: "Australia", email: "bob@example.com", isActive: true },
    ]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleUser = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <h1 className="text-2xl font-semibold mb-4">User Accounts</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-neutral-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="border border-neutral-300 p-2">Full Name</th>
              <th className="border border-neutral-300 p-2">Phone Number</th>
              <th className="border border-neutral-300 p-2">Country</th>
              <th className="border border-neutral-300 p-2">Email</th>
              <th className="border border-neutral-300 p-2">Status</th>
              <th className="border border-neutral-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-neutral-700">
                <td className="border border-neutral-300 p-2">{user.fullName}</td>
                <td className="border border-neutral-300 p-2">{user.phoneNumber}</td>
                <td className="border border-neutral-300 p-2">{user.country}</td>
                <td className="border border-neutral-300 p-2">{user.email}</td>
                <td className="border border-neutral-300 p-2">
                  <span className={`font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {user.isActive ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="border border-neutral-300 p-2 text-center">
                  <button
                    onClick={() => handleToggleUser(user.id)}
                    className={`py-1 px-3 rounded-md text-white ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {user.isActive ? 'Block' : 'Activate'}
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
