import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
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
const ss = sessionStorage;
const de = decodeURI;
const en = encodeURI;
const iscode = en('</code>');

$('head').innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
$('head').innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`;
$('head').innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="https://firebasestorage.googleapis.com/v0/b/futures-1dff5.appspot.com/o/main.jpg?alt=media&token=5f6610c4-97d5-414d-a6c0-acb44ef6c347">`;

var url = de(window.location.href).split('//')[1].split('/').slice(1);
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
    var source = await getDoc(doc(db, 'sample', 'source'));
    source = source.data();
    var style = document.createElement('style');
    style.innerHTML = de(source.css[true]);
    $('head').append(style);
    $('body').innerHTML += de(source.nav[ss.log]);
    $('body').innerHTML += de(source.aside[ss.log]);
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
            if (html[i].includes('<script>')) {
                script.push(html[i]);
            } else if (html[i].includes('<script ')) {
                $('head').innerHTML += html[i] + '</script>';
            } else if ($('article')) {
                $('article').innerHTML = html[i];
            }
        }
        for (var i = 0; i < script.length; i++) {
            eval(script[i].split('>')[1].split('<')[0]);
        }
    } else if ($('article')) {
        $('article').innerHTML = html;
    }
}

ss.edit = true;
if (!('uid' in ss)) {
    ss.log = false;
}
getWidget().then(async() => {
    var source = await getDoc(doc(db, 'sample', 'source'));
    source = source.data();
    var html = await getData(ss.log);
    var user = await getDoc(doc(db, 'user', ss.uid));
    $('section').innerHTML += de(source.editsave[user.data().auth]);
    setData(html);
    eval(source.prp[ss.prp]);
    $('section').innerHTML += '<style>' + source.prp.skin + '</style>';
});

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
    var source = await getDoc(doc(db, 'sample', 'source'));
    eval(source.data().prp[ss.prp]);
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
        location.href = '/sample/';
        ss.uid = null;
        ss.log = false;
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
}

$('body').onresize = _wresize;

function _wresize() {
    if (/Android|iPhone|iPod/i.test(navigator.userAgent)) {
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
                dataLabels: { enabled: true },
                animation: false
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