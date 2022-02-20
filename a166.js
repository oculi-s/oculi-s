const fbc = { apiKey: "AIzaSyAuuLVy94PUS8YtEfhibbtHewCsrImhhfM", authDomain: "futures-1dff5.firebaseapp.com", databaseURL: "https://futures-1dff5-default-rtdb.firebaseio.com", projectId: "futures-1dff5", storageBucket: "futures-1dff5.appspot.com", messagingSenderId: "204808828169", appId: "1:204808828169:web:6af7aac7a9966fa6854fd8", measurementId: "G-2GV70QZBQ2" };

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js';
import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import 'https://code.highcharts.com/es-modules/masters/modules/data.src.js';

initializeApp(fbc);
window.db = getFirestore();
window.st = getStorage();
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;
FileList.prototype.forEach = Array.prototype.forEach;

const auth = getAuth();
const ls = localStorage;
const ss = sessionStorage;
const de = decodeURI;
const en = encodeURI;
const fb = { 'srce': '', 'html': '', 'dict': '', 'user': '', 'from': {}, 'img': [], 'csv': [] };
const is = { 'code': en('</code>'), 'csv': RegExp('.csv'), 'img': RegExp('.gif|.png|.jpg|.jpeg|.pdf|.webp'), 'vid': RegExp('.mp4|.mov') };
const head = document.head;
const body = document.body;
const css_load = `z-index:5; position: fixed; width:100%; height:100%; background: #0d1117; left:0; top:0; transition:ease .5s`;
const css_gif = `position:absolute; width:100px; height:100px; top:calc(50% - 50px); left:calc(50% - 50px);`;
const trv_opt = (id) => { return { "autosize": true, "symbol": id, "interval": "D", "theme": "dark", "locale": "kr", "enable_publishing": false, "save_image": false, "container_id": id, "hide_top_toolbar": true } }
body.innerHTML = `<load style="${css_load}"><img src='/main.gif' style="${css_gif}"></load>`;
body.innerHTML += `<nav></nav><section><article></article></section><aside></aside><clip></clip>`;
body.onresize = wresize;
document.title = '불로구';

const nav = $('nav');
const section = $('section');
const aside = $('aside');
const u = {};
u.prp = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
u.trv = 'https://s3.tradingview.com/tv.js';

head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">`;
head.innerHTML += `<link rel="shortcut icon" type="image/x-icon" href="/main.gif"/>`

if (!('mchangeWidth' in ss)) {
    ss.mchangeWidth = 0;
}
if (!('clipBoard' in ss)) {
    ss.clipBoard = JSON.stringify({ 'index': -1 });
}

function wresize() {
    if (/Android|iPhone|ipad|iPod/.test(navigator.platform)) {
        section.classList.add('m-s');
        aside.classList.add('m-a');
        nav.classList.add('m-n');
    } else if (!section.classList.contains('m-s')) {
        if (section.offsetLeft < (nav.offsetLeft + nav.offsetWidth)) {
            if (!ss.mchangeWidth) {
                ss.mchangeWidth = innerWidth;
            }
            section.classList.add('m-s');
            aside.classList.add('m-a');
            nav.classList.add('m-n');
        }
    } else if (innerWidth > ss.mchangeWidth) {
        if (innerWidth < ss.mchangeWidth) {
            ss.mchangeWidth = innerWidth;
        }
        section.classList.remove('m-s');
        aside.classList.remove('m-a');
        nav.classList.remove('m-n');
    }
}

