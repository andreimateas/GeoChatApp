package chat.service.serviceImplementation;

import chat.domain.FeedPost;
import chat.domain.Message;
import chat.domain.User;
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
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

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


    //service methods
    public void sendUpdate(String message) {
        messagingTemplate.convertAndSend("/topic/updates", message);
    }

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

    public List<User> getUsers(){
        return userRepository.findAll();
    }

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

    public List<FeedPost> getFeedPosts(){
        return feedPostRepository.findAllOrderByDate();
    }

    public FeedPost addFeedPost(FeedPost feedPost){
        try{
            return feedPostRepository.save(feedPost);

        }
        catch(IllegalArgumentException e){
            return null;
        }
    }

    public List<Message> getMessages(){
        return messageRepository.findAll();
    }

    /**
     * Adds a new message to the repository.
     *
     * @param message The message to be added.
     * @return The added message if successful; otherwise, null.
     */
    public Message addMessage(Message message){
        try{
            return messageRepository.save(message);
        }
        catch(IllegalArgumentException e){

            return null;
        }
    }




    //encryption methods
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

    private String serializeSecretKey(SecretKey secretKey) {

        return Base64.getEncoder().encodeToString(secretKey.getEncoded());
    }

    private String serializeIvParameterSpec(IvParameterSpec ivParameterSpec) {

        return Base64.getEncoder().encodeToString(ivParameterSpec.getIV());
    }

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

    private String getEncryptedPassword(String password) throws NoSuchAlgorithmException, InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        String cipherText = AESEncryption.encrypt(ALGORITHM, password, secretKey, ivParameterSpec);
        return cipherText;
    }

    private String getDecryptedPassword(String password) throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException {
        String plainText = AESEncryption.decrypt(ALGORITHM, password, secretKey, ivParameterSpec);
        return plainText;
    }


}
