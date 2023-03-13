package chat;

import java.io.IOException;
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
        System.out.println("Database is: " + dbURL);

    }
}