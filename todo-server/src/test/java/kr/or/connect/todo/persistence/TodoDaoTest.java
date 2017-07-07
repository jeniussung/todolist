package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import kr.or.connect.todo.Todo;
import kr.or.connect.todo.persistence.TodoDao;
 

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class TodoDaoTest {
	
	@Autowired
	private TodoDao dao;
	
	@Test
	public void shouldCount() {
		int count = dao.countTodos();
		System.out.println(count);
	}
	
	@Test
	public void shouldInsertAndSelect() {
		// given
		Date date = new Date(); 
		Todo todo = new Todo("할 일",true,date);
		// when
		Integer id = dao.insert(todo);

		// then
		Todo selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTodo(), is("할 일"));
	}
	
	
}
