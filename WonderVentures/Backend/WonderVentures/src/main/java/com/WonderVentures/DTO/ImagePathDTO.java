package com.WonderVentures.DTO;


import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ImagePathDTO {
    private Long id;
    private String url;
    private String identificador;
    private Boolean isIcon = false;

}
