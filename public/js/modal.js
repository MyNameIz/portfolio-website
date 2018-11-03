var modal = function()
{
    return({
        DOM : {
            modal  : 'div#modal',
            save   : 'button#save',
            cancel : 'button#cancel',
            modalhtml : 'div#modal div'
        },

        close : function ()
        {
            $.modal.close();
        },
        open : function (html, cb)
        {
            if(typeof(html)=="string"&&typeof(cb)=="function")
            {
                $(this.DOM.modalhtml).html("");
                $(this.DOM.modalhtml).html(html);
                $(this.DOM.save).click(cb);
                $(this.DOM.modal).modal();
            }
        },

        init : function()
        {
            var self = this;
            $(self.DOM.cancel).click(function()
                {
                    self.close();
                }
            );  
        }
    });
}

// $(document).ready(function()
//     {
//         var popup = new modal();
//         popup.init();
//     }   
// );