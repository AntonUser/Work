async function jump(url, token) {
    document.location.replace("http://localhost:3001/" + url + "?token=" + token);
}
async function toLogin() {
    document.location.replace("http://localhost:3001/");
}