console.log("connected");

const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".msg_area");
do {
  name = prompt(`Enter your name:-`);
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

const sendMessage = (message) => {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scroolToBottom();
  //send to server
  socket.emit("message", msg);
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markup = `<h4>${msg.user}</h4>
  <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  //append in msg area
  messageArea.appendChild(mainDiv);
};

//Recive msg
socket.on("message", (msg) => {
  // console.log(msg);//we see this on browser console
    appendMessage(msg, "incoming");
    scroolToBottom();
});

//automatic scrool
const scroolToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
