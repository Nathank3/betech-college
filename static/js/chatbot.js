const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotWindow = document.getElementById('chatbot-window');
const chatMessages = document.getElementById('chat-messages');

chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('hidden');
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
});

function botReply(question, answer) {
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'bg-neon-text/20 p-3 rounded-lg self-end ml-auto max-w-[80%] text-right border border-neon-text/20';
    userMsg.innerText = question;
    chatMessages.appendChild(userMsg);
    
    // Add bot message after a short delay
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bg-white/10 p-3 rounded-lg max-w-[80%] border border-white/10';
        botMsg.innerText = answer;
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
