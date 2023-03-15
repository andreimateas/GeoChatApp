package chat.repository;

import chat.domain.User;

import java.sql.SQLException;
import java.util.List;

public interface IUserRepository{

    //add entity and return error code
    int add(User entity) throws ClassNotFoundException, SQLException;

    //get all entities
    List<User> getAll() throws ClassNotFoundException, SQLException;

    //find entity
    User find(User entity);

    //delete entity and return error code
    int delete(User entity);

    //modify entity and return error code
    int modify(User oldEntity, User newEntity);
}
