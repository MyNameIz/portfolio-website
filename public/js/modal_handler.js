var modalHandler = function(modal)
{
    return({
        DOM : {
            diagram : 'div.circle',
            name    : 'div',
            val     : 'p',
            diagram_editbtn : 'li.circles button#diagram_edit',
            diagram_addbtn  : 'li.circles button#diagram_add',
            editbtn : 'button#info_edit',
            addbtn  : 'button#info_add'
        },
    
        modal : modal,

        init : function()
        {
            var self = this;

            $(self.DOM.diagram_editbtn).click(function()
                {
                    var parent = $(this).parent();
                    var name = parent.find(self.DOM.diagram).find('div').html();
                    var val = parent.find(self.DOM.diagram).find('p').html();
                    var html = `<input type="text" id="name" value="${name}"/><input type="number" min="0" id="value" value="${val}"/>`;
                    var prevName = name;
                    self.modal.open(html, function()
                        {
                            var name = $(self.modal.DOM.modalhtml+' #name').val();
                            var val  = parseInt($(self.modal.DOM.modalhtml+' #value').val());
                            if(!!val!=!!name)
                            {
                                self.modal.close();
                                return false;
                            }
                            var type = (name&&val)?'PUT':'DELETE';

                            $.ajax({
                                method : type,
                                url  : `/diagram`,
                                data : {
                                    prevName : prevName,
                                    name : name,
                                    val : val
                                },
                                success : function() 
                                {
                                    console.log('success');
                                    window.location.reload(true);
                                },
                                error : function()
                                {
                                    alert('An error occured.');
                                    self.modal.close();
                                }
                            })
                        }
                    );
                }
            );

            $(self.DOM.diagram_addbtn).click(function()
                {
                    var parent = $(this).parent();
                    var name = parent.find(self.DOM.diagram).find('div').html();
                    var val = parent.find(self.DOM.diagram).find('p').html();
                    var html = `<input type="text" id="name" value=""/><input type="number" min="0" id="value" value=""/>`;
                    var prevName = name;
                    self.modal.open(html, function()
                        {
                            var name = $(self.modal.DOM.modalhtml+' #name').val();
                            var val  = parseInt($(self.modal.DOM.modalhtml+' #value').val());
                            if(!val||!name)
                            {
                                self.modal.close();
                                return false;
                            }
                            $.ajax({
                                method : 'POST',
                                url  : `/diagram`,
                                data : {
                                    name : name,
                                    val : val
                                },
                                success : function() 
                                {
                                    console.log('success');
                                    window.location.reload(true);
                                },
                                error : function()
                                {
                                    alert('An error occured.');
                                    self.modal.close();
                                }
                            })
                        }
                    );
                }
            );

            $(self.DOM.editbtn).click(function()
                {
                    var parent = $(this).parent();
                    var name = $(this).attr('name');
                    var val = parent.find('p').html();
                    var html = `<textarea id="value" rows="15" cols="45">${val}</textarea>`;
                    var prevVal = val;
                    self.modal.open(html, function()
                        {
                            var val  = $(self.modal.DOM.modalhtml+' #value').val();
                            if(val==prevVal)
                            {
                                self.modal.close();
                                return false;
                            }
                            var type = (val)?'PUT':'DELETE';

                            $.ajax({
                                method : type,
                                url  : `/data`,
                                data : {
                                    prevVal : prevVal,
                                    name : name,
                                    val : val
                                },
                                success : function() 
                                {
                                    console.log('success');
                                    window.location.reload(true);
                                },
                                error : function()
                                {
                                    alert('An error occured.');
                                    self.modal.close();
                                }
                            })
                        }
                    );
                }
            );

            $(self.DOM.addbtn).click(function()
                {
                    var parent = $(this).parent();
                    var name = $(this).attr('name');
                    var html = `<textarea id="value" rows="15" cols="45"></textarea>`;
                    self.modal.open(html, function()
                        {
                            var val  = $(self.modal.DOM.modalhtml+' #value').val();
                            if(!val)
                            {
                                self.modal.close();
                                return false;
                            }
                            $.ajax({
                                method : 'POST',
                                url  : `/data`,
                                data : {
                                    name : name,
                                    val : val
                                },
                                success : function() 
                                {
                                    console.log('success');
                                    window.location.reload(true);
                                },
                                error : function()
                                {
                                    alert('An error occured.');
                                    self.modal.close();
                                }
                            });
                        }
                    );
                }
            );
        }
    });
}
