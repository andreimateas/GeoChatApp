package chat.service.serviceImplementation;

import chat.domain.FeedPost;
import chat.domain.Message;
import chat.domain.User;
import chat.domain.UserDTO;
import chat.repository.IFeedPostRepository;
import chat.repository.IMessageRepository;
import chat.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import chat.encryption.AESEncryption;

import javax.annotation.PostConstruct;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class ChatService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IFeedPostRepository feedPostRepository;
    @Autowired
    private IMessageRepository messageRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final int KEY_SIZE = 128;
    private SecretKey secretKey;
    private IvParameterSpec ivParameterSpec;
    private static final String KEY_FILE = "aes.properties";


    /**
     * Initializes the encryption by loading existing secret keys and initialization vectors from a file, or generating new ones and storing them in a file.
     *
     */
    @PostConstruct
    public void init() throws NoSuchAlgorithmException {
        loadSecretKeyAndIv();

        if (secretKey == null || ivParameterSpec == null) {

            loadSecretKeyAndIv();
            if (secretKey == null || ivParameterSpec == null) {

                secretKey = AESEncryption.generateKey(KEY_SIZE);
                ivParameterSpec = AESEncryption.generateIv();
                storeSecretKeyAndIv(secretKey, ivParameterSpec);
            }
        }
    }


    //Service methods

    /**
     * Sends an update message that will be received by the client.
     *
     * @param message The message to be sent.
     */
    public void sendUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/updates", message);
    }

    /**
     * Gets a User object based on the given username and password.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     * @return The User object if the username and password match, otherwise return null.
     */
    public User getUser(String username, String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        try {
            User user = userRepository.getOne(username);
            if (getEncryptedPassword(password).equals(user.getPassword()))
                return user;
        } catch (EntityNotFoundException exception) {
            return null;
        }
        return null;
    }

    public int login(User user) {
        return userRepository.login(user.getUsername());
    }

    public int logout(String username) {
        return userRepository.logout(username);
    }

    /**
     * Gets user information as a UserDTO based on the provided username.
     *
     * @param username The username of the user.
     * @return A UserDTO object containing user information, or null if the user is not found.
     */
    public UserDTO getUser(String username){
        try {
            User user = userRepository.getOne(username);
            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setProfilePicture(user.getProfilePicture());
            userDTO.setLocation(user.getLocation());
            return userDTO;
        } catch (EntityNotFoundException exception) {
            return null;
        }

    }
    public User getFullUser(String username){
        try {
            User user = userRepository.getOne(username);
            return user;
        } catch (EntityNotFoundException exception) {
            return null;
        }

    }
    /**
     * Gets a list of UserDTO objects representing all users in the database.
     *
     * @return A List of UserDTO objects containing user information.
     */
    public List<UserDTO> getUsers(){
        List<User> userList=userRepository.findAll();
        List<UserDTO> userDTOList=new ArrayList<UserDTO>();
        for (User user : userList) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUsername(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setProfilePicture(user.getProfilePicture());
            userDTO.setLocation(user.getLocation());
            userDTOList.add(userDTO);

        }
        return userDTOList;
    }

    /**
     * Adds a new user to the database, encrypts the password, and stores the user information.
     *
     * @param user The User object containing the user information to be added.
     * @return The added User object if successful, or null if the user already exists in the database or an error occurs.
     */
    public User addUser(User user) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        try {

            if (userRepository.existsById(user.getUsername())) {
                return null;
            }
            storeSecretKeyAndIv(secretKey,ivParameterSpec);
            user.setPassword(getEncryptedPassword(user.getPassword()));
            return userRepository.save(user);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    /**
     * Gets a list of feed posts from the system, ordered by date.
     *
     * @return A List of FeedPost objects representing the feed posts.
     */
    public List<FeedPost> getFeedPosts(){
        return feedPostRepository.findAllOrderByDate();
    }

    /**
     * Adds a new feed post to the database.
     *
     * @param feedPost The FeedPost object containing the feed post data.
     * @return The added FeedPost object if successful, or null if an error occurs.
     */
    public FeedPost addFeedPost(FeedPost feedPost){
        try{
            return feedPostRepository.save(feedPost);

        }
        catch(IllegalArgumentException e){
            return null;
        }
    }

    public int addLike(FeedPost feedPost) {
        try{
            return feedPostRepository.addLike(feedPost.getPostId());

        }
        catch(IllegalArgumentException e){
            return -1;
        }
    }

    public int removeLike(FeedPost feedPost) {
        try{
            return feedPostRepository.removeLike(feedPost.getPostId());

        }
        catch(IllegalArgumentException e){
            return -1;
        }
    }

    /**
     * Gets a list of all messages from the database.
     *
     * @return A List of Message objects.
     */
    public List<Message> getMessages(){
        return messageRepository.findAll();
    }

    /**
     * Adds a new message to the database.
     *
     * @param message The Message object that is going to be added.
     * @return The added Message object if successful, or null if an error occurs.
     */
    public Message addMessage(Message message){
        try{
            return messageRepository.save(message);
        }
        catch(IllegalArgumentException e){

            return null;
        }
    }

    /**
     * Gets a list of messages between two given users.
     *
     * @param user1 The username of the first user.
     * @param user2 The username of the second user.
     * @return A List of Message objects representing the messages sent between the two users.
     */
    public List<Message> getMessagesByUsers(String user1, String user2){
        return messageRepository.getMessagesByUsers(user1,user2);
    }

    public void logoutAllUsers(){
        userRepository.logoutAll();
    }

    //encryption methods

    /**
     * Stores the secret key and initialization vector in a properties file.
     *
     * @param secretKey The SecretKey to be stored.
     * @param ivParameterSpec The IvParameterSpec to be stored.
     */
    private void storeSecretKeyAndIv(SecretKey secretKey, IvParameterSpec ivParameterSpec) {

        String serializedSecretKey = serializeSecretKey(secretKey);
        String serializedIvParameterSpec = serializeIvParameterSpec(ivParameterSpec);

        Properties properties = new Properties();
        properties.setProperty("secretKey", serializedSecretKey);
        properties.setProperty("ivParameterSpec", serializedIvParameterSpec);

        try {
            File file = new File(KEY_FILE);
            FileOutputStream fos = new FileOutputStream(file);
            properties.store(fos, "AES Encryption Config");
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Serializes a SecretKey to a Base64 encoded string.
     *
     * @param secretKey The SecretKey to be serialized.
     * @return A Base64 encoded string representing the SecretKey.
     */
    private String serializeSecretKey(SecretKey secretKey) {

        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    /**
     * Serializes an IvParameterSpec to a Base64 encoded string.
     *
     * @param ivParameterSpec The IvParameterSpec to be serialized.
     * @return A Base64 encoded string representing the IvParameterSpec initialization vector.
     */
    private String serializeIvParameterSpec(IvParameterSpec ivParameterSpec) {

        return Base64.getEncoder().encodeToString(ivParameterSpec.getIV());
    }

    /**
     * Loads the stored secret key and initialization vector from a properties file.
     */
    private void loadSecretKeyAndIv() {

        Properties properties = new Properties();
        try {
            File file = new File(KEY_FILE);
            if (file.exists()) {
                FileInputStream fis = new FileInputStream(file);
                properties.load(fis);
                fis.close();

                String serializedSecretKey = properties.getProperty("secretKey");
                String serializedIvParameterSpec = properties.getProperty("ivParameterSpec");

                byte[] secretKeyBytes = Base64.getDecoder().decode(serializedSecretKey);
                byte[] ivBytes = Base64.getDecoder().decode(serializedIvParameterSpec);
                secretKey = new SecretKeySpec(secretKeyBytes, "AES");
                ivParameterSpec = new IvParameterSpec(ivBytes);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * Encrypts a password using AES encryption.
     *
     * @param password The password to be encrypted.
     * @return The encrypted password as a cipher text.
     */
    private String getEncryptedPassword(String password) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        String cipherText = AESEncryption.encrypt(ALGORITHM, password, secretKey, ivParameterSpec);
        return cipherText;
    }

    /**
     * Decrypts an encrypted password using AES decryption.
     *
     * @param password The encrypted password that is going to be decrypted.
     * @return The decrypted password as a string.
     */
    private String getDecryptedPassword(String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String plainText = AESEncryption.decrypt(ALGORITHM, password, secretKey, ivParameterSpec);
        return plainText;
    }



}
