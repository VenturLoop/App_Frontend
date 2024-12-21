export const signInwithEmail = async (formData) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/verify-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const SentOPT = async (email , verificationCode) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const ResentOPT = async (email) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/resend-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createPass = async (name, email, newPassword) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: newPassword,
        }),
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
