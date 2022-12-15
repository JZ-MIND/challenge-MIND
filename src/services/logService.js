import axios from "axios";

export const getLogs = async () => {
  return fetch(`${process.env.REACT_APP_DB}/logs.json`);
};

export const createLog = async (action) => {
  const dataLog = await createDataLog(action);
  return fetch(`${process.env.REACT_APP_DB}/logs.json`, {
    method: "POST",
    body: JSON.stringify(dataLog),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const createDataLog = async (action) => {
  const { ip } = await getIpClient();
  return {
    date: new Date().toISOString(),
    action,
    ip: ip || "no IP obtained",
  };
};

async function getIpClient() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const { data: ip } = response;
    return ip;
  } catch (error) {
    console.error(error);
    return null;
  }
}
