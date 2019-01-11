const btnList = ['open_btn', 'copy_btn'];
const osakanaList = {a:'aji', s:'saba', k:'katsuo', m:'maguro'};
const storagePath = '\\\\storage\\site\\assets\\20';
const spPath = 'https://test.example.com/sp/';
const pcPath = 'https://test.example.com/pc/';
const ls = 'nntt_ls__';

window.onload = function()
{
    document.getElementById('input').focus();
    btnList.forEach(function(value)
    {
        if(localStorage.getItem(ls + value) !== 'moved')
        {
            document.getElementById(value).checked = true;
        }
    });
};

btnList.forEach(function(value)
{
    document.getElementById(value).onchange = function()
    {
        if(document.getElementById(value).checked === false)
        {
            localStorage.setItem(ls + value, 'moved');
        }
        else
        {
            localStorage.removeItem(ls + value);
        }
    };
});

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

window.document.onkeydown = function(event)
{
    if(event.keyCode === 13)
    {
        const openBtn = document.getElementById(btnList[0]).checked;
        const copyBtn = document.getElementById(btnList[1]).checked;
        const input = document.forms.form.input.value.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s)
        {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
        const yymm = input.slice(0,4);
        const yymmdd = input.slice(0,6);
        const osakana = input.slice(-1);
        const sinOsakana = input.substr(-2,1);

        if(Object.keys(osakanaList).includes(osakana))
        {
            if(openBtn === true)
            {
                if(Object.keys(osakanaList).includes(sinOsakana) || sinOsakana === 'っ')
                {
                    window.open(pcPath + yymmdd + '/' + osakanaList[osakana]);
                }
                else
                {
                    window.open(spPath + yymmdd + '/' + osakanaList[osakana]);
                }
            }
            if(copyBtn === true)
            {
                copyTextToClipboard(storagePath + yymm + '\\' + yymmdd + '\\' + '0' + (Object.keys(osakanaList).indexOf(osakana)+1) + osakanaList[osakana]);
            }
        }
        else
        {
            if(openBtn === true)
            {
                window.open(spPath + yymmdd + '/' + 'main');
            }
            if(copyBtn === true)
            {
                copyTextToClipboard(storagePath + yymm  + '\\' + yymmdd + '\\' + '00');
            }
        }
    }
};
