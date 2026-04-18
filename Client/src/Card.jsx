import { Link } from "react-router-dom";
  const Card = ({list}) => {
    const coverImage = list.images?.[0]?.url || "";

    let [rupees, paise=""] = list.price.toString().split('.');
    paise = paise.slice(0,2)
    return (
      <>
        <Link to={`/listing/${list._id}`}>
          <div className="border-2 border-transparent shadow-xl max-w-63 h-70 max-h-74 rounded-2xl border-grey-100 hover:scale-103 transition-all duration-200 ease-in-out m-4 cursor-pointer bg-white">
            <img
              src={coverImage}
              alt={list.title}
              loading="lazy"
              width={250}
              height={250}
              className="rounded-2xl "
            />
            <div className="p-1 ">
              <h3>{list.title}</h3>
              <p className="text-xs mt-1 overflow-hidden text-ellipsis">{list.description}</p>
              <h2 className="font-medium text-xl ">₹{rupees}{paise!=="00" && <sup className="text-xs relative -top-3">{paise}</sup>}</h2>
            </div>
          </div>
        </Link>
      </>
    );
  };

  export default Card;
