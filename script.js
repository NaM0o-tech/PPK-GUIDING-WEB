
function base_path() {
    if (window.location.pathname.includes("/PPK-GUIDING-WEB")) {
        return "/PPK-GUIDING-WEB";
    }
    return "";
}


function Help() {
    window.location.href = base_path() + "/PPK_web/Help/index.html";
}

function bug() {
    window.open("https://forms.gle/3RjKBQ77zDfeS15U7", "_blank");
}

function sc() {
    window.open("https://ppk.ac.th/contact/1/", "_blank");
}

function check_location() {
    window.location.href = base_path() + "/PPK_web/Progess/index.html"  
}

function goindex() {
    window.location.href = base_path() + "/index.html"
}

function debug() {
    window.location.href = base_path() + "/PPK_web/Debug/index.html";
}

function map() {
    window.location.href = base_path() + "/PPK_web/Map/index.html";
}

function goback() {
    window.history.back()
}

