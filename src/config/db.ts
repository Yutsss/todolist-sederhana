import { PrismaClient } from '@prisma/client';
import { appLogger, prismaLogger } from './logConfig';

declare global {
  var _db: PrismaClient | undefined;
}

if (!global._db) {
  global._db = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
      {
        emit: "event",
        level: "error",
      },
    ],
  });
}

const dbWithEvents = global._db as PrismaClient & {
  $on: (event: string, listener: (event: any) => void) => void;
};

dbWithEvents.$on("query", (e) => {
  prismaLogger.info(e);
});

dbWithEvents.$on("info", (e) => {
  prismaLogger.info(e);
});

dbWithEvents.$on("warn", (e) => {
  prismaLogger.warn(e);
});

dbWithEvents.$on("error", (e) => {
  prismaLogger.error(e);
});

const db: PrismaClient = global._db;

export default db;