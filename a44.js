import { initializeApp } from "https://jspm.dev/@firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc } from "https://jspm.dev/@firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "https://jspm.dev/@firebase/storage";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://jspm.dev/@firebase/auth";
import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';

const firebaseConfig = { apiKey: "AIzaSyAuuLVy94PUS8YtEfhibbtHewCsrImhhfM", authDomain: "futures-1dff5.firebaseapp.com", databaseURL: "https://futures-1dff5-default-rtdb.firebaseio.com", projectId: "futures-1dff5", storageBucket: "futures-1dff5.appspot.com", messagingSenderId: "204808828169", appId: "1:204808828169:web:6af7aac7a9966fa6854fd8", measurementId: "G-2GV70QZBQ2" };
initializeApp(firebaseConfig);
window.db = getFirestore();
window.st = getStorage();
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

const auth = getAuth();
const ss = localStorage;
const de = decodeURI;
const en = encodeURI;
const iscode = en('</code>');
const head = document.head;
const body = document.body;

head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">`;
head.innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="/main.png"/>`
body.innerHTML = '<nav></nav><section><article></article></section><aside></aside>';

const nav = $('nav');
const section = $('section');
const aside = $('aside');

var srce = '';
var html = '';
var dict = '';
var user = '';
var img = '';
var himg = '';
var url = de(location.pathname).toLowerCase().split('/').slice(1);
url = url.filter(e => e !== '');
while (url.length < 3) { url.push('index'); };
console.log(url);

(async () => {
    srce = await getDoc(doc(db, 'index', 'source'));
    srce = srce.data();
    head.innerHTML += de(srce.css.true);
    nav.innerHTML = de(srce.nav[ss.log]);
    aside.innerHTML = de(srce.aside[ss.log]);
    $('aside>span').innerHTML = auth.currentUser.email;
    _wresize();

    html = doc(db, url[0], url[1]);
    dict = await getDoc(html);
    dict = dict.data();
    user = await getDoc(doc(db, 'user', ss.uid));
    user = user.data();
})().then(() => {
    var portal = document.createElement('portal');
    for (var i = 0; i < url.length; i++) {
        if (url[i] != 'index') {
            portal.innerHTML += `/<a href=/${url.slice(0, i + 1).join('/')}/>${url[i]}</a>`;
        }
    }
    section.append(portal);
    section.innerHTML += de(srce.editsave[user.auth]);
    loadImgList();
    setData(getData(ss.log));
    eval(de(srce.prp[ss.prp]));
    head.innerHTML += de(srce.prps[ss.prp]);
}).then(() => {
    if (location.hash) {
        location.href = location.hash;
    }
})

window.onerror = (m)=>{body.innerHTML = m;}

function getData(x) {
    if (dict) {
        if (url[2] in dict) {
            var r = dict[url[2]][x];
            ss.prp = r.includes(iscode);
            return de(r);
        } else {
            return de(srce.create.true);
        }
    } else {
        return de(srce.create.true);
    }
}

function setData(index) {
    var script = [];
    if (index.includes('<script')) {
        index = index.split('</script>');
        for (var i = 0; i < index.length; i++) {
            if (index[i].includes('<script>')) {
                script.push(index[i].replace('<script>', ''));
            } else if (index[i].includes('<script ')) {
                head.innerHTML += index[i] + '</script>';
            } else {
                $('article').innerHTML = index[i];
            }
        }
        for (var i = 0; i < script.length; i++) {
            eval(script[i]);
        }
    } else {
        $('article').innerHTML = index;
    }
    setIndex();
    setImage();
}

var H = '';
var s = { '2': ['', '.'], '3': ['', ')'], '4': ['', ''], '5': ['(', ')'] };
var hnum = { '2': '', '3': '', '4': '', '5': '' };
var hid = { '1': '', '2': '', '3': '', '4': '', '5': '' };

function indexing(tid, num, i) {
    var d = H[i].tagName[1];
    H[i].tid = s[d][0] + num + s[d][1];
    H[i].id = tid + H[i].tid;
    if (i < H.length - 1) {
        var nd = H[i + 1].tagName[1];
        if (d < nd) {
            hnum[d] = num;
            hid[d] = H[i].tid;
            indexing(tid + hid[d], 1, i + 1);
        } else if (d == nd) {
            indexing(tid, num + 1, i + 1);
        } else {
            indexing(Object.values(hid).slice(0, nd).join(''), hnum[nd] + 1, i + 1);
        }
    }
}

function setIndex() {
    H = $$('h2, h3, h4, h5');
    if ($('index')) {
        $('index').id = 'index';
        var temp = '';
        indexing('', 1, 0);
        H.forEach(e => {
            temp += `<${e.tagName}><a href="#${e.id}">${e.tid}</a> ${e.innerText}</${e.tagName}>`
            e.innerHTML = `<a href="#index">${e.tid}</a> ` + e.innerHTML;
        });
        $('index').innerHTML = temp;
    }
}

async function setImage() {
    img = await listAll(ref(st, url.join('/')));
    img = img.items;
    img.forEach(async e => {
        var el = $(`img[name="${e.name}"]`);
        if (el) {
            var imgLink = await getDownloadURL(e);
            el.src = imgLink;
            el.setAttribute('onclick', `this.classList.toggle("${el.height > el.width ? 'h':'w'}show")`);
        }
    })
}

async function loadImgList() {
    img = await listAll(ref(st, url.join('/')));
    img = img.items;
    if ($('#img')) {
        $('#img>div').innerHTML = '';
        img.forEach(e => {
            $('#img>div').innerHTML += `<p onclick=navigator.clipboard.writeText(this.innerText) style='color:${de(dict[url[2]].true).includes(e.name) ? "#aaa" : "#fff"};'>${e.name}<button onclick=deleteImg('${e.name}')><i class="fa fa-trash"></i></button></p>`
        })
    }
}

function uploadImg() {
    var imgs = $('article input').files;
    for (var i = 0; i < imgs.length; i++) {
        uploadBytes(ref(st, `${url.join('/')}/${imgs[i].name}`), imgs[i]).then(() => loadImgList())
    }
    $('article input').value = '';

}

function deleteImg(n) {
    if (confirm('삭제하시겠습니까?')) {
        deleteObject(ref(st, `${url.join('/')}/${n}`)).then(() => loadImgList())
    }
}

ss.edit = true;
if (!('uid' in ss)) {
    ss.log = false;
}
$('html').addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key == 'e' || e.key == 'ㄷ')) {
        e.preventDefault();
        edit();
    } else if (e.ctrlKey && (e.key == 'd' || e.key == 'ㅇ')) {
        e.preventDefault();
        del();
    }
});
$('html').addEventListener('unload', e => { ss.clear(); })

function edit() {
    ss.edit = $('input[name="type"]:checked').value;
    $('article').innerHTML = `<edit contenteditable=true></edit>`;
    $('edit').innerText = getData(ss.edit);
    $('article').innerHTML += de(srce.img.true);
    loadImgList();
    $('edit').focus();
    $('edit').addEventListener('keydown', e => {
        if (e.ctrlKey && (e.key === 's' || e.key == 'ㄴ')) {
            e.preventDefault();
            save();
        };
    });
}

function save() {
    var d = en($('edit').innerText);
    if (dict == undefined) {
        dict = {};
        dict[url[2]] = { auth: 1, true: d, false: '' };
        setDoc(html, dict);
    } else {
        if (!dict[url[2]]) {
            dict[url[2]] = { auth: 1 };
        };
        dict[url[2]][ss.edit] = d;
        if (dict[url[2]].auth < 2) {
            dict[url[2]][!ss.edit] = dict[url[2]].auth ? '' : d;
        };
        updateDoc(html, dict);
    };
    setData(de(dict[url[2]][ss.edit]));
    eval(de(srce.prp[ss.prp]));
}

async function del() {
    if (confirm('삭제하시겠습니까?')) {
        delete dict[url[2]];
        updateDoc(html, dict);
        if (Object.keys(dict).length == 0) {
            deleteDoc(html);
        }
        $('article').innerHTML = de(srce.create.true);
    }
}

function onEnterSignin() {
    if (event.keyCode == 13) {
        signin();
    };
}

function signin() {
    signInWithEmailAndPassword(auth, $('#id').value, $('#pw').value)
        .then(u => {
            ss.uid = u.user.uid;
            ss.log = true;
            location.reload();
        }).catch((e) => {
            alert(e.message);
        });
}

async function signout() {
    signOut(auth).then(() => {
        alert('로그아웃 되었습니다.');
        location.href = '/';
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
window.uploadImg = uploadImg;
window.deleteImg = deleteImg;