document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const targetDate = new Date(now.getTime() + (16 * 60 * 60 * 1000) + (23 * 60 * 1000) + (48 * 1000));

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const current = new Date();
        let diff = targetDate - current;

        if (diff < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        const seconds = Math.floor(diff / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    const form = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const messageEl = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        if (!email || !email.includes('@') || !email.includes('.')) {
            messageEl.textContent = '⚠️ Please enter a valid email address.';
            messageEl.style.color = '#ffa7a7';
            return;
        }
        messageEl.textContent = `✅ Thank you! You'll be notified at ${email}`;
        messageEl.style.color = '#a8f0b0';
        emailInput.value = '';
        setTimeout(() => {
            messageEl.textContent = '';
        }, 6000);
    });

    emailInput.addEventListener('focus', () => {
        if (messageEl.textContent.includes('Thank you') || messageEl.textContent.includes('valid')) {
            messageEl.textContent = '';
        }
    });
});