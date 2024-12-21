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
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 7 Confirm Password
export const ConfirmPassword = async (email, newpassword) => {
  try {
    const res = await fetch(
      "https://backend-v2-osaw.onrender.com/auth/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newpassword }),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error while updating Item: " + error);
  }
};

// 8 Referal Code Check
export const referalCodeCkeck = async (referralCode) => {
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
