let title = document.querySelector('.title');
let ul = document.querySelector('ul');
let reload = document.querySelector('.reload');

window.onload = checkConnection;
window.addEventListener("online", checkConnection);
window.addEventListener("offline", () => {
    // لو فصل النت تمامًا من الشبكة
    offLine();
});

reload.onclick = function () {
    location.reload();
};

async function checkConnection() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (response.ok) {
            onLine();
        } else {
            offLine();
        }
    } catch (error) {
        offLine();
    }
}

function onLine() {
    title.innerHTML = '✅ Online Now';
    title.style.color = 'green';
    ul.classList.add('hide');
    reload.classList.add('hide');
}

function offLine() {
    title.innerHTML = '❌ Offline Now';
    title.style.color = '#666';
    ul.classList.remove('hide');
    reload.classList.remove('hide');
}
