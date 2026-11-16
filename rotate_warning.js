(function() { //สำหรับเช็กการหมุนหน้าจอ ถ้าจอสูงน้อยเกินมันจะขึ้นเตือนให้หมุนจอ
    const style = document.createElement('style');
    style.innerHTML = `
    
        #rotate-warning {
            display: block;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(245, 248, 255, 0.8);
            z-index: 999999;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: black;
            text-align: center;
            padding: 2em;
            box-sizing: border-box;
            backdrop-filter: blur(8px);
            border-radius: 25px;

            height: 95%;
            max-height: 400px;
            width: 350px
        }
        #rotate-warning svg {
            width: 80px;
            height: 80px;
            margin-bottom: 20px;
            stroke: #288cff; 
            animation: phoneRotateAnim 1.5s infinite ease-in-out;
        }
        @keyframes phoneRotateAnim {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(90deg); }
            100% { transform: rotate(0deg); }
        }
        #rotate-warning h2 {
            font-size: 2rem;
            margin: 0 0 0px 0;
            font-weight: 600;
        }
        #rotate-warning p {
            font-size: 0.95rem;
            margin: 0;
            opacity: 0.75;
            max-width: 280px;
            line-height: 1.5;
        }

        #rotate-warning-dismiss {
            background: #288cff;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 0.9rem;
            font-family: inherit;
            border-radius: 20px;
            cursor: pointer;
            transition: 0.2s;
        }
        #rotate-warning-dismiss:hover {
            background: #1573e0;
            transform: scale(1.03);
        }
    
    `;
    document.head.appendChild(style);



    const warningDiv = document.createElement('div');
    warningDiv.id = 'rotate-warning';
    warningDiv.innerHTML = `
        <svg viewBox="0 0 24 24 " fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        <h2>ช้าก่อน!</h2>
        <p>กรุณาหมุนอุปกรณ์ของคุณ เว็บไซต์นี้ทำงานได้ดีในแนวตั้งเท่านั้น</p>
        <button id="rotate-warning-dismiss">ดูต่อในแนวนอน</button>
    `;
    document.body.appendChild(warningDiv);

    let userDismissed = sessionStorage.getItem('rotate_warning_dismissed') === 'true';

    document.getElementById('rotate-warning-dismiss').addEventListener('click', function() {
        userDismissed = true;
        sessionStorage.setItem('rotate_warning_dismissed', 'true');
        warningDiv.style.display = 'none';
    });

    function checkOrientation() {
        //const isLandscape = window.innerWidth > window.innerHeight;
        const isLandscape = window.innerHeight < 500;
        const isMobile = window.innerWidth <= 900;

        if(isLandscape) {
            warningDiv.style.display = 'flex';
        } else {
            warningDiv.style.display = 'none';
        }
    }

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('DOMContentLoaded', checkOrientation);
    checkOrientation();
})(); //****