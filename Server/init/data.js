const sampleListings =[
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful retreat surrounded by pine forests with stunning mountain views.",
    price: 120,
    location: "Manali",
    country: "India"
  },
  {
    title: "Beachfront Paradise",
    description: "Wake up to the sound of waves and enjoy private beach access.",
    price: 200,
    location: "Goa",
    country: "India"
  },
  {
    title: "Urban Studio Loft",
    description: "Modern loft in the heart of the city, close to nightlife and restaurants.",
    price: 95,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Countryside Farm Stay",
    description: "Experience rural life with organic meals and open fields.",
    price: 75,
    location: "Nashik",
    country: "India"
  },
  {
    title: "Luxury Lake House",
    description: "Elegant home with panoramic lake views and a private dock.",
    price: 350,
    location: "Lake Como",
    country: "Italy"
  },
  {
    title: "Historic Castle Room",
    description: "Stay like royalty in a renovated 15th-century castle.",
    price: 280,
    location: "Edinburgh",
    country: "Scotland"
  },
  {
    title: "Modern Apartment with Skyline View",
    description: "Minimalist apartment overlooking downtown skyscrapers.",
    price: 150,
    location: "New York",
    country: "USA"
  },
  {
    title: "Desert Safari Camp",
    description: "A unique tent stay amidst sand dunes under a starlit sky.",
    price: 110,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Snow Chalet Retreat",
    description: "A cozy wooden chalet perfect for skiing and winter sports.",
    price: 180,
    location: "Zermatt",
    country: "Switzerland"
  },
  {
    title: "Seaside Cottage",
    description: "Charming cottage just steps from the sea with a lovely patio.",
    price: 130,
    location: "Brighton",
    country: "England"
  },
  {
    title: "Private Island Villa",
    description: "Exclusive villa on a private island with crystal-clear waters.",
    price: 900,
    location: "Phuket",
    country: "Thailand"
  },
  {
    title: "Art District Loft",
    description: "Loft apartment filled with local art in a trendy neighborhood.",
    price: 125,
    location: "Berlin",
    country: "Germany"
  },
  {
    title: "Hilltop Bungalow",
    description: "Beautiful view of green valleys and tea plantations.",
    price: 140,
    location: "Munnar",
    country: "India"
  },
  {
    title: "Traditional Ryokan",
    description: "Authentic Japanese inn with tatami mats and hot spring baths.",
    price: 210,
    location: "Kyoto",
    country: "Japan"
  },
  {
    title: "Desert Dome Stay",
    description: "Futuristic dome home with solar power and desert views.",
    price: 190,
    location: "Nevada",
    country: "USA"
  },
  {
    title: "Oceanview Penthouse",
    description: "Luxury penthouse with infinity pool and ocean panorama.",
    price: 480,
    location: "Sydney",
    country: "Australia"
  },
  {
    title: "Forest Treehouse",
    description: "Eco-friendly treehouse surrounded by wildlife and nature trails.",
    price: 160,
    location: "Coorg",
    country: "India"
  },
  {
    title: "Downtown Condo",
    description: "Centrally located condo ideal for business travelers.",
    price: 100,
    location: "Toronto",
    country: "Canada"
  },
  {
    title: "Vintage Heritage Home",
    description: "Colonial-style home with antique decor and courtyard.",
    price: 145,
    location: "Pondicherry",
    country: "India"
  },
  {
    title: "Luxury Safari Lodge",
    description: "All-inclusive stay near a national park with guided wildlife tours.",
    price: 400,
    location: "Nairobi",
    country: "Kenya"
  },
  {
    title: "Cliffside Retreat",
    description: "A secluded escape with panoramic ocean cliffs.",
    price: 220,
    location: "Santorini",
    country: "Greece"
  },
  {
    title: "Cityview Apartment",
    description: "Stylish apartment overlooking the city skyline.",
    price: 130,
    location: "Singapore",
    country: "Singapore"
  },
  {
    title: "Riverside Cabin",
    description: "Cabin with a private deck by the river and barbecue area.",
    price: 115,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Tropical Garden Villa",
    description: "Relax in a spacious villa surrounded by lush tropical gardens.",
    price: 250,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Minimalist Studio Flat",
    description: "Compact and efficient space ideal for solo travelers.",
    price: 80,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Ski Resort Cabin",
    description: "Warm cabin near ski slopes with a fireplace and hot tub.",
    price: 210,
    location: "Aspen",
    country: "USA"
  },
  {
    title: "Lakefront Cottage",
    description: "Quiet lakeside retreat perfect for fishing and kayaking.",
    price: 170,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Historic City Apartment",
    description: "Old-town apartment with stone walls and modern comforts.",
    price: 155,
    location: "Prague",
    country: "Czech Republic"
  },
  {
    title: "Beach Hut Escape",
    description: "Simple bamboo hut right on the beach for a back-to-nature vibe.",
    price: 90,
    location: "Varkala",
    country: "India"
  },
  {
    title: "Luxury Sky Villa",
    description: "Top-floor villa with glass walls, pool, and private elevator.",
    price: 750,
    location: "Dubai",
    country: "UAE"
  }
];
// console.log(sampleListings.length);

