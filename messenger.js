// 콕 찌르기 함수 (Form Submit 방식)
function sendReply() {
    const btn = document.querySelector('.msg-force-btn');
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
    try {
        // GET 요청은 CORS 제약이 없습니다!
        const res = await fetch("https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get");
        const data = await res.json();
        const b = document.getElementById('msgBody');
        if(b) {
            b.innerHTML = data.messages.map(m => `<div class="msg-bubble ${m.speaker}">${m.text}</div>`).join('');
            b.scrollTop = b.scrollHeight;
        }
    } catch(e) { console.error("데이터 로딩 실패", e); }
}

// 토글 기능
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('messengerToggle').onclick = () => {
        const w = document.getElementById('messengerWindow');
        const isHidden = (w.style.display === 'none' || w.style.display === '');
        w.style.display = isHidden ? 'flex' : 'none';
        if(isHidden) loadMsgs();
    };
});
