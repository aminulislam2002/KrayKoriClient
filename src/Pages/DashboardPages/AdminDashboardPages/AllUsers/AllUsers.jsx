import { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the API endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://server.shekshops.com/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Error fetching users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="">
      <h1 className="bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50 text-base font-semibold font-secondary text-start p-5">View All Users</h1>

      <div className="bg-white shadow-md overflow-x-auto">
        <table className="w-full table-auto">
          {/* head */}
          <thead className="bg-slate-100 text-slate-800 dark:bg-[#1C2E45] dark:text-slate-50">
            <tr>
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white text-slate-800 dark:bg-[#132337] dark:text-slate-50">
            {users.map((user, index) => (
              <tr key={user?._id} className="border-t">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{user?.name}</td>
                <td className="px-4 py-2 text-center">{user?.email}</td>
                <td className="px-4 py-2 text-center">{user?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
