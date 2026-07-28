// 1. เพิ่มฟังก์ชัน base_path() ไว้ที่ด้านบนสุด
function base_path() {
    const repoName = "PPK-GUIDING-WEB";
    const pathSegments = window.location.pathname.split("/");
    
    const repoIndex = pathSegments.indexOf(repoName);
    
    if (repoIndex !== -1) {
        return pathSegments.slice(0, repoIndex + 1).join("/");
    }
    
    return "";
}

// 2. ฟังก์ชัน navigateTo และส่วนอื่นๆ ที่เหลือ
function navigateTo(relativePath) {
    const cleanBase = base_path().replace(/\/$/, ""); 
    const cleanPath = relativePath.startsWith("/") ? relativePath : "/" + relativePath;
    window.location.href = cleanBase + cleanPath;
}

// -------------------------------------------------------------

function Help() {
    navigateTo("/PPK_web/Help/index.html");
}

function check_location() {
    navigateTo("/PPK_web/Progess/index.html");
}

function goindex() {
    navigateTo("/index.html");
}

function debug() {
    navigateTo("/PPK_web/Debug/index.html");
}

function map() {
    navigateTo("/PPK_web/Map/index.html");
}

function bug() {
    window.open("https://forms.gle/3RjKBQ77zDfeS15U7", "_blank");
}

function sc() {
    window.open("https://ppk.ac.th/contact/1/", "_blank");
}

function goback() {
    window.history.back();
}