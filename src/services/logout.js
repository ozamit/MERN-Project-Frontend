export async function logoutUser() {
  console.log("logoutUser");
  localStorage.removeItem("user");
  window.location.reload(false);
}
