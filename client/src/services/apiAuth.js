//const API_URL = "http://127.0.0.1:3000";
const API_URL = "https://sub-c-api.onrender.com";
export async function signup(signupObj) {
  try {
    const res = await fetch(`/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupObj),
    });
    if (!res.ok) throw new Error("email already exist");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function login(loginObj) {
  try {
    const res = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function activateUserAccount(obj) {
  //console.log(obj);
  try {
    const res = await fetch(`/api/users/activatTheAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function requestNewCode(obj) {
  try {
    const res = await fetch(`/api/users/requestnewcode`, {
      method: "POSt",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) throw new Error("failed please try again");
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function forgetPassword(obj) {
  try {
    const res = await fetch(`/api/users/forgetPassword`, {
      method: "POSt",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) throw new Error("failed please try again");
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function resetPassword(Obj) {
  try {
    const res = await fetch(`/api/users/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Obj),
    });
    //console.log("res", res);
    if (!res.ok) throw new Error("something went wrong");
    const { data } = await res.json();

    return data;
  } catch (err) {
    //console.log("api", err.message);
    throw new Error(err.message || "something went wrong");
  }
}
