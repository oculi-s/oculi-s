var fbc = await fetch(`${location.pathname.split('/')[1] == 'sample' ? '/sample' : ''}/fbc.json`);
var fbc = await fbc.json();

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, deleteField } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-firestore.js';
import { getStorage, ref, listAll, getMetadata, getDownloadURL, uploadBytes, deleteObject } from 'https://www.gstatic.com/firebasejs/9.4.1/firebase-storage.js';
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
window.fb = { 'srce': '', 'html': '', 'dict': '', 'user': '', 'from': {}, 'img': {}, 'csv': {} };
const is = { 'sample': fbc.authDomain.includes('sample') ? '/sample' : '', 'code': en('</code>'), 'csv': RegExp('.csv'), 'img': RegExp('.gif|.png|.jpg|.jpeg|.pdf|.webp'), 'vid': RegExp('.mp4|.mov') };
const head = document.head;
const body = document.body;
const trv_opt = (id) => { return { "autosize": true, "symbol": id, "interval": "D", "theme": "dark", "locale": "kr", "enable_publishing": false, "save_image": false, "container_id": id, "hide_top_toolbar": true } }
if (ls.cMode == undefined) { ls.cMode = true; }
document.documentElement.setAttribute('cMode', ls.cMode);
const css_load = `z-index:5; position: fixed; width:100%; height:100%; background: ${ls.cMode == 'true' ? '#0d1117' : '#fff'}; left:0; top:0; transition:ease .5s`;
const css_gif = `position:absolute; width:100px; height:100px; top:calc(50% - 50px); left:calc(50% - 50px);`;

body.innerHTML = `<load style="${css_load}"><img src='${is.sample}/load_${is.sample ? 'main' : ls.cMode == 'true' ? 'dark' : 'light'}.gif' style="${css_gif}"></load>`;
body.innerHTML += `<nav></nav><section><article></article></section><aside></aside><clip></clip>`;
document.title = is.sample.length ? '불로구' : '블로그';

const nav = $('nav');
const section = $('section');
const aside = $('aside');
const clip = $('clip');
const u = {};
const kb = 1024;
u.prp = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';
u.trv = 'https://s3.tradingview.com/tv.js';

head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
head.innerHTML += `<link rel="shortcut icon" type="image/x-icon" href="${is.sample.length ? '/sample/main.png' : '/title.gif'}"/>`

if (ss.mchangeWidth == undefined) { ss.mchangeWidth = 0; }
if (ls.clipBoard == undefined) { ls.clipBoard = JSON.stringify({ 'index': 0 }); }
clip.onclick = () => { clip.classList.toggle('clip') }

var article;
var url;
(async() => {
    url = de(location.pathname).toLowerCase().split('/').slice(1).filter(e => e !== '');
    if (is.sample.length && url[0] == 'sample') { url = url.slice(1); }
    url.push('index', 'index', 'index');
    url = url.slice(0, 3);
    is.lazyload = url[0] == 'life';
    section.classList.add(url[0]);
    console.log(url);
    loadStorage();

    var c = JSON.parse(ls.clipBoard);
    for (var i = 0; i < 5; i++) {
        var j = (c.index + i) % 5;
        if (c[j] != undefined) {
            var p = document.createElement('p');
            p.innerText = c[j];
            clip.append(p);
        }
    }
    clip.childNodes.forEach(e => { e.onclick = () => { navigator.clipboard.writeText(e.innerText) } })

    ls.edit = true;
    if (ls.uid == undefined) { ls.log = false, ls.uid = null; }
    fval(u.trv);

    fb.srce = await getDoc(doc(db, is.sample.length ? 'sample' : 'index', 'source'));
    fb.srce = fb.srce.data();
    fb.user = await getDoc(doc(db, 'user', ls.uid));
    fb.user = fb.user.data();
    head.innerHTML += de(fb.srce.css.true);

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

    $('nav label').onclick = e => {
        ls.cMode = e.target.checked;
        document.documentElement.setAttribute('cMode', ls.cMode);
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
    unload();
    if (ls.prp) { fval(u.prp); }
    head.innerHTML += de(fb.srce.prps[ls.prp]);
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
    if ($('load')) {
        $('load').style.opacity = 0;
        setTimeout(() => { $('load').remove(); }, 500);
    }
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
    setMenu();
    setFold();
    setImage();
    setScript(script);
    setCode();
    setChart();
    if (location.hash) { location.href = location.hash; }
    section.classList.remove('e-s');
    article.classList.remove('e-a');
    clip.classList.remove('clip');
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
            e.innerHTML = `<a href=${is.sample}/from/${name}/><b>${h1 ? h1 : e.innerHTML}</b></a>`;
            e.after(t);
        })
    }
    if ($('pubchem')) {
        $$('pubchem').forEach(e => {
            var type = e.getAttribute('type');
            var name = e.getAttribute('name');
            if (!name) {
                name = url[1];
            }
            if (!type) {
                type = '3D-Conformer';
            }
            var i = document.createElement('iframe');
            i.src = `https://pubchem.ncbi.nlm.nih.gov/compound/${name}#section=${type}&embed=true`
            e.append(i);
        })
    }
}

