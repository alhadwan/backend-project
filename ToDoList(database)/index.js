import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123",
  port: 5432,
});

db.connect();

let items = [
  // { id: 1, title: "Buy milk" },
  // { id: 2, title: "Finish homework" },
];
app.get("/", async(req, res) => {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC;");
  items = result.rows;
  console.table(result.rows);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const addItem = req.body.newItem;
  console.log("Added item:", addItem);
  const result = await db.query("INSERT INTO items (title) VALUES ($1);", [addItem]);
  items = result.rows;
  console.log("All items:", items);
  res.redirect("/");
});

app.post("/edit", async(req, res) => {
  const updateItemId = req.body.updatedItemId;
  const updateItemTitle = req.body.updatedItemTitle;
  console.log("update Item Title: ", updateItemTitle);
  await db.query("UPDATE items SET title = $1 WHERE id = $2;", [updateItemTitle,updateItemId]);
  res.redirect("/");

});

app.post("/delete", async(req, res) => {
  const deleteitem = req.body.deleteItemId;
  console.log("item id deleted: ", deleteitem);
  await db.query("DELETE FROM items WHERE id = $1;", [deleteitem]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
