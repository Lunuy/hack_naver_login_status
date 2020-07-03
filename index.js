
async function getResponseTime(url) {
    const beforeNow = performance.now();
    return new Promise(solve => {
        const iframe = document.createElement("iframe");
        iframe.addEventListener("load", e => {
            const now = performance.now();
            document.body.removeChild(iframe);
            solve(now - beforeNow);
        });
        iframe.src = url;
        iframe.style.display = "none";
    
        document.body.appendChild(iframe);
    });
}

async function isExists(url, loadingTime = 160) {
    const responseTime = await getResponseTime(url);
    return responseTime > loadingTime;
}

(async () => {
    const naverResponseTime = await getResponseTime("https://nid.naver.com/user2/help/myInfo.nhn");
    const naverLogined = await isExists("https://nid.naver.com/user2/help/myInfo.nhn");

    document.body.appendChild(document.createTextNode(`네이버 (첫) 반응시간 : ${naverResponseTime} `));

    function appendH1(text) {
        const h1 = document.createElement("h1");
        h1.appendChild(document.createTextNode(text));
        document.body.appendChild(h1);
    }
    appendH1(naverLogined ? "네이버에 로그인되어 있구나. :)" : "네이버에 로그인되어있지 않구나.. :(");
})();

// 구글은 계정이 여러개일 수 있어서 판단이 어려움
// const googleResponseTime = await getResponseTime("https://myaccount.google.com/contacts");
// const googleLogined = await isExists("https://myaccount.google.com/contacts", 200);
// document.body.appendChild(document.createTextNode(`구글 반응시간 : ${googleResponseTime}`));
// appendH1(googleLogined ? "구글에 로그인되어 있구나. :)" : "구글에 로그인되어있지 않구나.. :(");