function setFold() {
    if ($('h1')) {
        var f = $('h1').dataset.fold;
        var b = $('h1').dataset.blind;
        $$(`article>*:not(index) ${f}, article>${f}`).forEach(e => {
            e.onclick = () => { e.classList.toggle('fold') };
            e.classList.add('foldable');
        })
        $$(`article>*:not(index) ${b}, article>${b}`).forEach(e => {
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
            strg.items.forEach(async e => {
                if (is.vid.test(e.name) || is.img.test(e.name)) {
                    fb.img[e.name] = e;
                } else if (is.csv.test(e.name)) {
                    fb.csv[e.name] = e;
                }
                getMetadata(e).then(m => { e.meta = m; })
                if (!is.lazyload) {
                    getDownloadURL(e).then(u => { e.src = u; });
                }
            });
        }
    }).catch(e => {
        unload();
        var exc = document.createElement('exc');
        exc.className = 'far fa-image r';
        section.prepend(exc);
        throw e;
    });
}

function setImage() {
    $$('article img').forEach(e => {
        e.outerHTML = `<figure>${e.outerHTML}<figcaption>${e.getAttribute('title')}</figcaption></figure>`;
    });
    $$('article img').forEach(e => {
        e.onclick = () => {
            e.classList.toggle("show");
            body.classList.toggle("blur");
        };
    })
    $$('blind, .blind').forEach(b => {
        var el = b.nextElementSibling;
        b.onclick = async() => {
            if (!el.src) {
                if (el.name in fb.img) {
                    el.src = await getDownloadURL(fb.img[el.name]);
                }
            }
            el.childNodes.forEach(async el => {
                if (!el.src) {
                    if (el.name in fb.img) {
                        el.src = getDownloadURL(fb.img[el.name]);
                    }
                }
            });
            b.classList.toggle('view');
        }
    });
    if (!is.lazyload) {
        Object.values(fb.img).forEach(async e => {
            var el = $(`*[name="${e.name}"]`);
            if (el) {
                if (!e.src) {
                    e.src = await getDownloadURL(e);
                    el.src = e.src;
                } else {
                    el.src = e.src
                }
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
    var size = document.createElement('span');
    var name = e.name;
    var p = document.createElement('p');
    var span = document.createElement('span');
    var btn = document.createElement('button');
    p.setAttribute('name', name);
    if (fb.dict) {
        p.style.color = de(fb.dict[url[2]].true).includes(name) ? "#aaa" : "#fff";
    } else {
        p.style.color = "#aaa";
    }
    span.onclick = () => {
        if (is.vid.test(name)) {
            navigator.clipboard.writeText(`<video autoplay muted name="${name.trim()}">`);
        } else if (is.img.test(name)) {
            navigator.clipboard.writeText(`<img name="${name.trim()}">`);
        } else if (is.csv.test(name)) {
            navigator.clipboard.writeText(`<chart type=line title=${name.split('.')[0]}></chart>`);
        }
        p.style.color = "#aaa";
    };
    span.innerText = name;
    btn.onclick = () => {
        if (confirm('삭제하시겠습니까?')) {
            deleteObject(ref(st, `${url.join('/')}/${name}`)).then(() => {
                p.remove();
                delete fb.csv[name];
                delete fb.img[name];
                setFileStatus();
            });
        }
    }
    btn.classList.add('far', 'fa-trash-alt');
    if (e.meta) {
        size.innerText = numByte(e.meta.size);
    }
    p.append(span, size, btn);
    return p;
}

function numByte(s) {
    if (s > kb * kb) {
        return (s / (kb * kb)).toFixed(2) + ' MB';
    } else if (s > kb) {
        return (s / kb).toFixed(2) + ' KB';
    } else {
        return s.toFixed(2) + ' B';
    }
}

function uploadFile() {
    $('article input').files.forEach(e => {
        uploadBytes(ref(st, `${url.join('/')}/${e.name}`), e).then((file) => {
            $('#img>div').prepend(createFile(e));
            var f = file.metadata.ref;
            f.meta = file.metadata;
            if (is.csv.test(f.name)) {
                fb.csv[f.name] = f;
            } else {
                fb.img[f.name] = f;
            }
            setFileStatus();
        });
    });
    $('article input').value = '';
}

function clipbImg(as = true) {
    if ($('edit img')) {
        $$('edit img').forEach(e => {
            if (fb.img[e.name] == undefined) {
                e.removeAttribute('name');
            } else if (e.src != fb.img[e.name].src) {
                e.removeAttribute('name');
            } else if (!e.src) {
                e.removeAttribute('name');
            }
        });
        $$('edit img').forEach(e => {
            if (!e.name) {
                for (var i = 0; i <= Object.keys(fb.img).length; i++) {
                    if (fb.img[`img${i}.png`] == undefined) {
                        var name = `img${i}.png`;
                        e.setAttribute('name', name);
                        fb.img[name] = e;
                        $('#img>div').append(createFile(e));
                        break;
                    }
                }
                fetch(e.src)
                    .then(r => r.blob())
                    .then(r => {
                        uploadBytes(ref(st, `${url.join('/')}/${e.name}`), r)
                            .then(async f => {
                                var r = f.metadata.ref;
                                r.meta = f.metadata;
                                r.src = await getDownloadURL(r);
                                fb.img[r.name] = r;
                                $(`*[name="${e.name}"]`).src = r.src;
                                setFileStatus();
                            })
                    })
                e.setAttribute('from', 'false');
            };
            if (!as) {
                e.removeAttribute('src');
                e.parentNode.innerText = e.parentNode.innerHTML;
            }
        })
    }
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
    Object.values(fb.csv).forEach(async raw => {
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
                var o = {
                    chart: {},
                    title: {},
                    data: {},
                    legend: { enabled: false, layout: 'vertical', align: 'right' },
                    plotOptions: {
                        series: { dataLabels: { enabled: true } },
                        column: { stacking: 'normal', dataLabels: { enabled: true } },
                        pie: { dataLabels: { enabled: true, distance: -50, } }
                    }
                }
                o.chart.type = e.getAttribute('type');
                o.title.text = e.getAttribute('title');
                o.data.csv = raw;
                o.plotOptions.stacking = e.getAttribute('stack') == '1' ? 'normal' : '';
                Highcharts.chart(e.id, o);
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

function setFileEdit() {
    if ($('#img')) {
        $('#img>div').innerHTML = '';
        Object.values(fb.img).forEach(e => { $('#img>div').append(createFile(e)) })
        Object.values(fb.csv).forEach(e => { $('#img>div').append(createFile(e)) })
    }
}

function setFileStatus() {
    $('status').innerText = '';
    var div = document.createElement('div');
    var sum = 0;
    if (Object.keys(fb.img).length) {
        sum += Object.values(fb.img).map(e => e.meta.size).reduce((a, b) => a + b);
    }
    if (Object.keys(fb.csv).length) {
        sum += Object.values(fb.csv).map(e => e.meta.size).reduce((a, b) => a + b);
    }
    var perc = sum / (50 * kb * kb);
    $('status').innerText = `${numByte(sum)} / 50MB (${(perc * 100).toFixed(1)}%)`;
    div.style.width = `${perc * $('status').clientWidth}px`;
    $('status').append(div);
}

var autosave;
var autostop;

function edit() {
    body.classList.remove('blur');
    $$('input[name="type"]').forEach(e => { e.onclick = () => { ls.edit = e.value, $('edit').innerText = getData(e.value); } });
    article.innerHTML = `<edit contenteditable=true></edit>${de(fb.srce.file.true)}`;

    getData(ls.edit).split(/\n/).forEach(e => {
        var p = document.createElement('p');
        p.innerText = e;
        var t = document.createElement('p');
        t.innerHTML = e;
        if (t.$('img')) {
            if (!is.lazyload) {
                var img = t.$('img');
                if (img.getAttribute('name')) {
                    if (img.name && img.name in fb.img) {
                        img.src = fb.img[img.name].src;
                    }
                    t.onclick = () => {
                        if (t.innerText) {
                            t.innerHTML = t.innerText;
                        } else {
                            t.innerText = t.innerHTML;
                        }
                    }
                    $('edit').append(t);
                } else {
                    $('edit').append(p);
                }
            } else {
                $('edit').append(p);
            }
        } else if (e.length) {
            $('edit').append(p);
        }
    })
    section.classList.add('e-s');
    article.classList.add('e-a');
    setFileEdit();
    setFileStatus();

    var autosave = setInterval(save, 60 * 1000, true);
    var autostop = setTimeout(() => { clearInterval(autosave), save(0) }, 5 * 60 * 1000);
    $('edit').focus();
    $('edit').oninput = e => {
        clearTimeout(autostop);
        autostop = setTimeout(() => { clearInterval(autosave), save(0) }, 5 * 60 * 1000);
    }
    $('edit').onkeydown = e => {
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault();
            save();
            clearInterval(autosave);
            clearTimeout(autostop);
        } else if (e.keyCode == 9) {
            e.preventDefault();
            insert_text(getSelection(), '\u00a0\u00a0\u00a0\u00a0');
        } else if (e.altKey && e.keyCode == 86) {
            if (/mac|iPhone|ipad|iPod/i.test(navigator.platform)) {
                e.preventDefault();
                var r = getSelection().getRangeAt(0).getBoundingClientRect();
                clip.classList.toggle('clip');
                clip.style.top = r.bottom;
                clip.style.left = r.right;
            }
        }
    }
    if (/mac|iPhone|ipad|iPod/i.test(navigator.platform)) {
        $('edit').oncopy = addClip;
        $('edit').oncut = addClip;
    }
    $('edit').onkeyup = e => {
        if ((e.ctrlKey || e.metaKey) && e.keyCode == 86) {
            clipbImg();
        }
    }
}

function addClip() {
    var d = window.getSelection().toString();
    if (d.length) {
        var s = JSON.parse(ls.clipBoard);
        var p = document.createElement('p');
        p.innerText = d;
        p.onclick = () => { navigator.clipboard.writeText(d); }
        s[s.index] = d;
        s.index = (s.index + 1) % 5;
        clip.append(p);
        if (clip.childNodes.length > 5) {
            clip.firstChild.remove();
        }
        ls.clipBoard = JSON.stringify(s);
    }
}

function saved(as) {
    if (!as) {
        clearInterval(autosave);
        clearTimeout(autostop);
        section.classList.remove('e-s');
        article.classList.remove('e-a');
        setData(de(fb.dict[url[2]][ls.edit]));
        if (ls.prp) { fval(u.prp, false); }
    }
    $('es>div>span').className = 'b';
    setTimeout(() => { $('es>div>span').className = '' }, 1000);
}

function save(as = false) {
    if ($('edit')) {
        clipbImg(as);
        var d = en($('edit').innerText);
        d = d.replaceAll("&alpha;", "α").replaceAll("&beta;", "β").replaceAll("&gamma;", "γ").replaceAll("&delta;", "δ");
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
}

function del() {
    if (confirm('삭제하시겠습니까?')) {
        clearInterval(autosave);
        clearTimeout(autostop);
        if (fb.dict) {
            delete fb.dict[url[2]];
            var new_dict = {}
            new_dict[url[2]] = deleteField();
            updateDoc(fb.html, new_dict).then(() => { setData(getData(ls.log)); });
            if (!Object.keys(fb.dict).length) {
                deleteDoc(fb.html);
                fb.dict = undefined;
            }
        } else {
            setData(getData(ls.log));
        }
        listAll(ref(st, url.join('/'))).then(strg => {
            if (strg) {
                strg.items.forEach(async e => { deleteObject(ref(st, `${url.join('/')}/${e.name}`)) });
                fb.img = {};
                fb.csv = {};
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
        location.href = '/' + (is.sample ? 'sample' : '');
        ls.clear();
        ss.clear();
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