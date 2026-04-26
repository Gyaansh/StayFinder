import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Card from './Card';
import CardSkeleton from './CardSkeleton';
const CardList = ({ ownerId }) => {
    let [userData , setUserData] = useState({data:[]})
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'place';

    useEffect(()=>{
        let url = search ? `${import.meta.env.VITE_API_URL}/api/listing?search=${encodeURIComponent(search)}&type=${type}` : "${import.meta.env.VITE_API_URL}/api/listing";
        if (ownerId) {
            url = `${import.meta.env.VITE_API_URL}/api/listing?owner=${ownerId}`;
        } else if (search) {
            url = `${import.meta.env.VITE_API_URL}/api/listing?search=${encodeURIComponent(search)}&type=${type}`;
        } else {
            url = `${import.meta.env.VITE_API_URL}/api/listing`;
        }

        setLoading(true);
        fetch(url)
        .then((res)=> res.json())
        .then((res)=> {
            setUserData(res);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    },[search, type, ownerId]);

    return (
        <>
        <div className='bg-[#f2ede9]'>
        <div className="p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-2   ">
            {loading ? (
                Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)
            ) : (
                userData.data.map((list)=>{
                   return <Card key={list._id} list={list}/>
                })
            )}
        </div>
        </div>
        </>
    )
}

export default CardList
