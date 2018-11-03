$(document).ready(function()
    {
        $('button#logout').click(function()
            {
                $.ajax({
                    method : 'PUT',
                    url  : `/login`,
                    data : {
                    },
                    success : function() 
                    {
                        // console.log('success');
                        window.location.reload(true);
                    },
                    error : function()
                    {
                        // alert('An error occured.');
                        // self.modal.close();
                    },
                });
            }
        );
    }
);