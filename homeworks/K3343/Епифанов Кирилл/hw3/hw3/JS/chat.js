function getCurrentUserEmail() {
    try { return JSON.parse(localStorage.getItem('currentUser')) || null; } catch(e) { return null; }
}

function openChat(id, name) {
    currentProperty = {id, name};
    document.getElementById("chatOverlay").style.display = "flex";
    document.getElementById("chatPropertyTitle").innerText =
        "Chat - " + currentProperty.name;

    renderPropertyMessages();
}

function closeChat() {
    document.getElementById("chatOverlay").style.display = "none";
}

function renderPropertyMessages() {
    const container = document.getElementById("chatMessages");
    const historyArr = JSON.parse(localStorage.getItem('history')) || [];

    const propertyMessages = historyArr.filter(h =>
        h.type === 'message' &&
        h.propertyId === currentProperty.id &&
        h.user === getCurrentUserEmail()
    );

    if (propertyMessages.length === 0) {
        container.innerHTML = "<p>No messages yet.</p>";
        return;
    }

    container.innerHTML = propertyMessages.map(h => {
        const isUser = h.user ? "user" : "system";
        return `
            <div class="chat-message ${isUser}">
                <div>${escapeHtml(h.message)}</div>
                <small>${new Date(h.timestamp).toLocaleString()}</small>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    // Save user message
    addMessageToHistory(currentProperty, text);

    // Simulated system reply
    setTimeout(() => {
        const systemEntry = {
            id: currentProperty.id,
            name: currentProperty.name
        };
        addMessageToHistory(systemEntry, "Service not available");
        renderPropertyMessages();
    }, 500);

    input.value = "";
    renderPropertyMessages();
}