var article = '';
var url = '';
(async() => {
    url = de(location.pathname).toLowerCase().split('/').slice(1).filter(e => e !== '');
    url.push('index', 'index', 'index');
    url = url.slice(0, 3);
    body.classList.add(url[0]);
    console.log(url);

    ls.edit = true;
    if (!('uid' in ls)) { ls.log = false, ls.uid = null; }
    fval(u.trv);
    loadStorage();

    fb.srce = await getDoc(doc(db, fbc.authDomain.includes('sample') ? 'sample' : 'index', 'source'));
    fb.srce = fb.srce.data();
    fb.user = await getDoc(doc(db, 'user', ls.uid));
    fb.user = fb.user.data();
    head.innerHTML += de(fb.srce.css.true);
    wresize();

    if (fb.user) {
        nav.innerHTML = de(fb.srce.nav[ls.log]);
        aside.innerHTML = de(fb.srce.aside[ls.log]);
        if (ls.uid != 'null' && ls.uid != 'undefined') {
            $('aside>p').innerHTML = auth.currentUser.email;
        }
    } else {
        body.innerHTML = '';
        signout();
    }

    fb.html = doc(db, url[0], url[1]);
    fb.dict = await getDoc(fb.html);
    fb.dict = fb.dict.data();
})().then(() => {
    var portal = document.createElement('portal');
    for (var i = 0; i < url.length; i++) {
        if (url[i] != 'index') {
            portal.innerHTML += `/<a href=/${url.slice(0, i + 1).join('/')}/>${url[i]}</a>`;
        }
    }
    section.append(portal);
    section.innerHTML += de(fb.srce.es[fb.user.auth]);

    article = $('article');
    setData(getData(ls.log));
    if (ls.prp) { fval(u.prp); }
    head.innerHTML += de(fb.srce.prps[ls.prp]);
    unload();
}).then(() => {
    document.onkeydown = e => {
        if (e.ctrlKey && e.keyCode == 69) {
            e.preventDefault();
            edit();
        }
    }
}).catch(e => {
    unload();
    $('article').innerText = `\n${e.stack}\n\n${$('script[type=module]').src}`;
    throw e;
});

function unload() {
    $('load').style.opacity = 0;
    setTimeout(() => { $('load').remove(); }, 500);
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
            ls.prp = r.includes(is.code);
            return de(r);
        } else {
            return de(fb.srce.create.true);
        }
    } else {
        return de(fb.srce.create.true);
    }
}

function setScript(script) {
    script.forEach(scr => {
        if (scr.src) {
            fval(scr.src, false);
        } else {
            eval(scr.innerText);
        }
    });
}

function setData(index) {
    var e = document.createElement('html')
    e.innerHTML = index.replaceAll('\u00a0', ' ');
    var scrsrc = e.$$('script[src]');
    var script = e.$$('script:not([src])');
    scrsrc.forEach(scr => { scr.remove() });
    script.forEach(scr => { scr.remove() });
    article.innerHTML = e.innerHTML;
    setIndex();
    setFold();
    setMenu();
    setImage();
    setScript(script);
    setCode();
    setChart();
    if (location.hash) { location.href = location.hash; }
    section.classList.remove('e-s');
    article.classList.remove('e-a');
}

function setMenu() {
    if ($('from')) {
        $$('from').forEach(async e => {
            var name = e.getAttribute('name').toLowerCase();
            e.onclick = () => { e.classList.toggle('view'); }
            if (name in fb.from) {
                var d = fb.from[name];
            } else {
                var d = await getDoc(doc(db, 'from', name));
                if (d) {
                    d = d.data();
                    if (d) {
                        d = de(d.index.true);
                        fb.from[name] = d;
                    } else {
                        e.innerHTML = name;
                    }
                } else {
                    e.innerHTML = name;
                }
            }
            var t = document.createElement('div');
            t.classList.add('from');
            t.innerHTML = d;
            var h1 = t.$('h1');
            if (h1) {
                h1.remove();
                h1 = h1.innerHTML;
            }
            e.innerHTML = `<a href=/from/${name}/><b>${h1 ? h1 : e.innerHTML}</b></a>`;
            e.after(t);
        })
    }
    if (url[0] == 'drug') {
        if ($('pubchem')) {
            var i = document.createElement('iframe');
            i.src = `https://pubchem.ncbi.nlm.nih.gov/compound/${url[1]}#section=3D-Conformer&embed=true`
            $('pubchem').append(i);
        }
    }
}

function setFold() {
    if ($('h1')) {
        var f = $('h1').dataset.fold;
        var b = $('h1').dataset.blind;
        $$(`article>*:not(index) ${f}, article>${f}`).forEach((e) => {
            e.onclick = () => { e.classList.toggle('fold') };
            e.classList.add('foldable');
        })
        $$(`article>*:not(index) ${b}, article>${b}`).forEach((e) => {
            e.classList.add('blind');
        })
    }
}

