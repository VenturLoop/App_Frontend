//1 Sent otp to email address
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

// 2 Verify OTP
export const SentOPT = async (email, verificationCode) => {
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

// 3 Resent Verify OTP
export const ResentOPT = async (email) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/resend",
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

// 4 Sign Up
export const createAccount = async (
  name,
  email,
  password,
  birthday,
  location
) => {
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
          password: password,
          birthday: birthday,
          location: location,
        }),
      }
    );

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

// 5 login with email and password
export const userLogin = async (email, password) => {
  try {
    const res = await fetch("https://backend-v2-osaw.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 6 Forgot Password
export const ForgotPassword = async (email) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/forgot",
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
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 7 Confirm Password
export const ConfirmPassword = async (email, newPassword) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, newPassword: newPassword }),
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 8 Referal Code Check
export const referalCodeCheck = async (referralCode) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/referal",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ referralCode }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 9 Delete User
export const DeleteUserAccount = async (userId) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 10
export const submitProfileApi = async ({
  userId,
  skillSet,
  industries,
  priorStartupExperience,
  commitmentLevel,
  equityExpectation,
  status,
}) => {
  console.log("Data being sent to the backend:", {
    userId,
    skillSet,
    industries,
    priorStartupExperience,
    commitmentLevel,
    equityExpectation,
    status,
  });

  try {
    const res = await fetch(
      `https://backend-v2-osaw.onrender.com/auth/user/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skillSet,
          industries,
          priorStartupExperience,
          commitmentLevel,
          equityExpectation,
          status,
        }),
      }
    );

    if (!res.ok) {
      // Log the response from the backend to get error details
      const errorData = await res.json();
      console.error("Backend error:", errorData.message);
      throw new Error(`Error saving user profile: ${errorData.message}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

// 11 Get user profile data from server
export const getUserDataProfile = async (userId) => {
  try {
    const res = await fetch(
      `https://backend-v2-osaw.onrender.com/api/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 12 Update user when edit profile save button is clicked
export const UpdateUserProfileInEditProfile = async ({
  userId,
  status,
  profilePhoto,
  birthday,
  bio,
  location,
  skillSet,
  industries,
  priorStartupExperience,
  commitmentLevel,
  equityExpectation,
  education, // Array of updated education data (objects)
  experience, // Array of updated experience data (objects)
  projects,
}) => {
  try {
    const res = await fetch(
      `https://backend-v2-osaw.onrender.com/api/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          status,
          profilePhoto,
          birthday,
          bio,
          location,
          skillSet,
          industries,
          priorStartupExperience,
          commitmentLevel,
          equityExpectation,
          education,
          experience,
          projects,
        }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Error saving user profile");
    }
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
