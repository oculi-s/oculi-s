import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyDZouQJ7YKTZUE6F3LAXPnt_p_ayFGQnF8",
    authDomain: "sample-65976.firebaseapp.com",
    projectId: "sample-65976",
    storageBucket: "sample-65976.appspot.com",
    messagingSenderId: "258901722942",
    appId: "1:258901722942:web:91a5be6c8c5cb1b483ce6f",
    measurementId: "G-GVEQ68YWY4"
};
initializeApp(firebaseConfig), window.db = getFirestore(), window.auth = getAuth(), window.$ = document.querySelector.bind(document), window.$$ = document.querySelectorAll.bind(document);
const ss = sessionStorage,
    de = decodeURI,
    en = encodeURI,
    iscode = en("</code>");
$("head").innerHTML += '<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />', $("head").innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">', $("head").innerHTML += '<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="https://firebasestorage.googleapis.com/v0/b/futures-1dff5.appspot.com/o/main.jpg?alt=media&token=5f6610c4-97d5-414d-a6c0-acb44ef6c347">';
var url = de(window.location.href).split("//")[1].split("/").slice(1);
for ("body" == url[0] && (url = url.slice(1)), "" == url[0] && (url = ["index", "index"]), "" == url[1] && (url[1] = "index"), "index" == url[1] && url.push("index"), "" == url[2] && (url[2] = "index"); url.length < 3;) url.push("index");
async function getWidget() {
    var e = await getDoc(doc(db, "source", "css")),
        t = document.createElement("style");
    t.innerHTML = de(e.data().index[!0]), $("head").append(t);
    var i = await getDoc(doc(db, "source", "nav"));
    $("body").innerHTML += de(i.data().index[ss.log]);
    var a = await getDoc(doc(db, "source", "aside"));
    $("body").innerHTML += de(a.data().index[ss.log]), $("aside>span") && ($("aside>span").innerHTML = auth.currentUser.email), $("body").innerHTML += "<section></section>", $("section").innerHTML = "<article></article>", _wresize()
}
console.log(url);
const create = "<h1>문서가 존재하지 않습니다.</h1>";
async function getData(e) { var t = await getDoc(doc(db, url[0], url[1])); if (t.data()) { if (url[2] in t.data()) { var i = t.data()[url[2]][e]; return ss.prp = i.includes(iscode), "false" == ss.prp && (i = i.replace("%0A", "")), de(i) } return create } return create }

function setData(e) { var t = []; if (e.includes("<script")) { e = e.split("<\/script>"); for (var i = 0; i < e.length; i++) e[i].includes("<script") ? t.push(e[i]) : $("article") && ($("article").innerHTML = e[i]) } else $("article") && ($("article").innerHTML = e); return t }

function setScript(e) { for (var t = 0; t < e.length; t++) { if (e[t].includes("<script>")) new Function(e[t].replace("<script>", ""))() } }

function edit() { ss.edit = $('input[name="type"]:checked').value, $("article").innerHTML = "<textarea>", getData(ss.edit).then(e => { $("textarea").value = e }), $("textarea").style = "width:100%; height:100%;", $("textarea").addEventListener("keydown", e => { e.ctrlKey && "s" === e.key && (e.preventDefault(), save()) }) }
async function save() {
    var d = en($("textarea").value);
    if (!d.includes(iscode))
        for (d = d.replaceAll("%0A", ""), d = d.replaceAll("%3E%20%3C", "%3E%3C"); d.includes("%20%20");) d = d.replaceAll("%20%20", "%20");
    var dict = await getDoc(doc(db, url[0], url[1]));
    dict = dict.data(), null == dict ? (dict = {}, dict[url[2]] = { auth: 1, true: d, false: "" }, await setDoc(doc(db, url[0], url[1]), dict)) : (dict[url[2]] || (dict[url[2]] = { auth: 1 }), dict[url[2]][ss.edit] = d, dict[url[2]].auth < 2 && (dict[url[2]][!ss.edit] = dict[url[2]].auth ? "" : d), await updateDoc(doc(db, url[0], url[1]), dict)), getData(ss.edit).then(e => setData(e)), "true" == ss.prp && getDoc(doc(db, "source", "prettify")).then(prp => eval(prp.data().data))
}
async function del() {
    var e = await getDoc(doc(db, url[0], url[1]));
    confirm("삭제하시겠습니까?") && (delete e[url[2]], getData(ss.log).then(e => setData(e)), 0 == Object.keys(e).length && deleteDoc(doc(db, url[0], url[1])))
}

function onEnterSignin() { 13 == event.keyCode && signin() }

function signin() { signInWithEmailAndPassword(auth, $("#id").value, $("#pw").value).then(async e => { ss.uid = e.user.uid, ss.log = !0, location.reload() }).catch(e => { alert(e.message) }) }
async function signout() { signOut(auth).then(() => { alert("로그아웃 되었습니다."), location.href = "/sample", ss.uid = null, ss.log = !1 }).catch(e => { alert("로그인 정보가 없습니다.") }) }

function _wresize() { /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? ($("section") && $("section").classList.add("m-s"), $("aside") && $("aside").classList.add("m-a"), $("nav") && $("nav").classList.add("m-n")) : ($("section") && $("section").classList.remove("m-s"), $("aside") && $("aside").classList.remove("m-a"), $("nav") && $("nav").classList.remove("m-n")) }
ss.edit = !0, "uid" in ss || (ss.log = !1), getWidget().then(async() => {
    var html = await getData(ss.log),
        user = await getDoc(doc(db, "user", ss.uid)),
        editsave = await getDoc(doc(db, "source", "editsave"));
    $("section").innerHTML += de(editsave.data().index[user.data().auth]), setScript(setData(html)), "true" == ss.prp && (getDoc(doc(db, "source", "prettify")).then(prp => eval(prp.data().data)), getDoc(doc(db, "source", "prettify")).then(e => $("section").innerHTML += "<style>" + e.data().skin + "</style>"))
}), $("body").onresize = _wresize, window.getData = getData, window.setData = setData, window.setScript = setScript, window.edit = edit, window.save = save, window.del = del, window.signin = signin, window.signout = signout, window.onEnterSignin = onEnterSignin;