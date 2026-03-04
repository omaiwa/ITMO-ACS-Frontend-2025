(function(){
    function getCurrentUserEmail() {
        try { return JSON.parse(localStorage.getItem('currentUser')) || null; } catch(e) { return null; }
    }

    function addHistoryEntry(entry) {
        const history = JSON.parse(localStorage.getItem('history')) || [];
        history.push(entry);
        localStorage.setItem('history', JSON.stringify(history));
    }

    function addRentalToHistory(property) {
        const entry = {
            type: 'rent',
            propertyId: property.id,
            propertyName: property.name,
            timestamp: new Date().toISOString(),
            user: getCurrentUserEmail()
        };
        addHistoryEntry(entry);
    }

    function addMessageToHistory(property, messageText) {
        const entry = {
            type: 'message',
            propertyId: property.id,
            propertyName: property.name,
            timestamp: new Date().toISOString(),
            user: getCurrentUserEmail(),
            message: messageText
        };
        addHistoryEntry(entry);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(m){
            return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]);
        });
    }

    function renderHistory(containerId) {
        const id = containerId || 'historyContainer';
        const container = document.getElementById(id);
        if (!container) return;

        const currentUser = getCurrentUserEmail();
        const historyArr = JSON.parse(localStorage.getItem('history')) || [];

        const userHistory = historyArr.filter(h => h.user === currentUser);

        if (userHistory.length === 0) {
            container.innerHTML = '<p>No history yet.</p>';
            return;
        }

        container.innerHTML = userHistory.map(h => {
            const time = new Date(h.timestamp).toLocaleString();

            if (h.type === 'rent' && h.user === getCurrentUserEmail()) {
                return `<div class="history-item"><strong>Rented:</strong> ${escapeHtml(h.propertyName)} <small>(${escapeHtml(h.propertyId)})</small> — <em>${escapeHtml(h.user || '')}</em> — <small>${time}</small></div>`;
            }

            if (h.type === 'message' && h.user === getCurrentUserEmail()) {
                //return `<div class="history-item"><strong>Message:</strong> ${escapeHtml(h.propertyName)} — "${escapeHtml(h.message)}" — <em>${escapeHtml(h.user || '')}</em> — <small>${time}</small></div>`; 
                return '';
            }
            return '';
            //return `<div class="history-item">${escapeHtml(JSON.stringify(h))}</div>`;
        }).join('');
    }

    window.addRentalToHistory = addRentalToHistory;
    window.addMessageToHistory = addMessageToHistory;
    window.renderHistory = renderHistory;
    window.showHistory = function() { renderHistory('historyContainer'); };
    window.addRentalToHistory = addRentalToHistory;
    window.escapeHtml = escapeHtml;
})();
