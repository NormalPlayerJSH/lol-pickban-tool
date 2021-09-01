import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { banpick } from "../../../model/data";

let _socket: null | Socket = null;

export function getSocket() {
  if (!_socket) {
    _socket = io();
  }
  return _socket;
}
