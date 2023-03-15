package chat;

import chat.domain.User;
import chat.repository.UserRepository;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Properties;
import java.util.PropertyPermission;

public class Main {
    public static void main(String[] args) {
        System.out.println("V1");
        Properties properties= new Properties();
        try {
            properties.load(Main.class.getResourceAsStream("/dbUtils.properties"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String dbURL=properties.getProperty("dbURL","default");
        String dbUser=properties.getProperty("dbUser","default");
        String dbPass=properties.getProperty("dbPass","default");
        UserRepository userRepository=new UserRepository(dbURL,dbUser,dbPass);
        try {
            List<User> userList=userRepository.getAll();
            userList.stream().forEach(x-> System.out.println(x));
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }
}