function base_path() {
    const pathname = window.location.pathname;
    const repoName = "PPK-GUIDING-WEB"; 
    
    // แปลงเป็นตัวพิมพ์เล็กทั้งคู่เพื่อเทียบความถูกต้อง ป้องกันปัญหา Case Sensitive บน iPhone
    const lowerPath = pathname.toLowerCase();
    const lowerRepo = repoName.toLowerCase();
    const index = lowerPath.indexOf(lowerRepo);

    if (index !== -1) {
        // ตัด Path จริงตามความยาวของชื่อ Repo
        return pathname.substring(0, index + lowerRepo.length);
    }
    return "";
}

function navigateTo(relativePath) {
    try {
        const basePath = base_path();
        
        // จัดการเรื่อง / ซ้ำซ้อน
        const cleanBase = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
        const cleanPath = relativePath.startsWith("/") ? relativePath : "/" + relativePath;
        
        // รวม URL แบบเต็มเพื่อความชัวร์บน iOS WebKit
        const targetUrl = window.location.origin + cleanBase + cleanPath;

        // ใช้ assign แทน href
        window.location.assign(targetUrl);
    } catch (err) {
        // ถ้าเกิด Error บน iPhone มันจะ Alert ออกมาบอกทันที
        alert("iOS Error: " + err.message);
    }
}

// IOS is so sensitive bruh
// ----------------------------------------------------------------------------------------------------



function check_location() {
    navigateTo("/PPK_web/Progess/index.html");
}

function Help() {
    navigateTo("/PPK_web/Help/index.html");
}

function goindex() {
    navigateTo("/index.html");
}

function debug() {
    navigateTo("/PPK_web/Debug/index.html");
}

function gotomap() {
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