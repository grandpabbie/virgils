
function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) all.push(node);
        else all = all.concat(textNodesUnder(node));
    }
    return all;
}

/**
 * identifies strings via regex (numbers) within a given node (and it's children).
 *
 * @param {Element} node element to run the virgilify replace one. recursively
 *                    checks for child nodes.
 */
function virgilify(node) {

    let regex = new RegExp(/(\d*\.?\d+|\d{1,3}(?:,\d{3})*(?:\.\d+)?)(?!\S)/g)

    if (node.childNodes.length) {
        
        node.childNodes.forEach(child => virgilify(child));
    } else {
        const cont = node.textContent;
        if (cont) node.textContent = cont.replace(regex, virgil);
    }
}

/**
 * Given a regex match, calls calc vigirls and returns the calculated replacen
 * value
 * @param {String} match matching string
 * @param {*} p1 Position 
 * @param {*} p2 offset
 * 
 * @returns String or number of virgils from calcVirgils
 */
function virgil(match, p1, p2) {
    console.log('Calc V', match)
    let virgils = calcVirgils(match)
    // console.log(` Virgils`, {match, p1, p2})
    return virgils;
}

/**
 * Calculates the number of Virgils. Numbers under 50 are not converted to 'Virgils'
 * @param {Number} num number to check
 */
function calcVirgils(num) {

    if (num <= 50) return num
    return `${num / 50} Virgils`
}

/**
 * Listen to messages coming from background script
 */
chrome.runtime.onMessage.addListener((message, sender, response)=> {
    console.log('Message', message)
    switch (message.type) {
        case 'virgilify':
            virgilify(document.body)
            return Promise.resolve('vergiled')
            break;

        default:
            break;
    }
});

/**
 * Handler for chrome.runtime.onMessage
 * @param  {object}   request  Message sent
 * @param  {object}   sender
 * @param  {Function} callback called (once) when you have a response.
 */
function onChromeMessage(request, sender, callback) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    //Call the vergilify message if the message is vergilify
    switch (request.type) {
        case 'virgilify':
            console.log('VERGILING')
            virgilify(document.body)
            return Promise.resolve('vergiled')
            break;

        default:
            break;
    }
}


function sendChromeMessage() {

}


