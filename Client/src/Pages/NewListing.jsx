import Footer from "../Footer"
import EditListing from "../EditListing"
function Newlisting(){
    return(<>
        <EditListing mode="new" />
        <Footer/>
    </>)
}
export default Newlisting
