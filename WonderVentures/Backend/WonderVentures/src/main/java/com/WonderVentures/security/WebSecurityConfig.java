package com.WonderVentures.security;


import com.WonderVentures.Jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig  {


    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;





    //aca trabajamos los endp que estab public o priv

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return

        http
                .csrf(csrf ->
                        csrf.disable())
                .authorizeHttpRequests(authRequest->
                        {
                            try {
                                authRequest //por ahora pongo permiteAlll a todas ya que necesito hacer pruebas, despues lo cambiamos
                                        .requestMatchers("/user/**").permitAll()
                                        .requestMatchers("/experience/**").permitAll()
                                        .requestMatchers("/administracion/**").permitAll()
                                        .requestMatchers("/enviarCorreo/**").permitAll()
                                        .requestMatchers("/images/**").permitAll()
                                        .requestMatchers("/category/**").permitAll()
                                        .requestMatchers("/reviews/**").permitAll()
                                        .requestMatchers("/bookings/**").permitAll()
                                        .anyRequest().permitAll();

                                         //aca decimos: para las rutas que sean /user blabla all y para todo lo demas,requiere authentication

                            } catch (Exception e) {
                                throw new RuntimeException(e);
                            }
                        }
                )
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class)
                .logout(log -> log
                        .logoutSuccessUrl("http://127.0.0.1:5173")).build();

    }


/*    return http
            .csrf((AbstractHttpConfigurer::disable))
            .authorizeHttpRequests(authRequest ->
            authRequest
                    .requestMatchers("user/**").permitAll() //permito todas las rutas (publicas)
                                        .requestMatchers("/user/login").permitAll()
                                         )
*//*                .formLogin().loginPage("/login/custome").permitAll()
                .and()*//*
                                                 .sessionManagement(sessionManager->
            sessionManager
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();*/



}
