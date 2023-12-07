
exports.callJSFun=function(){
    [].forEach.call(document.querySelectorAll('.myimg'), function(elem) {
        var img = new Image();
        img.onload = function(event) {
        elem.previousElementSibling.getContext('2d').drawImage(img, 0, 0);
        };
      img.src = elem.getAttribute('data-src');
      
        elem.onmouseover = function(event) {
            event.target.src = event.target.getAttribute('data-src');
        };
        elem.onmouseout = function(event) {
            event.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        };
    });
}