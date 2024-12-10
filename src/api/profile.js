import Cookies from "js-cookie";

export const createUser = async (formData) => {
  try {
    const res = await fetch(
      "https://ventureloop-server.onrender.com/api/profiles",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async (id) => {
  try {
    const res = await fetch(
      `https://ventureloop-server.onrender.com/api/profiles/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserInfo = async (formData) => {
  try {
    const res = await fetch(
      "https://ventureloop-server.onrender.com/api/profiles/${id}",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await fetch(
      `https://ventureloop-server.onrender.com/api/profiles/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while deleting item:", error);
  }
};
