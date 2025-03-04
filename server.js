require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
//const contactRoute = require("./route/contactRoute");

const app = express();

app.use(express.json());
app.use(cors());

//app.use("/", contactRoute);
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://portfolio-three-xi-35.vercel.app",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Cung cấp các phương thức HTTP
      allowedHeaders: ["Content-Type", "Authorization"], // Cung cấp các header cần thiết cho request
    })
  );
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "./", "client", "dist", "index.html")
    );
  });
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server listing to port 5000 only`));
