import mongoose from "mongoose";

const DbConnect = ()=>{
console.log("ATLAS_URL: ",process.env.ATLAS_URL)
  async function main() {
    await mongoose.connect(process.env.ATLAS_URL);

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
export default DbConnect;