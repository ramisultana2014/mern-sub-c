//const API_URL = "http://127.0.0.1:3000";
const API_URL = "https://sub-c-api.onrender.com";
export async function createOrder({ orderObj, email }) {
  //console.log(orderObj);
  try {
    const res = await fetch(`/api/orders/createorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Email ${JSON.stringify(email.email)}`,
        credentials: "include",
      },
      body: JSON.stringify(orderObj),
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
export async function getOrder({ orderId, email }) {
  try {
    const res = await fetch(`/api/orders/orderstatus/${orderId.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Email ${JSON.stringify(email.email)}`,
        credentials: "include",
      },
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