function setCode() {
    if (ls.prp && $('code')) {
        var but = document.createElement('button');
        but.innerText = 'Compile';
        but.onclick = () => {
            var form = document.createElement('form');
            var text = document.createElement('textarea');
            text.name = 'initScript';
            text.value = $('code').innerText.trim().replaceAll('\u00a0', ' ');
            form.action = 'https://www.jdoodle.com/api/redirect-to-post/c-online-compiler';
            form.method = 'POST';
            form.target = '_blank';
            form.append(text);
            article.append(form);
            form.submit();
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
        if (H.length) {
            indexing('', 1, 0);
            H.forEach(e => {
                temp += `<${e.tagName}><a href="#${e.id}">${e.tid}</a> ${e.innerText}</${e.tagName}>`
                e.innerHTML = `<a href="#">${e.tid}</a> ` + e.innerHTML;
            });
        }
        $('index').innerHTML = temp;
    }
}

function loadStorage() {
    listAll(ref(st, url.join('/'))).then(strg => {
        if (strg) {
            if (url[0] != 'life') {
                strg.items.forEach(async e => { e.src = await getDownloadURL(e) });
            }
            fb.img = strg.items.filter(e => is.vid.test(e.name) || is.img.test(e.name));
            fb.csv = strg.items.filter(e => is.csv.test(e.name));
        }
    }).catch(e => {
        var exc = document.createElement('exc');
        exc.className = 'far fa-image r';
        section.prepend(exc);
        throw e;
    });
}

function setImage() {
    $$('img').forEach(e => {
        e.onclick = () => {
            e.classList.toggle("show");
            body.classList.toggle("blur");
        };
    })
    $$('blind, .blind').forEach(b => {
        var el = b.nextElementSibling;
        b.onclick = async() => {
            if (!el.src) {
                var il = fb.img.filter(e => e.name == el.name);
                if (il.length) {
                    el.src = await getDownloadURL(il[0]);
                }
            }
            el.childNodes.forEach(async el => {
                if (!el.src) {
                    var il = fb.img.filter(e => e.name == el.name);
                    if (il.length) {
                        el.src = await getDownloadURL(il[0]);
                    }
                }
            });
            b.classList.toggle('view');
        }
    });
    if (url[0] != 'life') {
        fb.img.forEach(async e => {
            var el = $(`*[name="${e.name}"]`);
            if (el) {
                if (!e.src) {
                    e.src = await getDownloadURL(e);
                }
                el.src = e.src;
                if (el.tagName.toLowerCase() == 'iframe') {
                    el.setAttribute('scrolling', 'no')
                    var wrap = document.createElement('div');
                    var full = document.createElement('full');
                    wrap.innerHTML = el.outerHTML;
                    full.className = 'fas fa-expand';
                    full.onclick = () => {
                        wrap.firstChild.classList.toggle("show");
                        body.classList.toggle("blur");
                    }
                    wrap.append(full);
                    wrap.style.position = 'relative';
                    wrap.style.width = 'fit-content';
                    el.replaceWith(wrap);
                }
            }
        });
    }
}

function createFile(e) {
    var p = document.createElement('p');
    var btn = document.createElement('button');
    p.setAttribute('name', e.name);
    p.style.color = de(fb.dict[url[2]].true).includes(e.name) ? "#aaa" : "#fff";
    p.onclick = () => {
        if (is.vid.test(e.name)) {
            navigator.clipboard.writeText(`<video autoplay muted name="${e.name.trim()}">`);
        } else if (is.img.test(e.name)) {
            navigator.clipboard.writeText(`<img name="${e.name.trim()}">`);
        } else if (is.csv.test(e.name)) {
            navigator.clipboard.writeText(`<chart type=line title=${e.name.split('.')[0]}></chart>`);
        }
        p.style.color = "#aaa";
    };
    p.innerText = e.name;
    btn.onclick = () => {
        if (confirm('삭제하시겠습니까?')) {
            deleteObject(ref(st, `${url.join('/')}/${e.name}`)).then(() => { p.remove() });
        }
        if (is.csv.test(e.name)) {
            fb.csv = fb.csv.filter(csv => csv.name != e.name);
        } else {
            fb.img = fb.img.filter(img => img.name != e.name);
        }
    }
    btn.classList.add('far', 'fa-trash-alt');
    p.append(btn);
    return p;
}

function setFileEdit() {
    if ($('#img')) {
        $('#img>div').innerHTML = '';
        fb.img.forEach(e => { $('#img>div').append(createFile(e)) })
        fb.csv.forEach(e => { $('#img>div').append(createFile(e)) })
    }
}

function uploadFile() {
    $('article input').files.forEach(e => {
        uploadBytes(ref(st, `${url.join('/')}/${e.name}`), e).then((file) => {
            $('#img>div').prepend(createFile(e));
            if (is.csv.test(e.name)) {
                fb.csv[fb.csv.length] = file.metadata.ref;
            } else {
                fb.img[fb.img.length] = file.metadata.ref;
            }
        });
    });
    $('article input').value = '';
}

function csvParse(s, d = ',') {
    var p = new RegExp((
        "(\\" + d + "|\\r?\\n|\\r|^)" +
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        "([^\"\\" + d + "\\r\\n]*))"
    ), "gi");
    var arr = [
        []
    ];
    var tarr;
    while (tarr = p.exec(s)) {
        var sd = tarr[1];
        var v;
        if (sd.length && sd !== d) { arr.push([]); }
        if (tarr[2]) {
            v = tarr[2].replace(new RegExp("\"\"", "g"), "\"");
        } else {
            v = tarr[3];
        }
        arr[arr.length - 1].push(v);
    }
    return arr;
}

function setChart() {
    fb.csv.forEach(async raw => {
        var e = $(`*[name="${raw.name}"]`);
        if (e) {
            var d = e.parentElement.clientWidth;
            e.id = raw.name;
            raw = await getDownloadURL(raw);
            raw = await fetch(raw);
            raw = await raw.text();
            if (e.tagName == 'TBL') {
                var arr = csvParse(raw);
                var t = document.createElement('table');
                var m = arr[0].length;
                for (var i = 0; i < arr.length; i++) {
                    var tr = document.createElement('tr');
                    for (var j = 0; j < m; j++) {
                        tr.innerHTML += `<t${i == 0 || j == 0 ? 'h' : 'd'}>${arr[i][j]}</t${i == 0 || j == 0 ? 'h' : 'd'}>`;
                    }
                    t.append(tr);
                }
                e.append(t);
            } else {
                Highcharts.chart(e.id, {
                    chart: {
                        type: e.type,
                        width: 400 < d ? 400 : d
                    },
                    title: { text: e.title },
                    data: { csv: raw },
                    legend: {
                        enabled: false,
                        layout: 'vertical',
                        align: 'right'
                    },
                    plotOptions: {
                        series: {
                            stacking: e.stack == '1' ? 'normal' : '',
                            dataLabels: { enabled: true }
                        },
                        column: { stacking: 'normal', dataLabels: { enabled: true } },
                    }
                });
            }
        }
    })
    $$('trv').forEach(e => {
        e.id = e.getAttribute('name');
        new TradingView.widget(trv_opt(e.id));
    });
}

function insert_text(sel, s) {
    var range = sel.getRangeAt(0);
    var node = document.createTextNode(s);
    sel.deleteFromDocument();
    range.insertNode(node);
    range.setStartAfter(node);
    sel.removeAllRanges();
    sel.addRange(range);
}

function edit() {
    $$('input[name="type"]').forEach(e => { e.onclick = () => { ls.edit = e.value, $('edit').innerText = getData(e.value); } });
    article.innerHTML = `<edit data-eng="false" contenteditable=true></edit>${de(fb.srce.file.true)}`;
    $('edit').innerText = getData(ls.edit);
    section.classList.add('e-s');
    article.classList.add('e-a');
    var autosave = setInterval(save, 60 * 1000, true);
    var autostop = setTimeout(() => { clearInterval(autosave), save(0) }, 5 * 60 * 1000);
    $('edit').focus();
    setFileEdit();
    $('edit').onkeydown = e => {
        clearTimeout(autostop);
        autostop = setTimeout(() => { clearInterval(autosave), save(0) }, 5 * 60 * 1000);
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault();
            save();
            clearInterval(autosave);
            clearTimeout(autostop);
        } else if (e.keyCode == 9) {
            e.preventDefault();
            insert_text(getSelection(), '\u00a0\u00a0\u00a0\u00a0');
        }
        if (/Win|iPhone|ipad|iPod/.test(navigator.platform)) {
            if (e.ctrlKey && [67, 88].includes(e.keyCode)) {
                var sel = getSelection();
                var d = sel.toString();
                if (d.length) {
                    var clip = JSON.parse(ss.clipBoard);
                    var t = document.createElement('p');
                    t.innerText = d;
                    t.onclick = () => { navigator.clipboard.writeText(t.innerText); }
                    clip[++clip.index] = d;
                    clip.index %= 5;
                    $('clip').append(t);
                    if ($('clip').childNodes.length > 5) {
                        $('clip').firstChild.remove();
                    }
                    ss.clipBoard = JSON.stringify(clip);
                }
            }
            if (e.altKey && e.keyCode == 86) {
                var r = getSelection().getRangeAt(0).getBoundingClientRect();
                $('clip').classList.toggle('clip');
                $('clip').style.top = r.bottom;
                $('clip').style.left = r.right;
            }
        }
    }
}

