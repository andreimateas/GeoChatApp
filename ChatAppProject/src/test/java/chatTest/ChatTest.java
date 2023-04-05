package chatTest;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import chat.domain.User;

import java.util.Arrays;

public class ChatTest extends AbstractTest {
    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
    }
    @Test
    public void getUsers() throws Exception {
        String uri = "/chat/users";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        String content = mvcResult.getResponse().getContentAsString();
        User[] userlist = super.mapFromJson(content, User[].class);
        assertTrue(userlist.length > 0);
        Arrays.stream(userlist).forEach(x-> System.out.println(x));
    }



}