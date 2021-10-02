var isIE = /*@cc_on!@*/ false || !!document.documentMode;

let element;
if (isIE) {
    element = window.document.querySelector('#app');
} else {
    element = window.document.querySelector('#information');
}

element.remove();
