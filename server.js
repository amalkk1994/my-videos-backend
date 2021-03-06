const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

//console.log("envs", process.env);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`app running on port ${port}....`);
});
