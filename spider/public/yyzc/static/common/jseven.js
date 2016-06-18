function autocomplete(id,path){
	$("#"+id).autocomplete(path,{
		minChars:0,
		enableClick:false,
		dataType:"json",
		max:5,
		parse:function(data) {   
            return $.map(eval(data), function(row) {   
                return {   
                  data:row,   
                  value:row.realname,   
                  result:row.realname   
                }   
            });   
        },  
		formatItem:function(row,i,max){
			return row.realname;
		}
	}).result(function(event,item,formatted){
			if (item){
				$("#"+id).val(item.realname);
				$("#"+id+"hide").val(item.id);
			}else{
				$("#"+id).val("");
				$("#l"+id+"hide").val("");
			}
	});
}