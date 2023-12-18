package com.example.GeoByte.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "delivery_locations")
public class Location {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String longitude;

    private String latitude;

    private Number cost;
}
