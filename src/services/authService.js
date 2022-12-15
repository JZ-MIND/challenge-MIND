export const signInWithPassword = async (enteredEmail, enteredPassword) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword);
};


export const signUp = async (enteredEmail, enteredPassword) => {
  const url = `${process.env.REACT_APP_FIREBASE_URL}/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  return createAuthCall(url, enteredEmail, enteredPassword);
};

const createAuthCall = (url, enteredEmail, enteredPassword) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
