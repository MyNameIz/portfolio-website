var Circle = function(sel){
    var circles = document.querySelectorAll(sel);
    [].forEach.call(circles,function(el){
        var valEl = parseFloat(el.innerHTML);
        valEl = valEl*408/100;
        var newEl = $(el).parent();
        // console.log(newEl)
        $(el).css({'display':'none'});
        newEl.html('<svg width="160" height="160"><circle transform="rotate(-90)" r="65" cx="-80" cy="80" /><circle transform="rotate(-90)" style="stroke-dasharray:'+valEl+'px 408px;" r="65" cx="-80" cy="80" /></svg>'+newEl.html());
        
    });
};

$(document).ready(function()
    {
        Circle('.circle p');
    }
);