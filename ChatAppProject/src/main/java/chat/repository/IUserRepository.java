package chat.repository;


import chat.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface IUserRepository extends JpaRepository<User,String> {

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.loggedIn=true WHERE u.username=:username AND u.loggedIn=false")
    int login(@Param("username") String username);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.loggedIn=false WHERE u.username=:username AND u.loggedIn=true")
    int logout(String username);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.loggedIn=false WHERE u.loggedIn=true")
    void logoutAll();
}
