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
    const fb = { 'srce': '', 'html': '', 'dict': '', 'user': '', 'img': '' };
    const iscode = en('</code>');
    const head = document.head;
    const body = document.body;
    const uprp = 'https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js';


    head.innerHTML += `<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no" />`;
    head.innerHTML += `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">`;
    head.innerHTML += `<title>불로구</title><link rel="shortcut icon" type="image/x-icon" href="/main.png"/>`
    body.innerHTML = '<nav></nav><section><article></article></section><aside></aside>';
    body.onresize = wresize;

    const nav = $('nav');
    const section = $('section');
    const aside = $('aside');

    var article = ''
    var url = de(location.pathname).toLowerCase().split('/').slice(1).filter(e => e !== '');
    while (url.length < 3) { url.push('index'); };
    console.log(url);

    (async () => {
        loadImgList();
        fb.srce = await getDoc(doc(db, 'index', 'source'));
        fb.srce = fb.srce.data();
        head.innerHTML += de(fb.srce.css.true);
        nav.innerHTML = de(fb.srce.nav[ss.log]);
        aside.innerHTML = de(fb.srce.aside[ss.log]);
        wresize();
        if (ss.uid != 'null' && ss.uid != 'undefined') {
            $('aside>span').innerHTML = auth.currentUser.email;
        }
        fb.html = doc(db, url[0], url[1]);
        fb.dict = await getDoc(fb.html);
        fb.dict = fb.dict.data();
        fb.user = await getDoc(doc(db, 'user', ss.uid));
        fb.user = fb.user.data();
    })().then(() => {
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && (e.key == 'e' || e.key == 'ㄷ')) {
                e.preventDefault();
                edit();
            }
        });
        document.addEventListener('unload', e => { ss.clear(); });
    }).then(() => {
        var portal = document.createElement('portal');
        for (var i = 0; i < url.length; i++) {
            if (url[i] != 'index') {
                portal.innerHTML += `/<a href=/${url.slice(0, i + 1).join('/')}/>${url[i]}</a>`;
            }
        }
        section.append(portal);
        section.innerHTML += de(fb.srce.editsave[fb.user.auth]);

        article = $('article');
        ss.edit = true;
        if (!('uid' in ss)) {
            ss.log = false;
        }
        setData(getData(ss.log));
        if (ss.prp) {
            fval(uprp);
        }
        head.innerHTML += de(fb.srce.prps[ss.prp]);
    }).then(() => {
        if (location.hash) {
            location.href = location.hash;
        }
    }).catch(e => {
        body.innerText = `\n${e.stack}\n\n${$('script[type=module]').src}`;
        throw e;
    });

    function fval(src) {
        fetch(src)
            .then(r => { return r.text() })
            .then(r => eval(`(async()=>{${r}})()`));
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

    function setData(index) {
        var e = document.createElement('html')
        e.innerHTML = index;
        var script = e.querySelectorAll('script');
        script.forEach(scr=>e.remove(scr));
        article.innerHTML = e;
        script.forEach(scr=>{
            if (scr.src){
                fval(scr.src);
            }else{
                eval(scr);
            }
        })
        // if (index.includes('<script')) {
        //     index = index.split('</script>');
        //     for (var i = 0; i < index.length; i++) {
        //         if (index[i].includes('<script>')) {
        //             script.push(index[i].replace('<script>', ''));
        //         } else if (index[i].includes('<script ')) {
        //             var src = index[i].split('src=')[1].split('>')[0];
        //             fval(src);
        //         } else {
        //             article.innerHTML = index[i];
        //         }
        //     }
        //     for (var i = 0; i < script.length; i++) {
        //         eval(script[i]);
        //     }
        // } else {
        //     article.innerHTML = index;
        // }
        setIndex();
        setFold();
        setImage();
    }

    function setFold() {
        if ($('h1')) {
            $$(`article>${$('h1').dataset.fold}`).forEach((e) => {
                e.onclick = () => { e.classList.toggle('fold') };
                e.classList.add('foldable');
            })
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

    function setImage() {
        fb.img.forEach(async e => {
            var el = $(`img[name="${e.name}"]`);
            if (el) {
                var imgLink = await getDownloadURL(e);
                el.src = imgLink;
                el.setAttribute('onclick', `this.classList.toggle("show");$('body').classList.toggle("blur")`);
            }
        })
    }

    async function loadImgList(reload = true) {
        if (reload) {
            fb.img = await listAll(ref(st, url.join('/')));
            fb.img = fb.img.items;
        }
        if ($('#img')) {
            $('#img>div').innerHTML = '';
            fb.img.forEach(e => {
                $('#img>div').innerHTML += `
                <p onclick=navigator.clipboard.writeText(this.innerText) style='color:${de(fb.dict[url[2]].true).includes(e.name) ? "#aaa" : "#fff"};'>
                ${e.name}
                <button onclick=deleteImg('${e.name}') class="far fa-trash-alt"></button></p>`
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

    function edit() {
        ss.edit = $('input[name="type"]:checked').value;
        article.innerHTML = `<edit contenteditable=true></edit>`;
        article.classList.add('e-a');
        $('edit').innerText = getData(ss.edit);
        article.innerHTML += de(fb.srce.img.true);
        loadImgList(false);
        $('edit').focus();
        $('edit').addEventListener('keydown', e => {
            if (e.ctrlKey && (e.key === 's' || e.key == 'ㄴ')) {
                e.preventDefault();
                save();
            };
        });
    }

    function save() {
        article.classList.remove('e-a');
        var d = en($('edit').innerText);
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
        setData(de(fb.dict[url[2]][ss.edit]));
        if (ss.prp){
            fval(uprp);
        }
    }

    function del() {
        if (confirm('삭제하시겠습니까?')) {
            delete fb.dict[url[2]];
            updateDoc(fb.html, fb.dict);
            if (Object.keys(fb.dict).length == 0) {
                deleteDoc(fb.html);
            }
            article.innerHTML = de(fb.srce.create.true);
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
            location.href = '/';
            ss.uid = null;
            ss.log = false;
        }).catch((e) => {
            alert('로그인 정보가 없습니다.');
        });
    }

    function wresize() {
        var mchangeWidth = 0;
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

    window.save = save;
    window.getData = getData;
    window.setData = setData;
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