import jsonServer from "json-server"
import auth from "json-server-auth"; 
import {jwtDecode} from "jwt-decode"
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
import fs from "fs"
server.use(middlewares);
server.use(jsonServer.bodyParser);
const port = 3000;
server.db = router.db
server.use(auth)
// Hàm xử lý logic
const GetMaxID = (collection) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const data = db[collection];
  if (!data || data.length === 0) {
    return 0; 
  }
  const max = Math.max(...data.map(item => item.id));
  return max;
};
const GetInfoById = (id,collection)=>{
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const data = db[collection];
  return data.filter(item=>item.id==id).shift()
}
const GetInfoVariantProduct = (product)=>{
    if (product.variant) {
      const variant = product.variant.map(item=>{
        const info = GetInfoById(item.type,"variants")
        info.items = undefined
        return {...item, type:info}
      })
      return {...product,variant}
    } else {
      return product
    }
}
const Permission = (req,res,next)=>{
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Vui lòng đăng nhập" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwtDecode(token);
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const user = db.users.find((u) => u.email === decoded.email);
    if (!user) {
      return res.status(404).json({error:"Không tìm thấy user"});
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: "Token không đúng, vui lòng đăng nhập"+error });
  }
}
// Router
server.post("/create-collection", (req, res) => {
  const collections = ["products", "variants", "carts", "orders"]
  try {
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    let isUpdated = false;
    for (const item of collections) {
      if (!db[item]) {
        db[item] = [];
        isUpdated = true;
      }
    }
    if (isUpdated) {
      fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");
    }

    res.status(201).json({ message: "Collections created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update db.json", details: error.message });
  }
})
server.post("/products", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));  
  const {variants} = req.body;
  req.body.variants = undefined
  const newProduct = {
    id: GetMaxID("products") + 1,
    ...req.body,
    type: "simple",
    parent:0
  };
  const product_variants = []
  if (variants){
  variants.forEach((items,index)=>{
      const {price,image} = items
      items.price = undefined
      items.image = undefined
      const item = {
        id: GetMaxID("products") + 2+index,
        ...req.body,
        variant:items.key,
        price:price,        image:image,
        type: "product_variation",
        parent:GetMaxID("products") + 1
      }
      product_variants.push(item)
  })
}
  db.products = [...db.products,newProduct,...product_variants]
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");
  res.status(201).json(newProduct);
});
server.put("/products/:id", (req, res) => {
  const {id}= req.params
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));  
  const {products} = db;
  const {variants} = req.body;
  req.body.variants = undefined
  const index = products.findIndex((p) => p.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  db.products[index] = { ...products[index], ...req.body};
  const product_variants = []  
  if (variants){
  variants.forEach((items,index)=>{
      const {price,image} = items    
      items.name = req.body.name      
      if (items.id){        
        const indexitem = products.findIndex((p) => p.id === Number(items.id));
        const variant = {...items}   
        variant.price = undefined
        variant.id = undefined
        items.key = undefined
        db.products[indexitem] = { ...products[indexitem], ...items,variant:variant.key};
      }
      else {
      items.price = undefined
      items.image = undefined
      const item = {
        id: GetMaxID("products")+1+index,
        ...req.body,
        variant:items.key,
        price:price,
        image:image,
        type: "product_variation",
        parent:Number(id)
      }
      product_variants.push(item)
      }
  })
}
  db.products = [...db.products,...product_variants]
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");
  res.status(200).json(products[index]);
});
server.get("/products", (req, res) => {
  const {products} = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const simpleproduct = products.filter(item=>item.type=="simple")
  const result = simpleproduct.map(item=>{
      const children = products.filter(child=>child.parent==item.id&&child.type=="product_variation")
      if (children.length>0){
        const pricearr = children.map(child=>child.price)
        item.price = (Math.min(...pricearr)==Math.max(...pricearr))?Math.min(...pricearr):`${Math.min(...pricearr)}-${Math.max(...pricearr)}`
        item.type="product_variable"
      }
      return item
  })
  res.status(200).send(result)
})
server.get("/products/:id", (req, res) => {
    const { products } = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const { id } = req.params;
    const product = products.find((item) => item.id == id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
});
server.delete("/products/:id", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const {products} = db;
  const {id} = req.params
  const newproducts = products.filter(item=>item.id!=id).filter(item=>item.parent!=id)
  db.products = [...newproducts]
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");
  res.status(200).json({message:"Delete success!"});
})
const GetEndpoint = () => {
  const db = router.db; // Truy cập database json-server
  const endpoints = Object.keys(db.getState()).map((key) => ({
    url: `http://localhost:${port}/${key}`,
  }));

  console.log(`Danh sách các Endpoint:`,endpoints);
}
// Cart
server.post("/carts", Permission, (req, res) => {
    const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    const { id: userId } = req.user;
    const { productId, quantity } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng." });
    }

    const index = db.carts.findIndex((item) => item.userId === userId);
    if (index === -1) {
        const newCart = {
            id: GetMaxID("carts") + 1,
            userId: userId,
            items: [{ productId, quantity }],
        };
        db.carts.push(newCart);
        fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");
        return res.status(200).json({ message: "Thêm giỏ hàng thành công!", data: newCart });
    } else {
        // Logic cập nhật giỏ hàng...
    }
})
server.get("/carts",Permission,(req,res)=>{
  const {carts} = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const {id:userId} = req.user
  const cartByUser = carts.filter(item=>item.userId ==userId).shift()
  if (!userId) {
    res.status(404).json({message:"Chưa đăng nhập!"}); 
  }
  if (!cartByUser){
    res.status(404).json({message:"Chưa có sản phẩm nào trong giỏ hàng!"}); 
  }
  cartByUser.Items = cartByUser.Items.map(item=>{
    return {...item,productId:GetInfoVariantProduct(GetInfoById(item.productId,"products"))}
  })
  res.status(200).json({data:cartByUser}); 
})
server.put("/carts",Permission,(req,res)=>{
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const {id:userId} = req.user
  const {items} = req.body
  const index = db.carts.findIndex(item => item.userId ==userId); 
  db.carts[index]= {...db.carts[index],Items:items}
  res.status(200).json({data:db.carts[index],message:"Cập nhật thành công"}); 
})
server.post("/orders", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const newOrder = {
    id: db.orders.length + 1,
    ...req.body,
  };

  db.orders.push(newOrder);
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2), "utf-8");

  res.status(201).json({ message: "Đặt hàng thành công!", order: newOrder });
});
server.post("/login", (req, res) => {
  const db = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  const { email, password } = req.body;

  // Tìm người dùng theo email
  const user = db.users.find((user) => user.email === email);

  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  // Kiểm tra mật khẩu
  const bcrypt = require("bcrypt");
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Mật khẩu không đúng" });
  }

  // Tạo token (giả lập)
  const token = Buffer.from(JSON.stringify({ email: user.email, role: user.role })).toString("base64");

  res.status(200).json({ accessToken: token, role: user.role });
});
server.use(router);
server.listen(port, () => {
  console.log(`Endpoint: http://localhost:${port}`);
  console.log(`Tạo mới collection: http://localhost:${port}/create-collection =>Method: POST`);  
  GetEndpoint()
});