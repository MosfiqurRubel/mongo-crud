import "./style.css";
import { createIcons, Pencil, Trash } from "lucide";
import { getUsers, createUser } from "./api/users";

type User = {
  _id: string;
  name: string;
  age: number;
};

const renderUsers = async () => {
  try {
    const users: User[] = await getUsers();
    console.log("users", users);

    const form = document.querySelector("form");

    const tbody = document.querySelector("tbody");
    if (!tbody) return;

    tbody.innerHTML = ""; // Clear existing rows

    users.forEach((user: User) => {
      tbody.innerHTML += `
        <tr class="table-row">
          <td class="table-cell">${user.name}</td>
          <td class="table-cell">${user.age}</td>
          <td class="table-cell">
            <button class="text-blue-600 hover:text-blue-700 cursor-pointer"><i data-lucide='Pencil'></i></button>
            <button class="text-red-600 hover:text-red-700 cursor-pointer ml-4"><i data-lucide='Trash'></i></button>
          </td>
        </tr>`;
    });

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = (document.querySelector("#name") as HTMLInputElement).value;
      const age = Number(
        (document.querySelector("#age") as HTMLInputElement).value,
      );

      console.log(name);

      await createUser({ name, age });
      form.reset();
      renderUsers();
    });

    createIcons({ icons: { Pencil, Trash } });
  } catch (error) {
    console.error("Error loading users:", error);
  }
};

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container flex-center h-full">
      <div class="w-full mx-auto p-6">        
        <h1 class="text-3xl font-bold text-center mb-4">Create User</h1>
        <form action="/users" method="POST" class="form-card space-y-6 max-w-md mx-auto">
          <div class="space-y-1">
            <label for="name" class="form-label">Name</label>
            <input id="name" name="name" type="text" placeholder="Name" required
              class="input-field" />
          </div>

          <div class="space-y-1">
            <label for="age" class="form-label">Age</label>
            <input id="age" name="age" type="number" placeholder="Age" required
              class="input-field" />
          </div>

          <button type="submit"
            class="w-full btn-primary">
            Create User
          </button>
        </form>
        
        <hr class="my-8 border-gray-300" />
        
        <h2 class="text-xl font-semibold mb-4">Users List</h2>
        <div class="overflow-x-auto bg-white shadow-md rounded-lg max-h-96">
          <table class="table">
            <thead class="table-header">
              <tr>
                <th scope="col" class="table-header-cell">Name</th>
                <th scope="col" class="table-header-cell">Age</th>
                <th scope="col" class="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">              
              <tr class="table-row">
                <td class="table-cell">Mosfiqur</td>
                <td class="table-cell">01</td>
                <td class="table-cell">
                  <button class="text-blue-600 hover:text-blue-700 cursor-pointer"><i data-lucide='Pencil'></i></button>
                  <button class="text-red-600 hover:text-red-700 cursor-pointer ml-4"><i data-lucide='Trash'></i></button>
                </td>
              </tr>
              <!-- More rows dynamically -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
`;

createIcons({ icons: { Pencil, Trash } });
renderUsers();
