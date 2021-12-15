import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';

const firebaseConfig = {
    apiKey: "AIzaSyDZouQJ7YKTZUE6F3LAXPnt_p_ayFGQnF8",
    authDomain: "sample-65976.firebaseapp.com",
    projectId: "sample-65976",
    storageBucket: "sample-65976.appspot.com",
    messagingSenderId: "258901722942",
    appId: "1:258901722942:web:91a5be6c8c5cb1b483ce6f",
    measurementId: "G-GVEQ68YWY4"
};
initializeApp(firebaseConfig);
window.db = getFirestore();
window.auth = getAuth();
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
const ss = localStorage;
const de = decodeURI;
const en = encodeURI;
const iscode = en('</code>');
const head = document.head;
const body = document.body;

head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`;
head.innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="https://cdn.jsdelivr.net/gh/oculi-s/blog/main.png"/>`
body.innerHTML = '<nav></nav><section><article></article></section><aside></aside>';

const nav = $('nav');
const section = $('section');
const aside = $('aside');

var url = de(location.pathname).toLowerCase().split('/').slice(1);
var source = '';
url = url.filter(e => e !== '');
while (url.length < 3) { url.push('index'); };
console.log(url);

async function getWidget() {
    source = await getDoc(doc(db, 'sample', 'source'));
    source = source.data();
    var style = document.createElement('style');
    style.innerHTML = de(source.css.true);
    head.append(style);
    nav.innerHTML = de(source.nav[ss.log]);
    aside.innerHTML = de(source.aside[ss.log]);
    if ($('aside>span')) {
        $('aside>span').innerHTML = auth.currentUser.email;
    };
    _wresize();
}

async function getData(x) {
    var html = await getDoc(doc(db, url[0], url[1]));
    if (html.data()) {
        if (url[2] in html.data()) {
            var r = html.data()[url[2]][x];
            ss.prp = r.includes(iscode);
            return de(r);
        } else {
            return de(source.create.true);
        }
    } else {
        return de(source.create.true);
    }
}

function setData(html) {
    var script = [];
    if (html.includes('<script')) {
        html = html.split('</script>');
        for (var i = 0; i < html.length; i++) {
            if (html[i].includes('<script>')) {
                script.push(html[i]);
            } else if (html[i].includes('<script ')) {
                head.innerHTML += html[i] + '</script>';
            } else {
                $('article').innerHTML = html[i];
            }
        }
        for (var i = 0; i < script.length; i++) {
            eval(script[i].split('<script>')[1].split('</script>')[0]);
        }
    } else {
        $('article').innerHTML = html;
    }
    setIndex();
}

function setIndex() {
    if ($('index')) {
        $('index').innerHTML = '';
        var temp = '';
        var H = $$('h2, h3, h4, h5');
        for (var i = 0; i < H.length; i++) {
            H[i].id = `${en(H[i].innerText.toLowerCase())}`;
            temp += `<${H[i].tagName}><a href="#${H[i].id}">${H[i].innerText.toLowerCase()}</a></${H[i].tagName}>`
        }
        $('index').innerHTML = temp;
    }
}

ss.edit = true;
if (!('uid' in ss)) {
    ss.log = false;
}
getWidget().then(async() => {
    var url_string = '<portal>';
    for (var i = 0; i < url.length; i++) {
        if (url[i] != 'index') {
            url_string += `/<a href=/${url.slice(0, i + 1).join('/')}/>${url[i]}</a>`;
        }
    }
    url_string += '</portal>';
    section.innerHTML += url_string;
    var html = await getData(ss.log);
    var user = await getDoc(doc(db, 'user', ss.uid));
    section.innerHTML += de(source.editsave[user.data().auth]);
    setData(html);
    eval(de(source.prp[ss.prp]));
    section.innerHTML += '<style>' + de(source.prps[ss.prp]) + '</style>';
}).then(() => {
    if (location.hash) {
        location.href = location.hash;
    }
});

$('html').addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key == 'e' || e.key == 'ㄷ')) {
        e.preventDefault();
        edit();
    };
});

function edit() {
    ss.edit = $('input[name="type"]:checked').value;
    $('article').innerHTML = '<textarea>';
    getData(ss.edit).then((html) => { $('textarea').value = html });
    $('textarea').focus();
    $('textarea').selectionEnd = $('textarea').selectionEnd;
    $('textarea').addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 's' || e.key == 'ㄴ')) {
            e.preventDefault();
            save();
        };
    });
}

async function save() {
    var d = en($('textarea').value);
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
    eval(de(source.prp[ss.prp]));
}

async function del() {
    var dict = await getDoc(doc(db, url[0], url[1]));
    if (confirm('삭제하시겠습니까?')) {
        dict = dict.data();
        delete dict[url[2]];
        await updateDoc(doc(db, url[0], url[1]), dict);
        getData(ss.log).then((html) => setData(html));
        if (Object.keys(dict).length == 0) {
            deleteDoc(doc(db, url[0], url[1]));
        }
    }
    location.reload();
}

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
        location.href = '/sample';
        ss.uid = null;
        ss.log = false;
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
}

body.onresize = _wresize;

var mchangeWidth = 0;

function _wresize() {
    if (/Android|iPhone|ipad|iPod/i.test(navigator.userAgent)) {
        section.classList.add('m-s');
        aside.classList.add('m-a');
        nav.classList.add('m-n');
    } else if (!section.classList.contains('m-s')) {
        if (section.offsetLeft < (nav.offsetLeft + nav.offsetWidth)) {
            section.classList.add('m-s');
            aside.classList.add('m-a');
            nav.classList.add('m-n');
            if (!mchangeWidth) {
                mchangeWidth = window.innerWidth;
            }
        }
    } else if (window.innerWidth > mchangeWidth) {
        section.classList.remove('m-s');
        aside.classList.remove('m-a');
        nav.classList.remove('m-n');
        if (mchangeWidth) {
            mchangeWidth = window.innerWidth;
        }
    }
}

function makeChart(id, raw) {
    var e = document.getElementById(id);
    return Highcharts.chart(id, {
        chart: { type: e.dataset.type },
        title: { text: e.dataset.title },
        data: { csv: raw },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right'
        },
        plotOptions: {
            series: {
                stacking: e.dataset.stack == '1' ? 'normal' : '',
                dataLabels: { enabled: true }
            },
            column: { stacking: 'normal', dataLabels: { enabled: true } },
        }
    })
}

window.getData = getData;
window.setData = setData;
window.edit = edit;
window.save = save;
window.del = del;
window.signin = signin;
window.signout = signout;
window.onEnterSignin = onEnterSignin;
window.makeChart = makeChart;
window.collection = collection;
window.getDocs = getDocs;
window.getDoc = getDoc;