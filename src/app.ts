import Config from './config';
import MongoDB from "./setupDatabase";
import { SetupServer } from "./setupServer";

const server = new SetupServer();
const db = new MongoDB();
Config.validateConfig();
server.start();
db.startDB();

