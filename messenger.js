// 콕 찌르기 함수 (더 똑똑하고 안전하게!)
function sendReply() {
    const btn = document.querySelector('.msg-force-btn');
    if (!btn || btn.disabled) return; // 이미 누르는 중이면 무시
    
    btn.innerText = "찌르는 중...";
    btn.disabled = true; // 버튼 비활성화 (연타 방지)

    // 폼 제출
    document.getElementById('chatForm').submit();

    // 3초 뒤에 복구 및 메시지 로드
    setTimeout(() => {
        loadMsgs();
        btn.innerText = "콕 찌르기👆";
        btn.disabled = false; // 버튼 다시 활성화
    }, 3000); // 서버 처리 시간을 고려해 3초로 넉넉하게 설정
}

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

// 버튼 초기화 (이미 작성하신 코드와 같습니다)
function initMessenger() {
    const toggleBtn = document.getElementById('messengerToggle');
    const windowEl = document.getElementById('messengerWindow');
    
    if (!toggleBtn || !windowEl) {
        setTimeout(initMessenger, 500);
        return;
    }

    toggleBtn.onclick = () => {
        // 이제 is-open 클래스가 붙으면서 CSS 애니메이션이 동작합니다!
        windowEl.classList.toggle('is-open');
        
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
