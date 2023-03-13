package chat.repository;

import java.util.List;

public interface IRepository<T>{

    //add entity and return error code
    int add(T entity);

    //get all entities
    List<T> getAll();

    //find entity
    T find(T entity);

    //delete entity and return error code
    int delete(T entity);

    //modify entity and return error code
    int modify(T oldEntity, T newEntity);
}
