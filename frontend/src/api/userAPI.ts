const USER_API_URL = "http://localhost:3001/users";

export const getProfileInfo = async (userName: string, curentUser: string) => {
  const response = await fetch(`${USER_API_URL}/${userName}/${curentUser}`, {
    method: "GET",
  });
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};

export const getProfilepicture = async (userName: string) => {
  const response = await fetch(`${USER_API_URL}/${userName}`, {
    method: "GET",
  });
  if (!response.ok) {
    const data = await response.json();
    throw {
      status: response.status,
      message: data.message,
    };
  }
  return response.json();
};
