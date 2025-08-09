package com.example.travelbuddybackend.models;

public class busDetailsModel {

    private Integer id;
    private String busNumber;
    private String busLine;
    private String busDepartureStation;
    private String busArrivalStation;
    private String busDepartureDate;
    private String busDepartureTime;
    private String busArrivalDate;
    private String busArrivalTime;
    private String busRideDuration;
    private String busRidePrice;

    public busDetailsModel() {}

    public busDetailsModel(Integer id, String busNumber, String busLine, String busDepartureStation, String busArrivalStation,
                           String busDepartureDate, String busDepartureTime, String busArrivalDate, String busArrivalTime,
                           String busRideDuration, String busRidePrice) {
        this.id = id;
        this.busNumber = busNumber;
        this.busLine = busLine;
        this.busDepartureStation = busDepartureStation;
        this.busArrivalStation = busArrivalStation;
        this.busDepartureDate = busDepartureDate;
        this.busDepartureTime = busDepartureTime;
        this.busArrivalDate = busArrivalDate;
        this.busArrivalTime = busArrivalTime;
        this.busRideDuration = busRideDuration;
        this.busRidePrice = busRidePrice;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusLine() {
        return busLine;
    }

    public void setBusLine(String busLine) {
        this.busLine = busLine;
    }

    public String getBusDepartureStation() {
        return busDepartureStation;
    }

    public void setBusDepartureStation(String busDepartureStation) {
        this.busDepartureStation = busDepartureStation;
    }

    public String getBusArrivalStation() {
        return busArrivalStation;
    }

    public void setBusArrivalStation(String busArrivalStation) {
        this.busArrivalStation = busArrivalStation;
    }

    public String getBusDepartureDate() {
        return busDepartureDate;
    }

    public void setBusDepartureDate(String busDepartureDate) {
        this.busDepartureDate = busDepartureDate;
    }

    public String getBusDepartureTime() {
        return busDepartureTime;
    }

    public void setBusDepartureTime(String busDepartureTime) {
        this.busDepartureTime = busDepartureTime;
    }

    public String getBusArrivalDate() {
        return busArrivalDate;
    }

    public void setBusArrivalDate(String busArrivalDate) {
        this.busArrivalDate = busArrivalDate;
    }

    public String getBusArrivalTime() {
        return busArrivalTime;
    }

    public void setBusArrivalTime(String busArrivalTime) {
        this.busArrivalTime = busArrivalTime;
    }

    public String getBusRideDuration() {
        return busRideDuration;
    }

    public void setBusRideDuration(String busRideDuration) {
        this.busRideDuration = busRideDuration;
    }

    public String getBusRidePrice() {
        return busRidePrice;
    }

    public void setBusRidePrice(String busRidePrice) {
        this.busRidePrice = busRidePrice;
    }

    @Override
    public String toString() {
        return "busDetailsModel{" +
                "id=" + id +
                ", busNumber='" + busNumber + '\'' +
                ", busLine='" + busLine + '\'' +
                ", busDepartureStation='" + busDepartureStation + '\'' +
                ", busArrivalStation='" + busArrivalStation + '\'' +
                ", busDepartureDate='" + busDepartureDate + '\'' +
                ", busDepartureTime='" + busDepartureTime + '\'' +
                ", busArrivalDate='" + busArrivalDate + '\'' +
                ", busArrivalTime='" + busArrivalTime + '\'' +
                ", busRideDuration='" + busRideDuration + '\'' +
                ", busRidePrice='" + busRidePrice + '\'' +
                '}';
    }
}
