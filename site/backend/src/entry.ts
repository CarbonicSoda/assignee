import { prisma } from "prisma/client.prisma.js";
import express from "express";
import { configs } from "configs/configs.js";

prisma.$connect();

const app = express();
app.set("port", configs.port);
app.use(express.static(`./${configs.static}`));
app.listen(app.get("port"), () => {
	console.log(`Express started on http://localhost:${app.get("port")}; Ctrl+C to terminate.`);
});
