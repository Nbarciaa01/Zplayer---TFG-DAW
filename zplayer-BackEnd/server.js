import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import app from "./app.js";

async function main() {
  try {

    await connectDB();

    app.listen(PORT);
    console.log(`Listening on port http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

main();
