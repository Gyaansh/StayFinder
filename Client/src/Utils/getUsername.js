async function getUsername() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/username`);
    const userData = await res.json();
    if(res.ok){
      return userData.data.username;
    }
    else{
      return userData.message
    }
  } catch (err) {
    console.log(err);
  }
}
export default getUsername;
