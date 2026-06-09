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
            "https://script.google.com/macros/s/AKfycbxEV2WOOpx51GEYgNNtIwB8h3ItIKY4aZaILwRZIl2fxyQDQo2Nf6ZxKsR97YueZOw/exec?action=get"
        );

        if (!res.ok) throw new Error("로드 실패");

        const data = await res.json();

        b.innerHTML = data.messages.map(m =>
            `<div class="msg-bubble ${m.speaker}">${m.text}</div>`
        ).join('');

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
