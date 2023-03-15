package chat.repository;

import chat.domain.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserRepository implements IUserRepository{

    private String dbURL;
    private String dbUser;
    private String dbPass;
    private Connection connection=null;


    public UserRepository(String dbURL, String dbUser, String dbPass) {
        this.dbURL = dbURL;
        this.dbUser = dbUser;
        this.dbPass = dbPass;
    }

    @Override
    public int add(User entity) throws ClassNotFoundException, SQLException {

        Class.forName("com.mysql.jdbc.Driver");

        connection = DriverManager
                .getConnection(dbURL + "user=" + dbUser + "&password=" + dbPass);

        PreparedStatement preparedStatement= connection
                .prepareStatement("");


        return 0;
    }

    @Override
    public List<User> getAll() throws ClassNotFoundException, SQLException {

        Class.forName("com.mysql.cj.jdbc.Driver");

        connection = DriverManager
                .getConnection(dbURL,dbUser,dbPass);

        PreparedStatement preparedStatement= connection
                .prepareStatement("select * from user");

        ResultSet users=preparedStatement.executeQuery();

        List<User> userList=new ArrayList<User>();

        while (users.next()) {
            User user=new User(users.getString("username"),users.getString("password"),
                    users.getString("email"),users.getString("name"),
                    users.getString("profilePicture"),users.getString("location"));

            userList.add(user);
        }

        return userList;
    }

    @Override
    public User find(User entity) {
        return null;
    }

    @Override
    public int delete(User entity) {
        return 0;
    }

    @Override
    public int modify(User oldEntity, User newEntity) {
        return 0;
    }
}
