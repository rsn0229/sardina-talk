// 콕 찌르기 함수
function sendReply() {
    const btn = document.querySelector('.msg-force-btn');
    if(!btn) return;
    
    btn.innerText = "찌르는 중...";
    btn.disabled = true;

    document.getElementById('chatForm').submit();

    setTimeout(() => {
        loadMsgs();
        btn.innerText = "콕 찌르기👆";
        btn.disabled = false;
    }, 1500);
}

// 메시지 로드 함수
async function loadMsgs() {
    const b = document.getElementById('msgBody');
    if(!b) return;
    try {
        const res = await fetch("https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get");
        const data = await res.json();
        b.innerHTML = data.messages.map(m => `<div class="msg-bubble ${m.speaker}">${m.text}</div>`).join('');
        b.scrollTop = b.scrollHeight;
    } catch(e) { console.error("데이터 로딩 실패", e); }
}

// 버튼 초기화 - 함수로 분리하여 여러 번 실행 가능하게
function initMessenger() {
    const toggleBtn = document.getElementById('messengerToggle');
    const windowEl = document.getElementById('messengerWindow');
    
    if (!toggleBtn || !windowEl) {
        console.log("메신저 요소를 찾을 수 없음, 재시도...");
        setTimeout(initMessenger, 500);
        return;
    }

    toggleBtn.onclick = () => {
        const isHidden = (windowEl.style.display === 'none' || windowEl.style.display === '');
        windowEl.style.display = isHidden ? 'flex' : 'none';
        if(isHidden) loadMsgs();
    };
    console.log("메신저 버튼 연결 완료!");
}

// 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessenger);
} else {
    initMessenger();
}
