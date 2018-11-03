var Login = function()
{
    return({
        DOM : {
            login    : 'input#login',
            password : 'input#password',
            enter    : 'button#enter',
            status   : 'p#status'
        },

        init: function()
        {
            var self = this;

            $(enter).click(function()
                {
                    var login = $(self.DOM.login).val();
                    var password = $(self.DOM.password).val();
                    if(!!login && !!password)
                    {
                        $.ajax({
                            method : 'POST',
                            url  : `/login`,
                            data : {
                                login : login,
                                password : password
                            },
                            success : function() 
                            {
                                window.location.href = '/';
                            },
                            error : function()
                            {
                                $(self.DOM.status).html('Wrong credentials.');
                            }
                        })
                    }
                }
            );

            $(self.DOM.login).keydown(function()
                {
                    $(self.DOM.status).html('');
                }
            );

            $(self.DOM.password).keydown(()=>
                {
                    $(self.DOM.status).html('');    
                }
            );
        }
    });
}

$(document).ready(function()
    {
        var input = new Login();
        input.init();
    }
);