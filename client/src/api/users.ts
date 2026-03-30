const getUsers = async () => {
  const response = await fetch("/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const createUser = async (user: { name: string; age: number }) => {
  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};

const deleteUser = async (id: string) => {
  await fetch(`/users/${id}`, {
    method: "DELETE",
  });
};

export { getUsers, createUser, deleteUser };
