type TMessageItem = {
  type: "system" | "user";
  content: string;
  timestamp: Date;
};

class RoomMessageQueue {
  messages: TMessageItem[];

  constructor() {
    this.messages = [];
  }
}
