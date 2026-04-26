
const getListingByid = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listing/${id}`);
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error(err);
    }
}
export default getListingByid;