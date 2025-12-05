import colors from "colors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app";
import { socketHelper } from "./app/socket/socket";
import config from "./config";

//uncaught exception
process.on("uncaughtException", (error) => {
  console.error("UnhandleException Detected", error);
  process.exit(1);
});

let server: any;
async function main() {
  try {
    mongoose.connect(config.mongoose.url as string);
    console.log(colors.green("🚀 Database connected successfully"));
    const port =
      typeof config.port === "number" ? config.port : Number(config.port);
    server = app.listen(port, "localhost", () => {
      console.log(
        colors.yellow(
          `♻️  Application listening on port http://localhost:${port}`
        )
      );
    });
    //socket
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });
    socketHelper.socket(io);
    // @ts-ignore
    global.io = io;
  } catch (error) {
    console.error(colors.red("🤢 Failed to connect Database"));
  }

  //handle unhandledRejection
  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.error("UnhandledRejection Detected", error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();
