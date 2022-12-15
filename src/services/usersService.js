export const getUsers = async () => {
  return fetch(`${process.env.REACT_APP_DB}/users.json`);
};

export const removeUser = async (userId) => {
  return fetch(`${process.env.REACT_APP_DB}/users/${userId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateUser = async (id, user) => {
  return fetch(`${process.env.REACT_APP_DB}/users/${id}.json`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createUser = async (user) => {
  return fetch(`${process.env.REACT_APP_DB}/users.json`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
