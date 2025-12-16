// =======================================================
// I. KHU VỰC CÁ NHÂN HÓA 
// =======================================================
const CRUSH_NAME = "Quỳnh Anh";
const MEMORY_TEXT = "Đêm Giáng sinh an lành này, tớ có điều quan trọng hơn cả quà cáp muốn nói với cậu..."; 
const BUILD_UP_TEXT = "Tớ chúc cậu giáng sinh an lành, luôn vui vẻ vì tớ thích nụ cười của cậu, khi cậu cười nhìn rất xinh!!Và đây là"; 

const CONFESSION_MESSAGE = 
    " Giáng sinh này, giữa muôn vàn ánh đèn lấp lánh, điều tớ mong muốn nhất là luôn được nhìn thấy cậu. Cậu có đồng ý trở thành 'món quà Giáng sinh đẹp nhất' của tớ không?";

const TYPING_SPEED = 50; 
let typingInterval; 

// =======================================================
// II. Logic Chuyển Phase & Audio
// =======================================================

const music = document.getElementById('christmas-music');

function playMusic() {
    if (music) {
        music.play().catch(e => {
            console.log("Autoplay blocked. User interaction required.");
        });
    }
}

function changePhase(currentId, nextId) {
    const currentPhase = document.getElementById(currentId);
    const nextPhase = document.getElementById(nextId);

    currentPhase.style.opacity = 0;
    
    setTimeout(() => {
        currentPhase.classList.remove('active');
        currentPhase.style.display = 'none';
        
        nextPhase.style.display = 'block'; 
        nextPhase.classList.add('active'); 
        
        setTimeout(() => {
            nextPhase.style.opacity = 1;
            
            if (nextId === 'phase-3') {
                startTypingEffect('confession-text', CONFESSION_MESSAGE, TYPING_SPEED);
            }
        }, 10); 
        
    }, 500); 
}

// =======================================================
// III. Logic Hiệu ứng Gõ chữ
// =======================================================

function startTypingEffect(elementId, text, speed) {
    if (typingInterval) {
        clearInterval(typingInterval);
    }
    const element = document.getElementById(elementId);
    let i = 0;
    element.innerHTML = ''; 
    typingInterval = setInterval(() => { 
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            document.querySelector('.response-buttons').classList.remove('hidden');
        }
    }, speed);
}

// =======================================================
// IV. Logic Xử lý Phản hồi Cuối cùng 
// =======================================================

function handleResponse(isAccepted) {
    const confessionPhase = document.getElementById('phase-3');
    const confessionText = document.getElementById('confession-text');
    const responseButtons = document.querySelector('.response-buttons');

    responseButtons.classList.add('hidden');

    if (typingInterval) {
        clearInterval(typingInterval);
    }
    
    confessionText.innerHTML = CONFESSION_MESSAGE; 

    if (isAccepted) {
        // Kịch bản CHẤP NHẬN
        confessionPhase.style.background = 'linear-gradient(145deg, #ffd700, #ff8c00)'; 
        confessionPhase.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.9)';
        confessionText.innerHTML = "💖 <strong>Vâng! Giáng sinh này là món quà tuyệt vời nhất!</strong> Cảm ơn cậu thật nhiều! Yêu cậu! 🥂";
        confessionText.style.color = '#B73E3E'; 
    } else {
        // Kịch bản TỪ CHỐI
        confessionPhase.style.background = 'linear-gradient(145deg, #1f364d, #3a546d)'; 
        confessionPhase.style.boxShadow = 'none';
        confessionText.innerHTML = "😊 Cảm ơn cậu, tớ sẽ luôn trân trọng tình bạn này. Chúc cậu một mùa giáng sinh an lành nhé!";
        confessionText.style.color = 'white';
    }
}


// =======================================================
// V. Logic Tuyết rơi & Khởi tạo 
// =======================================================

function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.style.left = Math.random() * 100 + 'vw';
    snow.style.width = snow.style.height = Math.random() * 3 + 1 + 'px';
    snow.style.opacity = Math.random();
    const animationDuration = Math.random() * 8 + 7;
    snow.style.animation = `snowfall ${animationDuration}s linear infinite`;

    document.getElementById('snow-container').appendChild(snow);
    
    setTimeout(() => {
        snow.remove();
    }, animationDuration * 1000);
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. Gán Nội dung Cá nhân hóa động vào HTML (SỬA LỖI LẦN CUỐI: CHỈ CÒN "Gửi [Tên Crush]")
    document.querySelector('.to-text').innerHTML = `Gửi <strong>${CRUSH_NAME}</strong>`;
    document.querySelector('.memory-box').innerHTML = MEMORY_TEXT;
    document.querySelector('.final-build-up').innerHTML = BUILD_UP_TEXT;

    // 2. Gắn sự kiện cho các nút chuyển Phase 
    document.getElementById('btn-p1').addEventListener('click', () => {
        playMusic(); 
        changePhase('phase-1', 'phase-2');
    });

    document.getElementById('btn-p2').addEventListener('click', () => {
        changePhase('phase-2', 'phase-3');
    });

    // 3. GẮN SỰ KIỆN CHO NÚT PHẢN HỒI 
    document.querySelector('.response-buttons .accept').addEventListener('click', () => {
        handleResponse(true);
    });

    document.querySelector('.response-buttons .reject').addEventListener('click', () => {
        handleResponse(false);
    });
    
    // 4. Kích hoạt hiệu ứng tuyết rơi
    setInterval(createSnowflake, 300);
});