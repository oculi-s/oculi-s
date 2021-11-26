import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuuLVy94PUS8YtEfhibbtHewCsrImhhfM",
    authDomain: "futures-1dff5.firebaseapp.com",
    databaseURL: "https://futures-1dff5-default-rtdb.firebaseio.com",
    projectId: "futures-1dff5",
    storageBucket: "futures-1dff5.appspot.com",
    messagingSenderId: "204808828169",
    appId: "1:204808828169:web:6af7aac7a9966fa6854fd8",
    measurementId: "G-2GV70QZBQ2"
};

initializeApp(firebaseConfig);
window.db = getFirestore();
window.auth = getAuth();
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
const ss = sessionStorage;
const de = decodeURI;
const en = encodeURI;
const iscode = en('</code>');
var prp = document.createElement('script');
prp.src = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js?skin=desert';

$('head').innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0"/>`;
$('head').innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`;
$('head').innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="https://firebasestorage.googleapis.com/v0/b/futures-1dff5.appspot.com/o/main.jpg?alt=media&token=5f6610c4-97d5-414d-a6c0-acb44ef6c347">`;

var url = de(window.location.href).split('//')[1].split('/').slice(1);
if (url[0] == 'blog') {
    url = url.slice(1);
};
if (url[0] == '') {
    url = ['index', 'index'];
};
if (url[1] == '') {
    url[1] = 'index';
};
if (url[1] == 'index') {
    url.push('index');
};
if (url[2] == '') {
    url[2] = 'index';
};
while (url.length < 3) {
    url.push('index');
};
console.log(url);

async function getWidget() {
    var css = await getDoc(doc(db, 'source', 'css'));
    var style = document.createElement('style');
    style.innerHTML = de(css.data().index[true]);
    $('head').append(style);
    var nav = await getDoc(doc(db, 'source', 'nav'));
    $('body').innerHTML += de(nav.data().index[ss.log]);
    var aside = await getDoc(doc(db, 'source', 'aside'));
    $('body').innerHTML += de(aside.data().index[ss.log]);
    if ($('aside>span')) {
        $('aside>span').innerHTML = auth.currentUser.email;
    };
    $('body').innerHTML += '<section></section>';
    $('section').innerHTML = '<article></article>';
    _wresize();
}

// 1
const create = '<h1>문서가 존재하지 않습니다.</h1>';
async function getData(x) {
    var html = await getDoc(doc(db, url[0], url[1]));
    if (html.data()) {
        if (url[2] in html.data()) {
            var r = html.data()[url[2]][x];
            ss.prp = r.includes(iscode);
            if (ss.prp == 'false') {
                r = r.replace('%0A', '');
            }
            return de(r);
        } else {
            return create;
        }
    } else {
        return create;
    }
}

function setData(html) {
    var script = [];
    if (html.includes('<script')) {
        html = html.split('</script>');
        for (var i = 0; i < html.length; i++) {
            if (html[i].includes('<script')) {
                script.push(html[i]);
            } else if ($('article')) {
                $('article').innerHTML = html[i];
            }
        }
    } else if ($('article')) {
        $('article').innerHTML = html;
    }
    return script;
}

function setScript(script) {
    for (var i = 0; i < script.length; i++) {
        if (script[i].includes('<script>')) {
            var func = new Function(script[i].replace('<script>', ''));
            func();
        }
    }
}

ss.edit = true;
if (!('uid' in ss)) {
    ss.log = false;
}
getWidget().then(async() => {
    var html = await getData(ss.log);
    var user = await getDoc(doc(db, 'user', ss.uid));
    var editsave = await getDoc(doc(db, 'source', 'editsave'));
    $('section').innerHTML += de(editsave.data().index[user.data().auth]);
    setScript(setData(html));
    if (ss.prp == 'true') {
        $('head').append(prp);
    };
})

// 2
function edit() {
    ss.edit = $('input[name="type"]:checked').value;
    $('article').innerHTML = '<textarea>';
    getData(ss.edit).then((html) => { $('textarea').value = html });
    $('textarea').style = "width:100%; height:100%;";
    $('textarea').addEventListener('keydown', e => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            save();
        };
    });
}

// 3
async function save() {
    var d = en($('textarea').value);
    if (!d.includes(iscode)) {
        d = d.replaceAll('%0A', '');
        d = d.replaceAll('%3E%20%3C', '%3E%3C');
        while (d.includes('%20%20')) {
            d = d.replaceAll('%20%20', '%20');
        };
    };
    var dict = await getDoc(doc(db, url[0], url[1]));
    dict = dict.data();
    if (dict == undefined) {
        dict = {};
        dict[url[2]] = { auth: 1, true: d, false: '' };
        await setDoc(doc(db, url[0], url[1]), dict);
    } else {
        if (!dict[url[2]]) {
            dict[url[2]] = { auth: 1 };
        };
        dict[url[2]][ss.edit] = d;
        if (dict[url[2]].auth < 2) {
            dict[url[2]][!ss.edit] = dict[url[2]].auth ? '' : d;
        };
        await updateDoc(doc(db, url[0], url[1]), dict);
    };
    getData(ss.edit).then((html) => setData(html));
}

// 4
function onEnterSignin() {
    if (event.keyCode == 13) {
        signin();
    };
}

function signin() {
    signInWithEmailAndPassword(auth, $('#id').value, $('#pw').value)
        .then(async(userCredential) => {
            ss.uid = userCredential.user.uid;
            ss.log = true;
            location.reload();
        }).catch((e) => {
            alert(e.message);
        });
}

async function signout() {
    signOut(auth).then(() => {
        alert('로그아웃 되었습니다.');
        location.href = 'https://' + location.host + '/blog';
        ss.uid = null;
        ss.log = false;
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
}

$('body').onresize = _wresize;

function _wresize() {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        if ($('section')) {
            $('section').classList.add('m-s');
        };
        if ($('aside')) {
            $('aside').classList.add('m-a');
        };
        if ($('nav')) {
            $('nav').classList.add('m-n');
        };
    } else {
        if ($('section')) {
            $('section').classList.remove('m-s');
        };
        if ($('aside')) {
            $('aside').classList.remove('m-a');
        };
        if ($('nav')) {
            $('nav').classList.remove('m-n');
        };
    };
}

window.getData = getData;
window.setData = setData;
window.setScript = setScript;
window.edit = edit;
window.save = save;
window.signin = signin;
window.signout = signout;
window.onEnterSignin = onEnterSignin;