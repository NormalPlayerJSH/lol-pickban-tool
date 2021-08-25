import express from "express";
import http from "http";
import { Server } from "socket.io";
import { banpickData } from "./middle/dataClass";
import { json as bpJSON } from "body-parser";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 5000;
const bpData = new banpickData();

app.use(bpJSON());

app.get("/api", (req, res) => {
  res.json({ data: "Hello, World!" });
});

app.post("/creategame", (req, res) => {
  const data = req.body;
  const answer = bpData.makeNewGame(data);
  console.log({ data, answer });
  res.json(answer);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log(socket);
  socket.on("asdf", (data) => {
    console.log(data);
    socket.emit("dd", data);
  });
});
