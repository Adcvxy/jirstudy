// 🔁 Toggle Mode Terang/Gelap
function toggleMode() {
  document.body.classList.toggle('dark-mode');
}

// 🔍 Fitur Pencarian Menu
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const items = document.querySelectorAll(".menu-item");

      items.forEach(item => {
        const title = item.querySelector("h3").textContent.toLowerCase();
        const desc = item.querySelector("p").textContent.toLowerCase();
        const match = title.includes(query) || desc.includes(query);
        item.classList.toggle("hidden", !match);
      });
    });
  }
});

// 💬 Tombol Chatbot
const chatbotBtn = document.getElementById("chatbot-btn");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");

if (chatbotBtn && chatContainer) {
  chatbotBtn.addEventListener("click", () => {
    chatContainer.style.display = chatContainer.style.display === "flex" ? "none" : "flex";
  });
}

// 🤖 Fungsi Kirim Chat ke OpenAI
async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;
  appendMessage("user", message);
  input.value = "";

  appendMessage("ai", "Mengetik...");
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE" // 🔐 GANTI dengan API key kamu
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    if (!res.ok) throw new Error("Gagal fetch response");

    const data = await res.json();
    chatMessages.lastChild.remove();
    const reply = data.choices?.[0]?.message?.content || "Maaf, tidak bisa menjawab.";
    appendMessage("ai", reply);
  } catch (err) {
    chatMessages.lastChild.remove();
    appendMessage("ai", "⚠️ Gagal menghubungi AI. Cek API key & koneksi.");
  }
}

// 📥 Tampilkan Chat
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
