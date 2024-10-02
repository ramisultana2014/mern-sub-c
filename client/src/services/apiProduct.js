//const API_URL = "http://127.0.0.1:3000";
const API_URL = "https://sub-c-api.onrender.com";

export async function getAllProduct(email) {
  //console.log(email);

  try {
    const res = await fetch(`/api/products/`, {
      method: "GET",
      headers: {
        Authorization: `Email ${JSON.stringify(email.email)}`,
      },
    });
    if (!res.ok) throw new Error("Failed getting products");
    const { data } = await res.json();
    //console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
