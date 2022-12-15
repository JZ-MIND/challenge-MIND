export const getAccounts = async () => {
  return fetch(`${process.env.REACT_APP_DB}/accounts.json`);
};

export const createAccount = async (user) => {
  return fetch(`${process.env.REACT_APP_DB}/accounts.json`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
