package com.WonderVentures.Jwt;

import com.WonderVentures.Jwt.jwtService.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    //aca hacemos los filtros personalizados para el token

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String token = getTokenFromRequest(request);
        final String email;

        if (token==null)
        {
            filterChain.doFilter(request, response);
            return;
        }

        email=jwtService.getUsernameFromToken(token);
        if (email!=null && SecurityContextHolder.getContext().getAuthentication()==null)
        {
            UserDetails userDetails=userDetailsService.loadUserByUsername(email);

            if (jwtService.isTokenValid(token, userDetails))
            {
                UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }

        }

        filterChain.doFilter(request, response);


    }

    private String getTokenFromRequest(HttpServletRequest request) {
        // Este método nos devuelve el token
        // Recibe como parámetro el request, de donde sacaremos el token de su encabezado

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")){
            return authHeader.substring(7); // a partir del caracter 7 es el token, por eso lo extraemos
        }
        return null;

        //lo que hacemos aca es preguntar si el header tiene texto ya que el token es texto y tambien si el mismo comienza con la palabra bearer,
        //si esto es asi tendremos nuestro toquen y lo vamos a retornar, el 7 es el index del token, si no es asi retornamos null

    }


}
