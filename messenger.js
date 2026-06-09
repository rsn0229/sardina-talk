// 콕 찌르기 함수 (CORS 무시 + 끝까지 기다리기 적용!)
async function sendReply() {
    const btn = document.querySelector('.msg-force-btn');
    if(!btn || btn.disabled) return;
    
    btn.innerText = "답장 중... (잠시만요!)";
    btn.disabled = true;

    try {
        // 1. CORS 에러 무시하고 서버에 강제 전송! (마법의 no-cors)
        const formData = new URLSearchParams();
        formData.append('action', 'force_reply');
        
        await fetch("https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec", {
            method: 'POST',
            mode: 'no-cors', // 이 옵션이 지긋지긋한 빨간색 CORS 에러를 안 뜨게 해줍니다!
            body: formData
        });
    } catch (e) {
        console.log("전송 완료"); // no-cors는 성공해도 에러처럼 보일 수 있어 조용히 넘깁니다.
    }

    // 2. AI가 답장을 쓸 시간을 주며 2초마다 확인! (최대 12초간 대기)
    let checkCount = 0;
    const checkInterval = setInterval(() => {
        checkCount++;
        
        loadMsgs(); // 2초마다 새 메시지가 있나 확인
        console.log(checkCount + "번째 답장 확인 중...");

        // 6번(약 12초) 확인했는데도 안 오면 버튼 원래대로 복구
        if (checkCount >= 6) {
            clearInterval(checkInterval);
            btn.innerText = "답장";
            btn.disabled = false;
        }
    }, 2000); // 2000ms = 2초
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