// module.exports = { data: sampleListings };


const URLS = [
  
  "https://www.rollingstone.com/wp-content/uploads/2025/07/225956.jpg?w=1581&h=1054&crop=1",
  "https://www.travelandleisure.com/thmb/cgkfjLyVNXv8XyZlBJYDqPhTTjU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-airbnb-vermont-AIRBNBCNECTONS1025-d44e82ee7f3342f9b76e417f3e1482fb.jpg",
  "https://people.com/thmb/57s_itmZlHIwPn8YQgknQ1p9v38=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x0:601x2)/airbnb-8-833d6208c25240fa8febeb597037d903.jpg",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg?resize=2400,1260",
  "https://media.cntraveler.com/photos/5d112d50c4d7bd806dbc00a4/16:9/w_2560%2Cc_limit/airbnb%2520luxe.jpg",
  "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/6976/images/0e6a64-b732-f51-c866-32d17c43b_5_Short_Term_Rental_Design_Tips_from_Top-Rated_Airbnb_Hosts.jpg",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2023/04/Private-Room-Cape-Town.jpeg",
  "https://media.cntravellerme.com/photos/67b585e047e072f0821a499d/4:3/w_1888,h_1416,c_limit/CNT_$100%20Airbnbs%20Around%20the%20World_1123375527901781261%20.png",
  "https://images.adsttc.com/media/images/59ef/fef7/b22e/3819/9400/0018/medium_jpg/999_47.jpg?1508900596",
  "https://a0.muscache.com/im/pictures/139f6ef1-0793-4c6f-9aa5-34d3fdb7020b.jpg",
  "https://images.squarespace-cdn.com/content/v1/5e72c8bfe21ad940ba788673/1626985470666-LVUUK5JZ5LE0O893756Z/what-is-airbnb-thumbnail.jpg",
  "https://etimg.etb2bimg.com/photo/99991759.cms",
  "https://plus.unsplash.com/premium_photo-1684508638760-72ad80c0055f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlyYm5ifGVufDB8fDB8fHww",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2024/04/01-Musee-dOrsay-Icons-Airbnb-Credit-Frederik-Vercruysse.jpg?fit=2662,1776",
  "https://assets.cntraveller.in/photos/6886f33321edcddedd073bdd/3:2/w_3000,h_2000,c_limit/Airbnb-Rooms-Bangkok-Bedroom-2023-Summer-Release.jpg",
  "https://cdn1.matadornetwork.com/blogs/1/2023/08/Jaipur-Airbnb-with-pri","https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/16676759/airbnb_luxe_announcement.jpg?quality=90&strip=all&crop=0,0.30112594920136,100,99.397748101597",
  "https://news.airbnb.com/wp-content/uploads/sites/4/2020/05/Airbnb-Beachfront-Greece.jpg?w=2400",
  "https://images.squarespace-cdn.com/content/v1/62707bb295535a1426e4aa2e/b3f9dcf7-7928-498d-a063-9b9845448547/mountain-haven-retreat-vacation-rental-airbnb-shingletown-california_0002.jpg",
  "https://www.brightbazaarblog.com/wp-content/uploads/2020/10/palm-springs-airbnb-1.jpg,vate-pool-near-Amber-Palace-1.jpg",
  "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlyYm5ifGVufDB8fDB8fHww",
  "https://media.assettype.com/homegrown%2Fimport%2Fimg%2Ffacebook%2F936-xefzupteaq-1487694968.jpg?w=480&auto=format%2Ccompress&fit=max",
  "https://www.shutterstock.com/image-photo/winter-cottages-remote-area-quebec-600nw-2263026169.jpg",
  "https://images.barrons.com/im-36155696?width=940&height=626",
  "https://bridgesandballoons.com/Images/2019/07/wooden-house-airbnb-Tokyo-4-872x584.jpg",
  "https://media.architecturaldigest.com/photos/62964f1a0e7a880da40c10d7/16:9/w_2560%2Cc_limit/GraniteFalls.png",
  "https://www.livelikeitstheweekend.com/wp-content/uploads/2023/02/12d9a012-87ef-4fb5-bc5a-a5ceeb6c1762.webp",
  "https://www.bontraveler.com/wp-content/uploads/2020/09/36cd0f8c_original-1024x683.jpg",
  "https://cdn.mos.cms.futurecdn.net/b5nQoA94JPwDQJnsmMftBV.jpg",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/500186631.jpg?k=6a11cf47ce872bc29c21755473d6f95bad3c17edac7bd566a8b0ff980512f2bb&o="
];
