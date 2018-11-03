var EmailFeedback = function()
{
    return ({
        DOM : {
            email   : 'input#email',
            name    : 'input#name',
            message : 'textarea#message',
            sendbtn : 'button#send'
        },

        init : function()
        {
            var self = this;

            $(self.DOM.sendbtn).click(function()
                {
                    var email   = $(self.DOM.email).val(),
                        name    = $(self.DOM.name).val(),
                        message = $(self.DOM.message).val();
                    if(!!email&&!!name&&!!message)
                    {
                        $.ajax({
                            method : 'POST',
                            url  : `/email`,
                            data : {
                                email   : email,
                                name    : name,
                                message : message
                            },
                            success : function() 
                            {
                                // console.log('success');
                                // window.location.reload(true);
                            },
                            error : function()
                            {
                                // alert('An error occured.');
                                // self.modal.close();
                            }
                        });
                    }
                }
            );
        }
    });
}

$(document).ready(function()
    {
        var email = new EmailFeedback();
        email.init();
    }
);