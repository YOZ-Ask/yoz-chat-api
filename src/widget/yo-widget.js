(() => {
  const API = "http://localhost:8787/chat";   // Sau này đổi thành URL Worker

  // Bubble
  const bubble = document.createElement("div");
  bubble.innerHTML = "💬";
  bubble.id = "yo-bubble";

  // Window
  const box = document.createElement("div");
  box.id = "yo-box";

  box.innerHTML = `
      <div id="yo-header">
          <span>💬 Ask YO</span>
          <button id="yo-close">✕</button>
      </div>

      <div id="yo-messages">
          <div class="yo-ai">
              👋 Xin chào! Mình là <b>Ask YO</b>.
          </div>
      </div>

      <div id="yo-input">
          <input id="yo-text" placeholder="Hỏi YO điều gì..." />
          <button id="yo-send">➤</button>
      </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(box);

  // CSS
  const style = document.createElement("style");
  style.textContent = `
#yo-bubble{
position:fixed;
bottom:25px;
right:25px;
width:60px;
height:60px;
border-radius:50%;
background:#f44c83;
color:white;
display:flex;
justify-content:center;
align-items:center;
font-size:28px;
cursor:pointer;
box-shadow:0 5px 20px rgba(0,0,0,.25);
z-index:999999;
}

#yo-box{
position:fixed;
bottom:100px;
right:25px;
width:360px;
height:520px;
background:#fff;
border-radius:18px;
display:none;
flex-direction:column;
box-shadow:0 10px 40px rgba(0,0,0,.25);
overflow:hidden;
z-index:999999;
font-family:Arial,sans-serif;
}

#yo-header{
background:#f44c83;
color:white;
padding:15px;
display:flex;
justify-content:space-between;
font-weight:bold;
}

#yo-close{
background:none;
border:none;
color:white;
font-size:18px;
cursor:pointer;
}

#yo-messages{
flex:1;
padding:15px;
overflow:auto;
background:#fafafa;
}

.yo-user{
text-align:right;
margin:10px 0;
}

.yo-ai{
margin:10px 0;
}

#yo-input{
display:flex;
border-top:1px solid #eee;
}

#yo-text{
flex:1;
padding:15px;
border:none;
outline:none;
font-size:15px;
}

#yo-send{
width:70px;
border:none;
background:#f44c83;
color:white;
cursor:pointer;
font-size:18px;
}
`;

  document.head.appendChild(style);

  bubble.onclick = () => box.style.display = "flex";
  document.getElementById("yo-close").onclick = () => box.style.display = "none";

  async function send(){

      const input=document.getElementById("yo-text");
      const text=input.value.trim();

      if(!text) return;

      const messages=document.getElementById("yo-messages");

      messages.innerHTML+=`<div class="yo-user">🧑 ${text}</div>`;

      input.value="";

      const res=await fetch(API,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              message:text
          })
      });

      const data=await res.json();

      messages.innerHTML+=`<div class="yo-ai">🤖 ${data.reply}</div>`;

      messages.scrollTop=messages.scrollHeight;
  }

  document.getElementById("yo-send").onclick=send;

  document.getElementById("yo-text").addEventListener("keypress",e=>{
      if(e.key==="Enter") send();
  });

})();
