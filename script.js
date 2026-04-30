document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Música de Fundo (Arquivo MP3 Local)
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;
    let hasStartedMusic = false;

    function playMusic() {
        if (bgMusic) {
            // Pula para o segundo 40 na primeira vez
            if (!hasStartedMusic) {
                bgMusic.currentTime = 40;
                hasStartedMusic = true;
            }
            bgMusic.play().catch(e => console.log("Áudio bloqueado."));
        }
        isPlaying = true;
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicBtn.classList.add('playing');
    }

    function pauseMusic() {
        if (bgMusic) {
            bgMusic.pause();
        }
        isPlaying = false;
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicBtn.classList.remove('playing');
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // 2. Scroll Suave e Auto-Play ao iniciar
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        document.getElementById('counter-section').scrollIntoView({ behavior: 'smooth' });
        
        // Toca a música automaticamente ao clicar em começar
        if (!isPlaying) {
            playMusic();
        }
    });

    // 3. Sistema de Partículas (Corações)
    function createParticles() {
        const container = document.getElementById('particles-container');
        const heartIcons = ['❤️', '💖', '💕', '✨', '🌸'];

        setInterval(() => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Randomizar posição, ícone, tamanho e duração
            particle.style.left = Math.random() * 100 + 'vw';
            particle.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            
            const size = Math.random() * 15 + 10; // 10px a 25px
            particle.style.fontSize = `${size}px`;
            
            const duration = Math.random() * 5 + 5; // 5s a 10s
            particle.style.animationDuration = `${duration}s`;

            container.appendChild(particle);

            // Remover após a animação
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, 800); // Cria uma partícula a cada 800ms
    }
    createParticles();

    // 4. Contador de Tempo
    // COLE A DATA DE INÍCIO DO RELACIONAMENTO AQUI (Formato: Ano, Mês(0-11), Dia, Hora, Min)
    // Abril é o mês 3 (Janeiro é 0)
    const startDate = new Date(2026, 3, 15, 4, 0, 0).getTime();

    function updateCounter() {
        const now = new Date().getTime();
        const difference = now - startDate;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
    setInterval(updateCounter, 1000);
    updateCounter();

    // 5. Typing Effect (Frases Românticas)
    const phrases = [
        "Eu amo o seu sorriso...",
        "Você é a melhor parte dos meus dias...",
        "Minha vida ficou muito melhor depois que você chegou...",
        "Cada detalhe seu é perfeito para mim.",
        "Eu te escolheria em todas as vidas."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typed-text');
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Apaga mais rápido
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Digita em velocidade normal
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pausa no final da frase
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pausa antes da nova frase
        }

        setTimeout(type, typingSpeed);
    }
    // Inicia o efeito
    setTimeout(type, 1500);

    // 6. Revelar Elementos no Scroll (Fade In)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-section').forEach(section => {
        observer.observe(section);
    });

    // 7. Carta de Amor (Virar ao clicar)
    const envelope = document.querySelector('.envelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.toggle('open');
        });
    }

    // 8. Botão Fujão (Interatividade)
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const hiddenMessage = document.getElementById('hidden-message');

    if (btnNo) {
        btnNo.addEventListener('mouseover', function() {
            // Move o botão "Não" para posições aleatórias
            const maxX = window.innerWidth / 3;
            const maxY = window.innerHeight / 3;
            
            const randomX = Math.floor(Math.random() * maxX) * (Math.random() > 0.5 ? 1 : -1);
            const randomY = Math.floor(Math.random() * maxY) * (Math.random() > 0.5 ? 1 : -1);
            
            this.style.transform = `translate(${randomX}px, ${randomY}px)`;
            this.style.transition = "transform 0.2s ease";
        });
    }

    if (btnYes) {
        btnYes.addEventListener('click', () => {
            hiddenMessage.classList.remove('hidden');
            // Animação de sucesso (confetes/corações) poderia ser adicionada aqui
            // Disparar muitos corações de uma vez
            for(let i=0; i<30; i++) {
                setTimeout(createExtraHeart, i * 50);
            }
        });
    }

    function createExtraHeart() {
        const heart = document.createElement('div');
        heart.innerText = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'top 2s ease-in, transform 2s ease';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.top = '120vh';
            heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 50);
        
        setTimeout(() => heart.remove(), 2100);
    }
});
