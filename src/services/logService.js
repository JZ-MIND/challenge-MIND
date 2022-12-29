import axios from "axios";

export const getLogs = async () => {
  return fetch(`${process.env.REACT_APP_DB}/logs.json`);
};

export const createLog = async (log) => {
  const dataLog = createDataLog(log);
  return fetch(`${process.env.REACT_APP_DB}/logs.json`, {
    method: "POST",
    body: JSON.stringify(dataLog),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createDataLog = (log) => {
  return {
    date: new Date().toISOString(),
    user: log.user,
    action: log.action,
    account: log.account,
  };
};
