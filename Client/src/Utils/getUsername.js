async function getUsername() {
  try {
    const res = await fetch("/api/user/profile/username");
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
