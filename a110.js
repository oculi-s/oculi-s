import { initializeApp } from "https://jspm.dev/@firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField } from "https://jspm.dev/@firebase/firestore";
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
window.fb = { 'srce': '', 'html': '', 'dict': '', 'user': '', 'img': '' };
const iscode = en('</code>');
const head = document.head;
const body = document.body;
const css_load = `z-index:5; position: fixed; width:100%; height:100%; background: #0d1117; left:0; top:0; transition:ease .5s`;
const css_gif = `position:absolute; width:100px; height:100px; top:calc(50% - 50px); left:calc(50% - 50px);`;
body.innerHTML = `<load style="${css_load}"><img src='/main.gif' style="${css_gif}"></load>`;
const u = {};
u.prp = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
u.trv = 'https://s3.tradingview.com/tv.js';

head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">`;
head.innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="/main.png"/>`
body.innerHTML += `<nav></nav><section><article></article></section><aside></aside>`;
body.onresize = wresize;

var mchangeWidth = 0;
const nav = $('nav');
const section = $('section');
const aside = $('aside');

function wresize() {
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

var article = ''
var url = de(location.pathname).toLowerCase().split('/').slice(1).filter(e => e !== '');
url.push('index', 'index', 'index');
url = url.slice(0, 3);
console.log(url);

(async () => {
    fval(u.trv);
    loadImgList();
    fb.srce = await getDoc(doc(db, 'index', 'source'));
    fb.srce = fb.srce.data();
    fb.user = await getDoc(doc(db, 'user', ss.uid));
    fb.user = fb.user.data();
    head.innerHTML += de(fb.srce.css.true);
    wresize();
    fb.html = doc(db, url[0], url[1]);
    fb.dict = await getDoc(fb.html);
    fb.dict = fb.dict.data();
})().then(() => {
    if (fb.user) {
        nav.innerHTML = de(fb.srce.nav[ss.log]);
        aside.innerHTML = de(fb.srce.aside[ss.log]);
        if (ss.uid != 'null' && ss.uid != 'undefined') {
            $('aside>span').innerHTML = auth.currentUser.email;
        }
    } else {
        body.innerHTML = '';
        signout();
    }
}).then(() => {
    var portal = document.createElement('portal');
    for (var i = 0; i < url.length; i++) {
        if (url[i] != 'index') {
            portal.innerHTML += `/<a href=/${url.slice(0, i + 1).join('/')}/>${url[i]}</a>`;
        }
    }
    section.append(portal);
    section.innerHTML += de(fb.srce.es[fb.user.auth]);

    article = $('article');
    ss.edit = true;
    if (!('uid' in ss)) {
        ss.log = false;
    }
    setData(getData(ss.log));
    if (ss.prp) { fval(u.prp); }
    head.innerHTML += de(fb.srce.prps[ss.prp]);
    unload();
}).then(() => {
    if (location.hash) { location.href = location.hash; }
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.keyCode == 69 || e.keyCode == 101)) {
            e.preventDefault();
            edit();
        }
    });
    document.addEventListener('unload', e => { ss.clear(); });
}).catch(e => {
    unload();
    article.innerHTML = `\n${e.stack}\n\n${$('script[type=module]').src}`;
    throw e;
});

function unload() {
    $('load').style.opacity = 0;
    setTimeout(() => { $('load').style.display = 'none'; }, 500);
}

function fval(src, asy = true) {
    fetch(src)
        .then(r => { return r.text() })
        .then(r => eval(asy ? `(async()=>{${r}})()` : r));
}

function getData(x) {
    if (fb.dict) {
        if (url[2] in fb.dict) {
            var r = fb.dict[url[2]][x];
            ss.prp = r.includes(iscode);
            return de(r);
        } else {
            return de(fb.srce.create.true);
        }
    } else {
        return de(fb.srce.create.true);
    }
}

function setScript(e, script) {
    script.forEach(scr => {
        e.remove(scr);
        if (scr.src) {
            fval(scr.src, false);
        } else {
            eval(scr.innerText);
        }
    });
}

function setData(index) {
    var e = document.createElement('html')
    e.innerHTML = index;
    var scrsrc = e.querySelectorAll('script[src]');
    var script = e.querySelectorAll('script:not([src])');
    scrsrc.forEach(scr => e.remove(scr));
    script.forEach(scr => e.remove(scr));
    article.innerHTML = e.innerHTML;
    setIndex();
    setFold();
    setImage();
    setScript(e, script);
    setCode();
}

function setFold() {
    if ($('h1')) {
        $$(`article>${$('h1').dataset.fold}`).forEach((e) => {
            e.onclick = () => { e.classList.toggle('fold') };
            e.classList.add('foldable');
        })
    }
}

function setCode() {
    if (ss.prp && $('code')) {
        var but = document.createElement('button');
        but.innerText = 'Compile';
        but.onclick = () => {
            var form = new FormData();
            form.append('initScript', $('pre').innerText.trim());
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "https://www.jdoodle.com/api/redirect-to-post/c-online-compiler");
            xhr.send(form);
        }
        article.append(but);
    }
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
            indexing(Object.values(hid).slice(0, nd - 1).join(''), hnum[nd] + 1, i + 1);
        }
    }
}

function setIndex() {
    H = $$('h2, h3, h4, h5');
    if ($('index')) {
        var temp = '';
        indexing('', 1, 0);
        H.forEach(e => {
            temp += `<${e.tagName}><a href="#${e.id}" target=_self>${e.tid}</a> ${e.innerText}</${e.tagName}>`
            e.innerHTML = `<a href="#">${e.tid}</a> ` + e.innerHTML;
        });
        $('index').innerHTML = temp;
    }
}

function setImage() {
    if (fb.img.length) {
        fb.img.forEach(async e => {
            var el = $(`img[name="${e.name}"]`);
            if (el) {
                var imgLink = await getDownloadURL(e);
                el.src = imgLink;
                el.setAttribute('onclick', `this.classList.toggle("show");$('body').classList.toggle("blur")`);
            }
        })
    }
}

function setImageEdit() {
    if ($('#img')) {
        $('#img>div').innerHTML = '';
        fb.img.forEach(e => {
            var p = document.createElement('p');
            var but = document.createElement('button');
            p.onclick = () => { navigator.clipboard.writeText(e.name.trim()) };
            p.style.color = de(fb.dict[url[2]].true).includes(e.name) ? "#aaa" : "#fff";
            p.innerText = e.name;
            button.onclick = () => { deleteImg(e.name), delete fb.img[e] }
            button.classList.add('far', 'fa-trash-alt');
            p.append(button);
            $('#img>div').append(p);
        })
    }
}

async function loadImgList(reload = true, callback = setImageEdit) {
    if (reload) {
        fb.img = await listAll(ref(st, url.join('/')));
        if (fb.img) {
            fb.img = fb.img.items;
        }
    }
    callback();
}

function uploadImg(callback = loadImgList) {
    var imgs = $('article input').files;
    for (var i = 0; i < imgs.length; i++) {
        uploadBytes(ref(st, `${url.join('/')}/${imgs[i].name}`), imgs[i])
    }
    $('article input').value = '';
    callback();
}

function deleteImg(n, callback = loadImgList) {
    if (confirm('삭제하시겠습니까?')) {
        deleteObject(ref(st, `${url.join('/')}/${n}`));
        callback(false);
    }
}

function insert_text(s) {
    var sel = getSelection();
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(s);
    sel.deleteFromDocument();
    range.insertNode(node);
    range.setStartAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
}

function listener() {
    var k = event.keyCode;
    if (!(event.ctrlKey || event.altKey || event.metaKey)) {
        if (k <= 90 && k >= 65) {
            event.preventDefault();
            var s = String.fromCharCode(k + (event.shiftKey ? 0 : 32));
            insert_text(s);
        }
    }
}

function edit(callback = setImageEdit) {
    ss.edit = $('input[name="type"]:checked').value;
    edit = document.createElement('edit');
    edit.setAttribute('data-eng' = 'false');
    edit.setAttribute('contenteditable', true);
    edit.innerText = getData(ss.edit);
    article.innerHTML = edit;
    edit.focus();
    section.classList.add('e-s');
    article.classList.add('e-a');
    article.innerHTML += de(fb.srce.img.true);
    loadImgList(false);
    callback();
    var int = setInterval(save, 60 * 1000, true);
    edit.addEventListener('keydown', e => {
        var k = e.keyCode;
        if (event.ctrlKey && (k == 83 || k == 115)) {
            e.preventDefault();
            save();
            clearInterval(int);
        } else if (k == 18 && /iPhone|ipad|iPod/i.test(navigator.userAgent)) {
            e.preventDefault();
            if (edit.dataset.eng == 'true') {
                edit.removeEventListener('keydown', listener);
                edit.setAttribute('data-eng', 'false');
                $('ke').innerHTML = '한';
            } else {
                edit.addEventListener('keydown', listener);
                edit.setAttribute('data-eng', 'true');
                $('ke').innerHTML = '영';
            }
        } else if (k == 9) {
            e.preventDefault();
            insert_text('\u00a0\u00a0\u00a0\u00a0');
        }
    });
}

function saved() {
    $('es>div>span').style.color = '#6183ff';
    setTimeout(() => { $('es>div>span').style.color = 'transparent'; }, 1000);
}

function save(autosave = false, callback = saved) {
    var d = en($('edit').innerText.replaceAll('\u00a0', ' '));
    if (fb.dict == undefined) {
        fb.dict = {};
        fb.dict[url[2]] = { auth: 1, true: d, false: '' };
        setDoc(fb.html, fb.dict);
    } else {
        if (!fb.dict[url[2]]) {
            fb.dict[url[2]] = { auth: 1 };
        };
        fb.dict[url[2]][ss.edit] = d;
        if (fb.dict[url[2]].auth < 2) {
            fb.dict[url[2]][!ss.edit] = fb.dict[url[2]].auth ? '' : d;
        };
        updateDoc(fb.html, fb.dict);
    };
    if (!autosave) {
        section.classList.remove('e-s');
        article.classList.remove('e-a');
        setData(de(fb.dict[url[2]][ss.edit]));
        if (ss.prp) {
            fval(u.prp, false);
        }
    }
    callback();
}

function del(callback = setData) {
    if (confirm('삭제하시겠습니까?')) {
        delete fb.dict[url[2]];
        var new_dict = {}
        new_dict[url[2]] = deleteField();
        updateDoc(fb.html, new_dict);
        callback(getData(ss.log));
        if (!Object.keys(fb.dict).length) {
            deleteDoc(fb.html);
            fb.dict = undefined;
        }
    }
}

function signin() {
    signInWithEmailAndPassword(auth, $('#id').value, $('#pw').value)
        .then(u => {
            ss.uid = u.user.uid;
            ss.log = true;
            location.reload();
        }).catch((e) => {
            if (e.code.split('/')[1] == 'invalid-email') {
                $('.fa-at').style.color = '#e76c6c';
                setTimeout(() => { $('.fa-at').style.color = ''; }, 1000);
            } else {
                $('.fa-ban').style.color = '#e76c6c';
                setTimeout(() => { $('.fa-ban').style.color = ''; }, 1000);
            }
        });
}

function signout() {
    signOut(auth).then(() => {
        alert('로그아웃 되었습니다.');
        location.reload();
        ss.uid = null;
        ss.log = false;
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
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

window.save = save;
window.edit = edit;
window.del = del;
window.signin = signin;
window.signout = signout;
window.makeChart = makeChart;
window.collection = collection;
window.getDocs = getDocs;
window.getDoc = getDoc;
window.uploadImg = uploadImg;
window.deleteImg = deleteImg;