import { web as app } from "./app/web";
import { appLogger } from "./config/logConfig";

app.listen(process.env.PORT, () => {
  appLogger.info(`Server is running on port ${process.env.PORT}`);
});
