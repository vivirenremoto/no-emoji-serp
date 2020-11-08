function isEmoji(str) {
    // source https://stackoverflow.com/a/39652525
    var ranges = [
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF
    ];
    if (str.match(ranges.join('|'))) {
        return true;
    } else {
        return false;
    }
}

var search = ['▷', '➤', '【', '⊛', '.top', '.online'];
var total_search = search.length;
var items = document.querySelectorAll("div[class=rc]");
var total = items.length;
var found = false;
var total_found = 0;

for (var i = 0; i < total; i++) {
    var found = false;
    var j = 0;
    var item = items[i].parentNode;
    var html = item.innerHTML;

    found = isEmoji(html);

    while (!found && j < total_search) {

        if (!found) {
            found = (html.indexOf(search[j]) > -1);
        }

        j++;
    }

    if (found) {

        // remove zero result
        if (i == 0) {
            item = document.querySelector('.g-blk');
        }

        item.classList.add('emoji_found');
        item.style.cssText = 'border:1px red solid;';
        item.style.display = 'none';
        total_found++;
    }

}


var items_found = document.querySelectorAll(".emoji_found");
var total_found = items_found.length;
if (total_found) {
    var btn_undo = document.createElement('span');
    btn_undo.style.cssText = 'font-weight:bold;font-size:15px;text-align:center;border:1px black solid;padding:10px 20px;background:red;color:white;position:fixed;bottom:0;right:0;cursor:pointer;';
    btn_undo.innerHTML = '✖ Undo emoji filter (' + total_found + ')';
    btn_undo.id = 'btn_undo';
    document.body.appendChild(btn_undo);

    btn_undo.onclick = function () {
        var j = 0;
        for (j = 0; j < total_found; j++) {
            if (items_found[j]) {
                items_found[j].style.display = '';
            }
        }
        document.getElementById('btn_undo').remove();
        window.scrollTo(0, 0);
    };
}