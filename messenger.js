// 메시지 로드 함수
async function loadMsgs() {
    const b = document.getElementById('msgBody');
    if (!b) return;
    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get");
        if (!res.ok) throw new Error("로드 실패");
        const data = await res.json();
        b.innerHTML = data.messages.map(m => `<div class="msg-bubble ${m.speaker}">${m.text}</div>`).join('');
        b.scrollTop = b.scrollHeight;
    } catch(e) { console.error("데이터 로딩 실패", e); }
}

// 버튼 초기화
function initMessenger() {
    const toggleBtn = document.getElementById('messengerToggle');
    const windowEl = document.getElementById('messengerWindow');
    
    if (!toggleBtn || !windowEl) {
        setTimeout(initMessenger, 500);
        return;
    }

// 메신저 스크립트의 toggleBtn.onclick 부분
toggleBtn.onclick = (e) => {
    e.stopPropagation(); 
    
    const isOpening = !windowEl.classList.contains('is-open');
    
    // 이제 window.closeAll을 통해 확실하게 다른 패널들을 닫습니다!
    if (typeof window.closeAll === 'function') {
        window.closeAll();
    }
    
    if (isOpening) {
        windowEl.classList.add('is-open');
        loadMsgs();
    }
};
    console.log("메신저 버튼 연결 완료!");
}

// 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessenger);
} else {
    initMessenger();
}
