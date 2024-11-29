import app from "./app";
import { mongodbUrl, port } from "./app/config";
import connectDD from "./app/db/db.config";

const main = async () => {
  try {
    await connectDD(mongodbUrl);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
