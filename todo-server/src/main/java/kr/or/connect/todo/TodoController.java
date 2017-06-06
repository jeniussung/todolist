package kr.or.connect.todo;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.service.TodoService;

import org.springframework.http.HttpStatus;



@RestController
@RequestMapping("/api/todos")
public class TodoController {
	
	private final TodoService service;
	private final Logger log = LoggerFactory.getLogger(TodoController.class);
	
	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}
	
	@GetMapping
	Collection<Todo> readList() {
		return service.findAll();
	}

	@GetMapping("/{id}")
	Todo read(@PathVariable  Integer id) {
		return service.findById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody Todo todo) {
		Todo newTodo = service.create(todo);
		log.info("todo created : {}" , newTodo);
		return newTodo;
	}
	
	@PutMapping
	boolean update(@RequestBody Todo todo){		
		return service.update(todo);
	}
	
	@DeleteMapping
	boolean delete(@RequestBody Integer id){
		log.info("todo created : {}" , id);
		return service.delete(id);
	}
}
