(function (window) {
	'use strict';
	// Your starting point. Enjoy the ride!

			getList(); // 랜딩 되자마자 item left에 숫자를 표시

		  $('.todo-list li').live('click', function() { // todo-list 클래스의 li를 클릭하면 실행되는 제이쿼리
		    if($(this).find($(".toggle")).is(":checked")) // li안에 toggle 클래스를 찾아서 checked되면 실행
		    {
		       $(this).addClass('completed'); // class에 completed를 추가
		       var $id = $(this).attr('id'); // id변수에 id의 값을 저장
		       var $com = 1; // com 변수에 1을 저장, com은 체크가 되었는지 안되었는지를 표시하는 변ㅅ
		       putList($id,$com);// 서버사이드에 전송
					 getNum(); // item-left 변경
		    }
		    else {
		       $(this).removeClass('completed'); //
		       var $id = $(this).attr('id');
		       var $com = 0;
		       putList($id,$com);
					 getNum();
		    }
		  });

		  $('.filters li').live('click', function() {
		      $('.filters li a[href]').removeClass('selected'); // filter 클래스에 li 안에 a[href]의 클래스명을 삭제
		      $(this).find($("a[href]")).addClass('selected'); // 선택된 li의  a[href]의 클래스명을 selected
					var $var = $(this).children("a").attr("href"); //
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
					var arr = [1,2,3,4,5,6,7,8,9,10];
					aa();
		      if($var=="") // 아무것도 입력이 안되었을 때
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

			function sum(arr)
			{
				var i = 0;
				var sum = 0;
				for(i ; i < 10 ; i++)
				{
					sum += arr[i];
				}
				alert(sum);
			}

			function aa()
			{
				var arr = [];

				for(var i = 0; i < 5; i++){
				    arr[i] = function(){
				        return i;
				    }
				}

				for(var index in arr) {
				    console.log(arr[index]());
				}
			}

})(window);
