package kr.or.connect.todo;

import java.util.Date;

public class Todo {
	private Integer id;
	private String todo;
	private boolean completed;
	private Date date;
	
	
	public Todo() {
		
	}
	
	public Todo(String todo, boolean completed, Date date) {
			this.todo = todo;
			this.completed = completed;
			this.date = date;
	}
	
	public Todo(Integer id, String todo, boolean completed, Date date) {
		this(todo,completed,date);
		this.id = id;
	}
	
	@Override
	public String toString() {
		return "Todo [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public boolean isCompleted() {
		return completed;
	}
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
}
