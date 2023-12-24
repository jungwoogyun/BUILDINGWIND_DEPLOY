//package com.example.demo.Polygon;
//
//import org.json.simple.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.ArrayList;
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/polygon")
//public class PointInPolygon {
//    public static class Point {
//        double x;
//        double y;
//
//        public Point(double x, double y) {
//            this.x = x;
//            this.y = y;
//        }
//    }
//
//    public static class Polygon {
//        List<Point> points;
//
//        public Polygon(List<Point> points) {
//            this.points = points;
//        }
//    }
//
//    public static boolean isPointInPolygon(Point point, Polygon polygon) {
//        int i, j, nvert = polygon.points.size();
//        boolean c = false;
//
//        for (i = 0, j = nvert - 1; i < nvert; j = i++) {
//            if (((polygon.points.get(i).y > point.y) != (polygon.points.get(j).y > point.y)) &&
//                    (point.x < (polygon.points.get(j).x - polygon.points.get(i).x) * (point.y - polygon.points.get(i).y) / (polygon.points.get(j).y - polygon.points.get(i).y) + polygon.points.get(i).x)) {
//                c = !c;
//            }
//        }
//        return c;
//    }
//
//
//    @GetMapping("/green")
//    public List<JSONObject> CreatePolygonGreen(){
//        List<Point> polygonCoordinates = new ArrayList<>();
//        polygonCoordinates.add(new Point(129.1622554, 35.1583793));
//        polygonCoordinates.add(new Point(129.1686927, 35.1590459));
//        polygonCoordinates.add(new Point(129.1758167, 35.1558881));
//        polygonCoordinates.add(new Point(129.1767179, 35.1684834));
//        polygonCoordinates.add(new Point(129.1627275, 35.1682028));
//        polygonCoordinates.add(new Point(129.1622554, 35.1583793)); // 마지막 지점을 시작 지점으로 추가하여 폴리곤을 폐포리곤으로 만듦
//
//        Polygon polygon = new Polygon(polygonCoordinates);
//
//        double step = 0.001;
//        List<Point> resultCoordinates = new ArrayList<>();
//
//        for (double lng = 129.15; lng <= 129.18; lng += step) {
//            for (double lat = 35.15; lat <= 35.18; lat += step) {
//                Point point = new Point(lng, lat);
//
//                if (isPointInPolygon(point, polygon)) {
//                    resultCoordinates.add(new Point(lng, lat));
//                }
//            }
//        }
//
//
//        List<JSONObject> list = new ArrayList<>();
//        // 결과 좌표 출력
//        for (Point resultCoordinate : resultCoordinates) {
//            System.out.println("Longitude: " + resultCoordinate.x + ", Latitude: " + resultCoordinate.y);
//        }
//
//        return null;
//    }
//
//
//
//}
