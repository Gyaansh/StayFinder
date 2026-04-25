import mongoose from "mongoose";
const DbConnect = ()=>{

  async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
  }

  main()
    .then( () => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
  // init();
  // async function init() {
  //   await Listing.deleteMany({});
  //   await Listing.insertMany(newData);
  // }
}
DbConnect();
export default DbConnect;