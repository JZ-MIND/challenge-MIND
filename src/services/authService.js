export const signInWithPassword = async (enteredEmail, enteredPassword) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword);
};

export const signUp = async (
  enteredEmail,
  enteredPassword,
  displayName = ""
) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword, displayName);
};

const createAuthCall = (
  url,
  enteredEmail,
  enteredPassword,
  displayName = ""
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
      displayName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
