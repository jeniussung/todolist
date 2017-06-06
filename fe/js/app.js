(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!

			getList();

		  $('.todo-list li').live('click', function() {
		    if($(this).find($(".toggle")).is(":checked"))
		    {
		       $(this).addClass('completed');
		       var $id = $(this).attr('id');
		       var $com = 1;
		       putList($id,$com);
					 getNum();
		    }
		    else {
		       $(this).removeClass('completed');
		       var $id = $(this).attr('id');
		       var $com = 0;
		       putList($id,$com);
					 getNum();
		    }
		  });

		  $('.filters li').live('click', function() {
		      $('.filters li a[href]').removeClass('selected');
		      $(this).find($("a[href]")).addClass('selected');
					var $var = $(this).children("a").attr("href");
					if($var == '#/all')
					allShow();
					else if($var == '#/active')
					hideChecked();
					else if($var == '#/completed')
					hideNotChecked();
		  });

			$('.new-todo').live('keypress', function(e) {
		    if (e.which == 13) {/* 13 == enter key@ascii */
		     var $var = $(this).val();
					var $d = new Date();
					var $date = $d.getFullYear()+'-'+($d.getMonth()+1)+'-'+$d.getDate();
		      if($var=="")
		      {
		      }
		      else
		      {
						postList($var,$date);
		      }
		    }
		  });

		  $('.destroy').live("click", function() {
		   var $id = $(this).parent().parent().attr('id');
		    $(this).parent().remove();
		    deleteList($id);
				getNum();
		  });

			$('.clear-completed').live("click", function() {
		    clearCompleted();
				getNum();
		  });

			function getNum(){
				var $var = 0;
				$('input:checkbox[class="toggle"]').each(function() {
				if(!this.checked)
				{
					$var++;
				}
		 		});
				$('.todo-count').children().text($var);
			}

			function allShow(){
				$(".todo-list li div").removeClass('hidden');
			}

			function hideChecked(){
				$('input:checkbox[class="toggle"]').each(function() {
					if(this.checked)
					{
						$(this).parent().addClass('hidden');
					}
					else if(!this.checked)
					{
						$(this).parent().removeClass('hidden');
					}
		 	});
			}

			function hideNotChecked(){
				$('input:checkbox[class="toggle"]').each(function() {
					if(!this.checked)
					{
						$(this).parent().addClass('hidden');
					}
					else if(this.checked)
					{
						$(this).parent().removeClass('hidden');
					}
		 	});
			}

			function clearCompleted(){
				$('input:checkbox[class="toggle"]').each(function() {
				if(this.checked)
				{
					var $id = $(this).parent().parent().attr('id');
					$(this).parent().remove();
					deleteList($id);
				}
		 		});
				getNum();
			}

		  function addElementLi(todo,id) {
		  $(".todo-list").show();
		  var $element_ul = parent.$("ul.todo-list");
		  $("<li id = "+id+">"
		  +"<div class='view'>"
		  + "<input class='toggle' type='checkbox'>"
		  + "<label>"+todo+"</label>"
		  + "<button class='destroy'></button>"
		  + "</div>"
		  + "<input class='edit' value='Create a TodoMVC template'>"
		  + "</li>").prependTo($element_ul);
		  }

		  function serverComAddElementLi(id,todo) {
		  $(".todo-list").show();
		  var $element_ul = parent.$("ul.todo-list");
		  $("<li class = 'completed' id = "+id+">"
		  +"<div class='view'>"
		  + "<input class='toggle' type='checkbox' checked>"
		  + "<label>"+todo+"</label>"
		  + "<button class='destroy'></button>"
		  + "</div>"
		  + "<input class='edit' value='Create a TodoMVC template'>"
		  + "</li>").prependTo($element_ul);
		  }

		  function serverAddElementLi(id,todo) {
		  $(".todo-list").show();
		  var $element_ul = parent.$("ul.todo-list");
		  $("<li class id = "+id+">"
		   +"<div class='view'>"
		   + "<input class='toggle' type='checkbox'>"
		   + "<label>"+todo+"</label>"
		   + "<button class='destroy'></button>"
		   + "</div>"
		   + "<input class='edit' value='Create a TodoMVC template'>"
		   + "</li>").prependTo($element_ul);
		  }

		  function postList(todo,date) {
		  $.ajax({
		   url: "./api/todos",
		   type: "POST",
		   contentType:"application/json; charset=UTF-8",
		   dataType:"json",
		   data: JSON.stringify({"todo":todo,"completed":0,"date":date}),
		   success: function(data) {
		    var $id = data.id;
				addElementLi(todo,$id);
				getNum();
		   }
		  });
		  }

		  function getList() {
		  $.ajax({
		   url: "./api/todos",
		   type: "GET",
		   contentType:"application/json; charset=UTF-8",
		   dataType:"json",
		   success: function(data) {
		     for(var i in data)
		      {
		        if(data[i].completed==1)
		        {
		          serverComAddElementLi(data[i].id,data[i].todo);
		        }
		        else {
		          serverAddElementLi(data[i].id,data[i].todo);
		        }
		      }
					getNum();
		   }
		  });
		  }

		  function putList(id,com) {
		  $.ajax({
		    url: "./api/todos",
		    type: "PUT",
		    contentType:"application/json; charset=UTF-8",
		    dataType:"json",
		  data: JSON.stringify({"id":id,"completed":com,"date":"2017-03-03"}),
		    success: function(data) {
		     }
		  });
		  }

		  function deleteList(id) {
		  $.ajax({
		    url: "./api/todos",
		    type: "DELETE",
		    contentType:"application/json; charset=UTF-8",
		    data: id,
		    success: function(data) {
		     }
		  });
		  }

})(window);
