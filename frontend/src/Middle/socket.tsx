import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { banpick, banpickNum, phase, team } from "../model/data";
import {
  eventType,
  joinData,
  readyData,
  completeData,
  selectData,
  swapData,
} from "../model/socketEvent";

let _socket: null | Socket = null;

function socketEmit(socket: Socket) {
  const join = (code: string) => {
    const data: joinData = {
      code,
    };
    socket.emit(eventType.join, data);
  };
  const ready = (team: team, isReady: boolean) => {
    const data: readyData = {
      team,
      isReady,
    };
    socket.emit(eventType.ready, data);
  };
  const complete = (team: team, phase: phase, number: banpickNum) => {
    const data: completeData = {
      status: {
        team,
        phase,
        number,
      },
    };
    socket.emit(eventType.complete, data);
  };
  const select = (
    team: team,
    phase: phase.BAN | phase.PICK,
    number: number,
    championId: number
  ) => {
    const data: selectData = {
      status: {
        team,
        phase,
        number,
      },
      championId,
    };
    socket.emit(eventType.select, data);
  };
  const swap = (team: team, swapNumber: [banpickNum, banpickNum]) => {
    const data: swapData = {
      team,
      swapNumber,
    };
    socket.emit(eventType.swap, data);
  };
  return {
    join,
    ready,
    complete,
    select,
    swap,
  };
}

export function getSocket() {
  if (!_socket) {
    _socket = io();
  }
  return {
    socket: _socket,
    emitter: socketEmit(_socket),
  };
}
