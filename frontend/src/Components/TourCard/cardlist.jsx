const cardList = [
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1679541668015-8906c2cd6bc2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Goa",
    p:" Goa can be the perfect destination for a short holiday. Its sandy beaches and sunny weather attract people from across the globe. Moreover, it has multiple options for entertainment, like parties and nightlife, which also add to an exquisite holiday."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1697730409114-ff9db6cc8277?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Dubai",
    p: "Planning a trip to Dubai anytime soon is an extraordinary idea that guarantees a one-of-a-kind experience. This futuristic city never ceases to amaze, and with each passing year, it evolves into a grander spectacle.Beyond the iconic landmarks, Dubai will continue to embrace its cultural heritage, offering immersive experiences in traditional souks, cultural festivals, and authentic Emirati cuisine."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1661964426242-4e0b87e16bcd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"America",
    p:"The USA is really famous for all its national parks, animal sanctuaries, and natural destinations like Niagara Falls, Yellowstone National Park, the Great Canyon, Glacier National Park, and such places. When you visit this great country, don't ever forget to visit these places."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1678303396234-4180231353df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"kerala",
    p:"It is a perfect gateway for nature lovers, adventure seekers, honeymooners, families and backpackers. Kerala allure with her sun and sand, blue backwater inlets, splendid historical monuments, spice plantations, tea and coffee gardens, lush green forests and much more."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1681425891763-ed220ee2b762?q=80&w=1524&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Lucknow",
    p:"From a vibrant culinary scene and exquisite historical monuments to its rich art and culture and vestiges of colonial charm, the city of nawabs, as it is popularly called, is as welcoming as is the warmth of its people."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1664298172540-73cfb538363d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Mumbai",
    p:"Mumbai has number of beautiful temples, mosques & churches. The list of religious places in Mumbai includes Siddhivinayak Temple, Mahalaxmi Temple, Haji Ali Dargah, Global Vipassana Pagoda, St Thomas Cathedral, Iskcon Temple, the Mount Bandra Church and many more."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1694475148897-221fb315dc0e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Agra",
    p:"Agra is one of the most populous cities in Uttar Pradesh, and the 24th most populous in India. Agra is a major tourist destination because of its many Mughal-era buildings, most notably the Tāj Mahal, Agra Fort and Fatehpūr Sikrī, all three of which are UNESCO World Heritage Sites."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1694475524027-f33de047f7c9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Tamil-Nadu",
    p:"Tamil Nadu is a preferred travel destination for many due its Beach, Relaxation, Pilgrimage, Hills & Mountains, Adventure, Wildlife, Trek, Food and Heritage. Get to relish the local cuisine, learn about their culture and create tons of memories."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Delhi",
    p:"Delhi is famous for tourism because it is a city that offers a rich cultural, historical, and architectural heritage. The city has been the capital of various empires throughout history, including the Mughal, British, and post-independence Indian empires."
  },

  {
    Image:
      "https://plus.unsplash.com/premium_photo-1661938135446-9aae7262fed5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Kashmir",
    p:"Picturesque and enchanting, Kashmir is cradled high in the lofty green Himalayas and hailed all over the world for its incredible natural beauty. Surrounded by mountain peaks, lush green valleys, glistening lakes, temples and spectacular Mughal-era gardens, it has inspired poets through centuries."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1670176447304-7e37b9acc63f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Kushinagar",
    p:"As the place where Gautam Buddha attained Mahaparinirvana, Kushinagar in the Indian state of Uttar Pradesh is one of four holy places important to Buddhists across the world. Just 53 kilometres from Gorakhpur, Kushinagar is a popular tourist destination due to its historical significance, stupas, and temples."
  },
  {
    Image:
      "https://plus.unsplash.com/premium_photo-1661949303004-bab6b7a82912?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "",
    place:"Mathura",
    p:"The city is renowned for several temples dedicated to Lord Krishna, who is one of the most popular and loved incarnations of Lord Vishnu. They give a peek into the era of the divine, depicted in the phases of Lord Krishna's life."
  },
];

export default cardList;
