/** 
 * The Clinic data type stores data about invididual clinics
 * CSV data is parsed into this data structure
 * 
*/

package com.google.codeu.data;
import com.opencsv.bean.CsvBindByName;
import java.util.Arrays;

public class Clinic {

    @CsvBindByName
    private double lat;
   
    @CsvBindByName
    private double lng;
      
    @CsvBindByName
    private String title;
      
    @CsvBindByName
    private String address;
      
    @CsvBindByName
    private String phoneNum;  
      
    @CsvBindByName
    private String services;
      
    @Override
    public String toString() {
      String [] service = services.split(";");

      return String.format("%f, %f, %s, %s, %s, %s ", lat, lng, title, address, phoneNum, Arrays.toString(service));
    }
  }