function saved(as) {
    if (!as) {
        section.classList.remove('e-s');
        article.classList.remove('e-a');
        setData(de(fb.dict[url[2]][ls.edit]));
        if (ls.prp) {
            fval(u.prp, false);
        }
    }
    $('es>div>span').className = 'b';
    setTimeout(() => { $('es>div>span').className = '' }, 1000);
}

function clipbImg(as) {
    if ($('edit img')) {
        var farray = fb.img.concat(fb.csv);
        $$('edit img').forEach(e => {
            if (!e.name) {
                var i;
                for (i = 0; i <= farray.length; i++) {
                    if (farray.filter(t => t.name == `img${i}.png`).length == 0) {
                        e.setAttribute('name', `img${i}.png`);
                        break;
                    }
                }
                fetch(e.src)
                    .then(r => r.blob())
                    .then(r => {
                        uploadBytes(ref(st, `${url.join('/')}/${e.name}`), r)
                            .then(async f => {
                                f = f.metadata.ref;
                                f.src = await getDownloadURL(f);
                                fb.img[fb.img.length] = f;
                                $(`*[name="${e.name}"]`).src = f.src;
                            })
                    })
            };
            if (!as) {
                e.outerText = `<img name=${e.name}>`;
            }
        })
    }
}

function save(as = false) {
    clipbImg(as);
    var d = en($('edit').innerText);
    if (fb.dict == undefined) {
        fb.dict = {};
        fb.dict[url[2]] = { auth: 1, true: d, false: '' };
        setDoc(fb.html, fb.dict).then(() => { saved(as); })
    } else {
        if (!fb.dict[url[2]]) {
            fb.dict[url[2]] = { auth: 1 };
        }
        fb.dict[url[2]][ls.edit] = d;
        if (fb.dict[url[2]].auth == 1) {
            fb.dict[url[2]][!ls.edit] = '';
        }
        updateDoc(fb.html, fb.dict).then(() => { saved(as); })
    }
}

function del() {
    if (confirm('삭제하시겠습니까?')) {
        delete fb.dict[url[2]];
        var new_dict = {}
        new_dict[url[2]] = deleteField();
        updateDoc(fb.html, new_dict).then(() => { setData(getData(ls.log)); });
        if (!Object.keys(fb.dict).length) {
            deleteDoc(fb.html);
            fb.dict = undefined;
        }
        listAll(ref(st, url.join('/'))).then(strg => {
            if (strg) {
                strg.items.forEach(async e => { deleteObject(ref(st, `${url.join('/')}/${e.name}`)) });
                fb.img = [];
                fb.csv = [];
            }
        })
    }
}

function signin() {
    signInWithEmailAndPassword(auth, $('#id').value, $('#pw').value)
        .then(u => {
            ls.uid = u.user.uid;
            ls.log = true;
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
        location.href = '/' + (fbc.authDomain.includes('sample') ? 'sample' : '');
        ls.clear();
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
}

window.save = save;
window.edit = edit;
window.del = del;
window.signin = signin;
window.signout = signout;
window.collection = collection;
window.getDocs = getDocs;
window.getDoc = getDoc;
window.uploadFile = uploadFile;