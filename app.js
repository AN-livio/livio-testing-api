let express = require("express");
let cors = require("cors");
let userRouter = require("./routes/user");
let adminRouter = require("./routes/admin");

require("./utils/db");
let app = express();
app.use(cors());
app.use(express.json());

app.use("/screening", userRouter);
app.use("/admin", adminRouter);

let port = process.env.PORT || 5000;
app.listen(port);
