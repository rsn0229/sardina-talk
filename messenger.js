// 콕 찌르기 함수 (Form Submit 방식 - CORS 회피)
function sendReply() {
    const btn = document.querySelector('.msg-force-btn');
    if(!btn) return;
    
    btn.innerText = "찌르는 중...";
    btn.disabled = true;

    // 폼 제출 (CORS 오류 없음)
    document.getElementById('chatForm').submit();

    // 전송 후 피드백 및 목록 새로고침
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
        // GET 요청은 CORS 제약이 없으므로 그대로 사용합니다.
        const res = await fetch("https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get");
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

    toggleBtn.onclick = () => {
        // .is-open 클래스를 붙였다 뗐다 합니다.
        windowEl.classList.toggle('is-open');
        
        // 창이 열릴 때만 메시지 로드
        if(windowEl.classList.contains('is-open')) {
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
