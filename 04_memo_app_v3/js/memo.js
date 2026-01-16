"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {
            viewStorage(); //viewStorageからのデータ取得とテーブルへ表示
            saveLocalStorage();//localStorageへの保存
            delLocalStorage();//localStorageから1件削除
            allClearLocalStorage();//localStorageから全て削除
            selectTable(); //5.データ選択
        }
    }, false
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"//タイトルをここに設定
                    , html: "Key,Memoはいずれも必須です。"//メッセージ内容をここに設定
                    , type: "error"//ダイアログにアイコンを表示したい場合に設定する引数 warning,error,success,info,question
                    , allowOutsideClick: false //枠外クッリクは許可しない
                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存(save)しますか？";
                Swal.fire({
                    title: "Memo app"//タイトルをここに設定
                    , html: w_msg //メッセージ内容をここに設定
                    , type: "question"//ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                    , showCancelButton: true//キャンセルボタンの表示
                }).then(function (result) {
                    //確認ダイアログで[OK]を押されたとき、保存する
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage(); //viewStorageからのデータ取得とテーブルへ表示
                        let w_msg = "LocalStorageに " + key + " " + value + " を保存(save)しました。";
                        Swal.fire({
                            title: "Memo app"//タイトルをここに設定
                            , html: w_msg//メッセージ内容をここに設定
                            , type: "success"//ダイアログにアイコンを表示したい場合に設定する引数　warning,error,success,info,question
                            , allowOutsideClick: false//枠外クッリクは許可しない   
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};

//3.localStorageから選択されている行を削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox(del);
            if (w_cnt >= 1) {
                //const key = document.getElementById("textKey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = "LocalStorageから選択されている" + w_cnt + "件を削除(delete)しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_confirm
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage(); //viewStorageからのデータ取得とテーブルへ表示
                        let w_msg = "LocalStorageから " + w_cnt + " を削除（delete）しました！";
                            Swal.fire({
                                title: "Memo app"
                                , html: w_msg
                                , type: "success"
                                , allowOutsideClick: false
                            });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );

    //version-up5 add-str
    //クラス「.trash」を持つ（将来の）子のいずれかでクリックイベントが発生すると、
    //そのクリックイベントは
    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) => {
        if (e.target.classList.contains("trash") === true) {
            let index = e.target.parentNode.parentNode.rowIndex
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = "LocalStorageから\n「" + key + " " + value + "」\nを削除(delete)しますか？";
            Swal.fire({
                title: "Memo app",
                html: w_delete,
                type: "question",
                showCancelButton: true
            }).then(result => {
                if (result.value === true) {
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = "LocalStorageから " + key + " " + value + " を削除（delete）しました！";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
            //version-up5 add-end
        };
    });
};
//4.localStorageから全て削除
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = "LocalStoragのデータをすべて削除(all clear)します。\nよろしいですか?";
            //確認ダイアログでOKを押されたとき、すべて削除する。
            Swal.fire({
                title: "Memo app"
                , html: w_confirm
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value === true) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのをすべて削除(all clear)しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
}

//5.データ選択
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox(select);
        }, false
    );
};
//データ選択 table select
function selectCheckBox(mode) {
    //let w_sel = "0"; //選択されていれば、"1"にする
    let w_cnt = 0; //選択されているチェックボックスの数
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
                //return w_sel = "1";
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode.id === "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "1つ選択してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
    if (mode.id === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "1つ以上選択してください。"
                , type: "error"
                , allowOutsideClick: false
            });

        }
    }
};
//viewStorageからのデータ取得とテーブルへ表示
function viewStorage() {
    const list = document.getElementById("list");
    //htmlのテーブル初期化
    while (list.rows[0]) list.deleteRow(0);
    //localStorageすべての情報の取得
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src = 'img/trash_icon.png' class='trash'>";
    }
    //jQueryのplugin tablesorterを使ってテーブルのソート
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}