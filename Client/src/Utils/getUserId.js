async function getUserId() {
    try {
    const res = await fetch("/api/user/profile/username");
    const userData = await res.json();
    if(userData.ok){
      return userData.data.id;
    }
    else{
      return userData.message
    }
  } catch (err) {
    console.log(err);
  }
}
export default getUserId;