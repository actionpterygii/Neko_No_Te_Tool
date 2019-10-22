// 設定変更のためのボタンの名前
const btnList = ['open_btn', 'copy_btn'];
// 入力によって開くお魚と1文字の対応のリスト
const osakanaList = {a:'aji', s:'saba', k:'katsuo', m:'maguro'};
// ストレージへのパス
const storagePath = '\\\\storage\\site\\assets\\20';
// SPページのパス
const spPath = 'https://test.example.com/sp/';
// PCページのパス
const pcPath = 'https://test.example.com/pc/';
// ローカルストレージでの識別子(べつにいらんな)
const ls = 'nntt_ls__';

// 読み込んだとき(拡張機能のアイコンをクリックして開いたときに実行される内容)
window.onload = function()
{
    // テキスト入力エリアにフォーカス(すぐ入力できる状態になる)
    document.getElementById('input').focus();
    // 設定変更のためのボタンの状態(ローカルストレージに保存されている)を見ていく
    btnList.forEach(function(value)
    {
        // ローカルストレージに保存されてるボタンの状態が、動いていないということなら(ONというデータなら)
        if(localStorage.getItem(ls + value) !== 'moved')
        {
            // 実際のボタンもONにする
            document.getElementById(value).checked = true;
        }
    });
};

// ボタンの数ぶん動かす
btnList.forEach(function(value)
{
    // ボタンが動いたら
    document.getElementById(value).onchange = function()
    {
        // OFFになっていたら
        if(document.getElementById(value).checked === false)
        {
            // 動いたよってローカルストレージに保存
            localStorage.setItem(ls + value, 'moved');
        }
        // ONになっていたら
        else
        {
            // ローカルストレージの該当ボタン情報を削除(動いてないことになる)
            localStorage.removeItem(ls + value);
        }
    };
});

// 文字をコピーさせるためのもの
function copyTextToClipboard(textVal)
{
    const copyFrom = document.createElement('textarea');
    const bodyElm = document.getElementsByTagName('body')[0];
    copyFrom.textContent = textVal;
    bodyElm.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    bodyElm.removeChild(copyFrom);
}

// キーが押されたときに動く
window.document.onkeydown = function(event)
{
    // キーコード13(Enter)が押されてたら
    if(event.keyCode === 13)
    {
        // リンクを開くボタンの内容取得
        const openBtn = document.getElementById(btnList[0]).checked;
        // パスをコピーするボタンの内容取得
        const copyBtn = document.getElementById(btnList[1]).checked;
        // 入力された全角英数字を半角英数字にして取得
        const input = document.forms.form.input.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s)
        {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
        // yymmのぶぶん(前から4文字)
        const yymm = input.slice(0,4);
        // yymmddのぶぶん(前から6文字)
        const yymmdd = input.slice(0,6);
        // おさかなのぶぶん(最後の1文字)
        const osakana = input.slice(-1);
        // おさかな情報が2つのときのぶぶん(最後から2番目の1文字)
        const sinOsakana = input.substr(-2,1);

        // 入力された1文字のおさかな情報が、上で定義したリストにあるものなら
        if(Object.keys(osakanaList).includes(osakana))
        {
            // 開くボタンがONなら
            if(openBtn === true)
            {
                // 入力された最後から2番目の1文字のおさかな情報が、上で定義したリストにあるもの もしくは 'っ'(日本語入力の場合同じ語が連続するとそうなる)なら
                if(Object.keys(osakanaList).includes(sinOsakana) || sinOsakana === 'っ')
                {
                    // PCでひらく
                    window.open(pcPath + yymmdd + '/' + osakanaList[osakana]);
                }
                // ちがったら
                else
                {
                    // SPでひらく
                    window.open(spPath + yymmdd + '/' + osakanaList[osakana]);
                }
            }
            // コピーボタンがONなら
            if(copyBtn === true)
            {
                //パスコピー
                copyTextToClipboard(storagePath + yymm + '\\' + yymmdd + '\\' + '0' + (Object.keys(osakanaList).indexOf(osakana)+1) + osakanaList[osakana]);
            }
        }
        // ちがったら
        else
        {
            // 開くボタンがONなら
            if(openBtn === true)
            {
                // SPのメインページを開く
                window.open(spPath + yymmdd + '/' + 'main');
            }
            // コピーボタンがONなら
            if(copyBtn === true)
            {
                // なにこれ、、、意図を忘れた。。。
                copyTextToClipboard(storagePath + yymm  + '\\' + yymmdd + '\\' + '00');
            }
        }
    }
};
