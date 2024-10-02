//const API_URL = "http://127.0.0.1:3000";
const API_URL = "https://sub-c-api.onrender.com";
export async function createReview({ reviewObj, email }) {
  //console.log(orderObj);
  try {
    const res = await fetch(`/api/reviews/createReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Email ${JSON.stringify(email.email)}`,
        credentials: "include",
      },
      body: JSON.stringify(reviewObj),
    });
    if (!res.ok) throw new Error("failed please try again");
    const { data } = await res.json();
    // console.log("api", data);
    return data;
  } catch (err) {
    throw new Error(err.message || "something went wrong");
  }
}
