async function loadMsgs() {

    const b = document.getElementById('msgBody');
    if (!b) return;

b.innerHTML = `
    <div class="msg-loading">
        대화 내역을 불러오는 중
        <span class="loading-dots"></span>
    </div>
`;

    try {

const res = await fetch(
    "https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get&t=" + Date.now(),
    {
        cache: "no-store"
    }
);

        if (!res.ok) throw new Error("로드 실패");

const data = await res.json();

const MAX_MSGS = 45;

const totalCount = data.messages.length;
const visibleMessages = data.messages.slice(-MAX_MSGS);

let html = '';

if (totalCount > MAX_MSGS) {
    html += `
        <div class="msg-history-limit">
            <div class="history-fade"></div>
            🌊오래 전의 물결은 수평선 너머로 흘러갔어요
            <br>
            최근 ${MAX_MSGS}개의 대화만 표시됩니다.
        </div>
    `;
}

html += visibleMessages.map(m =>
    `<div class="msg-bubble ${m.speaker}">${m.text}</div>`
).join('');

b.innerHTML = html;
b.scrollTop = b.scrollHeight;

    } catch(e) {

        console.error("데이터 로딩 실패", e);

        b.innerHTML = `
            <div class="msg-error">
                대화 내역을 불러오지 못했습니다.
            </div>
        `;
    }
}
// 버튼 초기화
function initMessenger() {
    const toggleBtn = document.getElementById('messengerToggle');
    const windowEl = document.getElementById('messengerWindow');
    
    if (!toggleBtn || !windowEl) {
        setTimeout(initMessenger, 500);
        return;
    }

    console.log("메신저 버튼 연결 완료!");
}

// 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMessenger);
} else {
    initMessenger();
}
