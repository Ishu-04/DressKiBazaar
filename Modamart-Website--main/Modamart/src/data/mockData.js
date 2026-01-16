const mockData = [
 
    {
        id: 0,
        title: "Product 1",
        description: "These are traditional handcrafted potli-style and ethnic fabric handbags, adorned with zari and mirror work, ideal for festive and wedding occasions.",
        price: 1000,
        category: "Traditional",
        imageName: "Bag1.png"
    },
    {
        id: 1,
        title: "Product 2",
        description: "This is a traditional Meenakari bangle with intricate enamel and stone work, reflecting rich Indian craftsmanship.",
        price: 1050,
        category: "Traditional",
        imageName: "Belt1.jpg"
    },
    {
        id: 2,
        title: "Product 3",
        description: "This is a golden embroidered Anarkali suit with churidar and dupatta – perfect for festive or traditional occasions.",
        price: 1100,
        category: "Traditional",
        imageName: "Dress1.png"
    },
    {
        id: 3,
        title: "Product 4",
        description: "This dress is a women's embroidered straight-cut kurti with traditional ethnic design, commonly worn for festive or cultural occasions.",
        price: 1150,
        category: "Traditional",
        imageName: "Dress2.png"
    },
    {
        id: 4,
        title: "Product 5",
        description: "This is a traditional Indian royal attire for kids, featuring a sherwani with intricate embroidery, a turban (safa), and jewelry for a regal look.",
        price: 1200,
        category: "Traditional",
        imageName: "Kid1.jpg"
    },
    {
        id: 5,
        title: "Product 6",
        description: "This is a traditional Indian royal-style lehenga choli for girls, adorned with heavy embroidery and paired with a decorative turban for a regal appearance.",
        price: 1250,
        category: "Traditional",
        imageName: "Kid2.jpg"
    },
    {
        id: 6,
        title: "Product 7",
        description: "This is a traditional Indian sherwani for boys, richly embroidered and paired with a jeweled turban for a royal ceremonial look.",
        price: 1300,
        category: "Traditional",
        imageName: "Kid3.jpg"
    },
    {
        id: 7,
        title: "Product 8",
        description: "This is a royal-themed traditional Indian combo dress for kids, featuring a Mughal-style sherwani for the boy and an ornate lehenga-choli with crown for the girl.",
        price: 1350,
        category: "Traditional",
        imageName: "Kid4.jpg"
    },
    {
        id: 8,
        title: "Product 9",
        description: "Vibrant Pink Kurta Set with Intricate Embroidery for Little Girls",
        price: 1400,
        category: "Traditional",
        imageName: "Kid5.jpg"
    },
    {
        id: 9,
        title: "Product 10",
        description: "A stunning pink lehenga choli adorned with intricate embroidery and embellishments, perfect for little princesses to shine on special occasions",
        price: 1450,
        category: "Traditional",
        imageName: "Kid6.jpg"
    },
    {
        id: 10,
        title: "Product 11",
        description: "A young girl is wearing a traditional Indian Anarkali suit.",
        price: 1500,
        category: "Traditional",
        imageName: "Kid7.jpg"
    },
    {
        id: 11,
        title: "Product 12",
        description: "A young boy dressed in a traditional Indian sherwani, complete with intricate embroidery and ornate headwear.",
        price: 1550,
        category: "Traditional",
        imageName: "Kid8.jpg"
    },
    {
        id: 12,
        title: "Product 13",
        description: "A beautiful traditional salwar kameez, complete with intricate embroidery and embellishments, perfect for special occasions or formal events.",
        price: 1600,
        category: "Traditional",
        imageName: "Kid9.jpg"
    },
    {
        id: 13,
        title: "Product 14",
        description: "A vibrant pink salwar kameez with intricate gold embroidery and teal accents, perfect for formal or festive occasions",
        price: 1650,
        category: "Traditional",
        imageName: "Kurti2.png"
    },
    {
        id: 14,
        title: "Product 15",
        description: "A traditional Indian lehenga, characterized by its vibrant red color and intricate gold embroidery, typically worn for special occasions such as weddings and festivals.",
        price: 1700,
        category: "Traditional",
        imageName: "Lehenga1.png"
    },
    {
        id: 15,
        title: "Product 16",
        description: "A stunning red lehenga with intricate gold embroidery, perfect for adding a touch of elegance and cultural heritage to your designs.",
        price: 1750,
        category: "Traditional",
        imageName: "Lehenga3.png"
    },
    {
        id: 16,
        title: "Product 17",
        description: "A stunning peach-colored lehenga with intricate embroidery, perfect for adding a touch of elegance to any cultural event or celebration.",
        price: 1800,
        category: "Traditional",
        imageName: "Lehenga4.png"
    },
    {
        id: 17,
        title: "Product 18",
        description: "A woman adorned in a stunning traditional Indian lehenga choli, perfect for capturing the essence of cultural heritage and elegance",
        price: 1850,
        category: "Traditional",
        imageName: "Lehenga6.png"
    },
    {
        id: 18,
        title: "Product 19",
        description: "A stunning traditional Indian lehenga with a vibrant yellow and pink skirt, adorned with intricate patterns and embellishments, perfect for cultural events or special occasions.",
        price: 1900,
        category: "Traditional",
        imageName: "Lehenga7.png"
    },
    {
        id: 19,
        title: "Product 20",
        description: "Traditional Indian Kurta Pyjama set for men.",
        price: 1950,
        category: "Traditional",
        imageName: "Man10.jpg"
    },
    {
        id: 20,
        title: "Product 21",
        description: "The man is dressed in a traditional Indian Sherwani, characterized by its long coat-like design and intricate embroidery, often worn for special events and celebrations.",
        price: 2000,
        category: "Traditional",
        imageName: "Man11.jpg"
    },
    {
        id: 21,
        title: "Product 22",
        description: "A traditional Indian Sherwani, a long coat-like garment typically worn on formal occasions such as weddings and festivals.",
        price: 2050,
        category: "Traditional",
        imageName: "Man12.jpg"
    },
    {
        id: 22,
        title: "Product 23",
        description: "This is a traditional Indian Kurta, a long tunic with intricate designs, often worn for formal and cultural events.",
        price: 2100,
        category: "Traditional",
        imageName: "Man13.jpg"
    },
    {
        id: 23,
        title: "Product 24",
        description: "The man is dressed in a traditional Indian Sherwani, a long coat often worn for formal events.a man dressed in a traditional Indian Sherwani, characterized by its long, formal design and intricate embroidery",
        price: 2150,
        category: "Traditional",
        imageName: "Man15.jpg"
    },
    {
        id: 24,
        title: "Product 25",
        description: "The man is dressed in a traditional Indian Sherwani, a long coat often worn for formal events.",
        price: 2200,
        category: "Traditional",
        imageName: "Man16.jpg"
    },
    {
        id: 25,
        title: "Product 26",
        description: "Traditional men's Juttis with rich embroidery.",
        price: 1000,
        category: "Traditional",
        imageName: "Man17.jpg"
    },
    {
        id: 26,
        title: "Product 27",
        description: "A man wearing a traditional Indian dhoti with a kurta and a colorful vest.",
        price: 1050,
        category: "Traditional",
        imageName: "Man18.jpg"
    },
    {
        id: 27,
        title: "Product 28",
        description: "A man is wearing a traditional Indian Sherwani, adorned with multiple necklaces.",
        price: 1100, category: "Traditional", imageName: "Man19.jpg"
    },
    {
        id: 28,
        title: "Product 29",
        description: "A stylish ensemble featuring a white kurta and dhoti paired with a vibrant, long sherwani or bandhgala, perfect for formal or cultural events.",
        price: 1150,
        category: "Traditional",
        imageName: "Man3.png"
    },
    {
        id: 29,
        title: "Product 30",
        description: "The image features a man wearing a traditional Indian kurta and dhoti, showcasing a classic and elegant attire.",
        price: 1200,
        category: "Traditional",
        imageName: "Man4.jpg"
    },
    {
        id: 30,
        title: "Product 31",
        description: "A man dressed in a traditional Indian kurta and dhoti, characterized by a long blue tunic adorned with gold embroidery and cream-colored loose-fitting pants.",
        price: 1250,
        category: "Traditional",
        imageName: "Man5.jpg"
    },
    {
        id: 31,
        title: "Product 32",
        description: "A Sherwani, which is a traditional Indian long coat worn for formal occasions, characterized by its elegant design and intricate embroidery.",
        price: 1300,
        category: "Traditional",
        imageName: "Man9.jpg"
    },
    {
        id: 32,
        title: "Product 33",
        description: "A pair of traditional Indian juttis adorned with vibrant embroidery, perfect for adding a touch of cultural elegance to any outfit.",
        price: 1350,
        category: "Traditional",
        imageName: "Mojari.png"
    },
    {
        id: 33,
        title: "Product 34",
        description: "A pair of traditional Indian juttis adorned with vibrant embroidery, perfect for adding a touch of cultural elegance to any outfit.",
        price: 1400,
        category: "Traditional",
        imageName: "Mojari3.jpg"
    },
    {
        id: 34,
        title: "Product 35",
        description: "These traditional Indian Mojari shoes feature elegant green fabric with gold embroidery, perfect for adding a touch of cultural heritage to any outfit.",
        price: 1450,
        category: "Traditional",
        imageName: "Mojari4.jpg"
    },
    {
        id: 35,
        title: "Product 36",
        description: "Traditional Indian Mojari shoes with intricate embroidery and ornate designs.",
        price: 1500,
        category: "Traditional",
        imageName: "Mojari4.png"
    },
    {
        id: 36,
        title: "Product 37",
        description: "Elegant Khussa shoes adorned with intricate embroidery, perfect for adding a touch of traditional Indian flair to any outfit.",
        price: 1550,
        category: "Traditional",
        imageName: "Mojari5.jpg"
    },
    {
        id: 37,
        title: "Product 38",
        description: "Traditional Indian Juttis with intricate gold embroidery.",
        price: 1600,
        category: "Traditional",
        imageName: "Mojari5.png"
    },
    {
        id: 38,
        title: "Product 39",
        description: "A stunning diamond-set choker necklace, perfect for adding a touch of elegance and tradition to any outfit.",
        price: 1650,
        category: "Traditional",
        imageName: "Mojari6.jpg"
    },
    {
        id: 39,
        title: "Product 40",
        description: "Elegant white juti with gold embroidery, perfect for traditional Indian attire.",
        price: 1700,
        category: "Traditional",
        imageName: "Mojari6.png"
    },
    {
        id: 40,
        title: "Product 41",
        description: "This stunning V-shaped diamond necklace features a central pendant surrounded by sparkling diamonds, creating a luxurious and eye-catching piece of jewelry.",
        price: 1750,
        category: "Traditional",
        imageName: "Saddle1.jpg"
    },
    {
        id: 41,
        title: "Product 42", description: "A classic equestrian accessory designed for comfort and style in Western horse riding.",
        price: 1800,
        category: "Traditional",
        imageName: "Saree1.png"
    },
    {
        id: 42,
        title: "Product 43",
        description: "This stunning Banarasi saree features intricate designs and luxurious fabric, perfect for adding a touch of elegance to any occasion.",
        price: 1850,
        category: "Traditional",
        imageName: "Saree2.png"
    },
    {
        id: 43,
        title: "Product 44",
        description: "Elegant Fancy saree with intricate embroidery and luxurious fabric.",
        price: 1900,
        category: "Traditional",
        imageName: "Saree3.png"
    },
    {
        id: 44,
        title: "Product 45",
        description: "Elegant Banarasi saree with intricate embroidery and luxurious fabric.",
        price: 1950,
        category: "Traditional",
        imageName: "Shoe1.jpg"
    },
    {
        id: 45,
        title: "Product 46",
        description: "Traditional Peshawari Chappal with intricate embroidery and luxurious leather.",
        price: 2000,
        category: "Traditional",
        imageName: "Shoe2.jpg"
    },
    {
        id: 46,
        title: "Product 47",
        description: "Traditional Peshawari Chappal: A classic men's footwear option featuring dark brown leather and detailed stitching.",
        price: 2050,
        category: "Traditional",
        imageName: "Shoe3.jpg"
    },
    {
        id: 47,
        title: "Product 48",
        description: "These men's Juttis feature intricate embroidery and studs, blending traditional craftsmanship with modern style.",
        price: 2100,
        category: "Traditional",
        imageName: "Man6.jpg"
    },

    {
        id: 48,
        title: "Product 49",
        description: "A man dressed in a traditional Indian Sherwani, a long coat often worn for formal events.",
        price: 2200,
        category: "Traditional",
        imageName: "Man8.jpg"
    },


  {
        id: 49,
        title: "Product 50",
        description: "A man dressed in a  Navy blue traditional Indian Sherwani for attending Royal wedding and functions .",
        price: 4600,
        category: "Traditional",
        imageName: "Man20.jpg"
    },


]

export default mockData;