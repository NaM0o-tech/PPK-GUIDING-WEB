const text1 = document.querySelector(".text1")
const text2 = document.querySelector(".text2")

const container = document.querySelector(".container")

navigator.geolocation.watchPosition(
    (position) => {
        text1.textContent = "เข้าถึงสำเร็จ!";
        text2.textContent = "เรากำลังนำพาคุณไปหน้าแผนที่";

        text1.style.color = "#7cbe48";
        text2.style.color = "#236628";

        gotomap();
    },
    () => {
        text1.textContent = "หาตำแหน่งไม่ได้!";
        text2.textContent = "ลองอนุญาตการเข้าถึงอีกครั้ง แล้วกดรีเฟรช!";

        text1.style.color = "#be4848";
        text2.style.color = "#491717";

        let skip_button = document.createElement("button");
        skip_button.textContent = "ข้ามไปยังแผนที่";

        skip_button.classList.add("skip")

        skip_button.addEventListener("click", () => {
            gotomap()
        })


        container.appendChild(skip_button);
    }
)