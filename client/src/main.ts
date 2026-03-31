import "./style.css";
import { createIcons, Pencil, Trash } from "lucide";
import { getUsers, createUser, deleteUser, updateUser } from "./api/users";

type User = {
  _id: string;
  name: string;
  age: number;
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

        <button type="button" id="cancelEdit" class="hidden w-full bg-gray-400 text-white py-2 rounded">
          Cancel Edit
        </button>

        <p id="toast" class="hidden fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow">
          Success
        </p>
        
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

const form = document.querySelector("form") as HTMLFormElement;
const cancelBtn = document.getElementById("cancelEdit") as HTMLButtonElement;

let allUsers: User[] = [];
let editingUserId: string | null = null;

const renderUsers = async () => {
  const users: User[] = await getUsers();
  allUsers = users;

  const tbody = document.querySelector("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  users.forEach((user) => {
    tbody.innerHTML += `
        <tr class="table-row">
          <td class="table-cell">${user.name}</td>
          <td class="table-cell">${user.age}</td>
          <td class="table-cell">
            <button data-edit="${user._id}" class="text-blue-600 hover:text-blue-700 cursor-pointer"><i data-lucide='Pencil'></i></button>
            <button data-delete="${user._id}" class="text-red-600 hover:text-red-700 cursor-pointer ml-4"><i data-lucide='Trash'></i></button>
          </td>
        </tr>
      `;
  });

  createIcons({ icons: { Pencil, Trash } });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = (document.querySelector("#name") as HTMLInputElement).value;
  const age = Number(
    (document.querySelector("#age") as HTMLInputElement).value,
  );

  if (editingUserId) {
    await updateUser(editingUserId, { name, age });
    showToast("Updated ✅");

    editingUserId = null;
    cancelBtn.classList.add("hidden");
    form.querySelector("button")!.textContent = "Create User";
  } else {
    await createUser({ name, age });
    showToast("Created ✅");
  }

  form.reset();
  renderUsers();
});

cancelBtn.addEventListener("click", () => {
  editingUserId = null;
  form.reset();
  cancelBtn.classList.add("hidden");
  form.querySelector("button")!.textContent = "Create User";
});

document.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;

  const deleteBtn = target.closest("[data-delete]") as HTMLElement;
  const editBtn = target.closest("[data-edit]") as HTMLElement;

  if (deleteBtn) {
    const id = deleteBtn.dataset.delete!;
    await deleteUser(id);
    showToast("Deleted 🗑");
    renderUsers();
  }

  if (editBtn) {
    const id = editBtn.dataset.edit!;
    const user = allUsers.find((u) => u._id === id);

    if (!user) return;

    (document.querySelector("#name") as HTMLInputElement).value = user.name;
    (document.querySelector("#age") as HTMLInputElement).value =
      user.age.toString();

    editingUserId = id;
    cancelBtn.classList.remove("hidden");
    form.querySelector("button")!.textContent = "Update User";
  }
});

const showToast = (msg: string) => {
  const toast = document.getElementById("toast")!;
  toast.textContent = msg;
  toast.classList.remove("hidden");

  setTimeout(() => toast.classList.add("hidden"), 2000);
};

renderUsers();
