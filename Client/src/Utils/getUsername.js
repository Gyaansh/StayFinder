async function getUsername() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/user/profile/username`,
      {
        credentials: "include" 
      }
    );

    const userData = await res.json();

    if (res.ok) {
      return userData.data.username;
    } else {
      return null; // better than returning message
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
export default getUsername