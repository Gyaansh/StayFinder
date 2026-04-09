async function getUserId() {
    try {
    const res = await fetch("/api/user/profile/username");
    const userData = await res.json();
    if(res.ok){
      const userId = userData.data.id;
      return userId;
    }
    else{
      return userData.message
    }
  } catch (err) {
    console.log(err);
  }
}
export default getUserId;