package com.WonderVentures.controller.emailSender;
import com.WonderVentures.DTO.PersonDTO;
import com.WonderVentures.service.PersonService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
@RequestMapping("/enviarCorreo")
public class SendEmail {

    @Autowired
    private JavaMailSender mail;
    @Autowired
    private PersonService personService;






    @PostMapping("/{correo}")
    public ResponseEntity<?> sendEmail(@PathVariable String correo) {

        try {
            PersonDTO personDTO = personService.searchUserByEmail(correo);
            String name = personDTO.getName();


            MimeMessage message = mail.createMimeMessage();


            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


            helper.setTo(correo);
            helper.setFrom("wonderVentures@outlook.es");
            helper.setSubject("Registro Exitoso Wonder Ventures");

            String inlineStyle = "<style>" +
                    "body { font-family: Arial, sans-serif; background-color: #f5f5f5; }" +
                    ".container { padding: 20px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); text-align: center; }" +
                    ".logo { max-width: 150px; display: block; margin: 0 auto; }" +
                    ".header { color: #EB5D09; font-size: 28px; font-weight: bold; margin-bottom: 20px; }" +
                    ".details { font-size: 18px; margin-bottom: 20px; }" +
                    ".highlight { color: #EB5D09; font-weight: bold; }" +
                    ".experience-image { max-height: 400px; width: auto; }" +
                    "</style>";


            String htmlContent = "<html>" +
                    "<head>" +
                    inlineStyle +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<img class='logo' src='https://c3-grupo4.s3.us-east-2.amazonaws.com/logoHeadNegro.png' alt='Logo de Wonder Ventures' />" +
                    "<h2 class='header'>¡Bienvenido a Wonder Ventures  " + name  + "!</h2>" +
                    "<p class='details'>Recibimos tu registro con el siguiente correo: "+correo+ " </p>" +
                    "<p class='details'>Prepárate para vivir momentos emocionantes y crear recuerdos inolvidables. ¡Estamos ansiosos por tenerte con nosotros!</p>" +
                    "<a href='http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/login' style='background-color: #EB5D09; color: white; padding: 15px 30px; font-size: 20px; text-decoration: none; border-radius: 5px;'>Ingresa a tu cuenta</a>" +
                    "</div>" +
                    "</body>" +
                    "</html>";


            helper.setText(htmlContent, true); // Con el true le decimos que acepte HTML, si lo sacamos tenemos que enviar un mensaje sin html

            // Enviar el correo
            mail.send(message);

            return new ResponseEntity<>("El correo se envió correctamente", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al enviar correo", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/successful/{correo}")
    public ResponseEntity<?> sendBookingEmail(@RequestBody SuccessfulResponse response) {

        try {
            String correo = response.getEmail();
            String experience = response.getExperience();
            LocalDate dateIn = response.getDateIn();
            LocalDate dateOut = response.getDateOut();
            PersonDTO personDTO = personService.searchUserByEmail(correo);
            String place = response.getPlace();
            String name = personDTO.getName();
            String image = response.getImage();




            MimeMessage message = mail.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(correo);
            helper.setFrom("wonderVentures@outlook.es");
            helper.setSubject("Los detalles de tu reserva:  " + name );


            String inlineStyle = "<style>" +
                    "body { font-family: Arial, sans-serif; background-color: #f5f5f5; }" +
                    ".container { padding: 20px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); text-align: center; }" +
                    ".logo { max-width: 150px; display: block; margin: 0 auto; }" +
                    ".header { color: #EB5D09; font-size: 28px; font-weight: bold; margin-bottom: 20px; }" +
                    ".details { font-size: 18px; margin-bottom: 20px; }" +
                    ".highlight { color: #EB5D09; font-weight: bold; }" +
                    ".experience-image { max-height: 400px; width: auto; }" +
                    "</style>";


            String htmlContent = "<html>" +
                    "<head>" +
                    inlineStyle +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "<img class='logo' src='https://c3-grupo4.s3.us-east-2.amazonaws.com/logoHeadNegro.png' alt='Logo de Wonder Ventures' />" +
                    "<h2 class='header'>¡Hola " + name + ", tu aventura comienza ahora!</h2>" +
                    "<p class='details'>Estamos emocionados de que hayas reservado esta experiencia única con Wonder Ventures. Prepárate para lo inolvidable:</p>" +
                    "<img class='experience-image' src='" + image + "' alt='ExpImg' />" + // Ajusta la clase de la imagen
                    "<ul class='details' style='list-style-type: none;'>" +
                    "<li><span class='highlight'>Experiencia:</span> " + experience + "</li>" +
                    "<li><span class='highlight'>Fechas de reserva:</span> desde " + dateIn + " hasta " + dateOut + "</li>" +
                    "<li><span class='highlight'>Ubicación:</span> " + place + "</li>" +
                    "</ul>" +
                    "<p class='details'>Prepárate para vivir momentos emocionantes y crear recuerdos inolvidables. ¡Estamos ansiosos por tenerte con nosotros!</p>" +
                    "<a href='http://wonder-ventures-env.eba-fn8ccs8p.us-east-1.elasticbeanstalk.com/login' style='background-color: #EB5D09; color: white; padding: 15px 30px; font-size: 20px; text-decoration: none; border-radius: 5px;'>Ingresa a tu cuenta</a>" +
                    "</div>" +
                    "</body>" +
                    "</html>";




            helper.setText(htmlContent, true);

            // Enviar el correo
            mail.send(message);

            return new ResponseEntity<>("El correo se envió correctamente", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error al enviar correo", HttpStatus.BAD_REQUEST);
        }
    }



}
