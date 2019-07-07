package com.google.codeu.servlets;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.QueryResultList;
import com.google.codeu.data.Datastore;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Handles fetching all messages for the public feed.
 */
@WebServlet("/feed")
public class MessageFeedServlet extends HttpServlet{
  private Datastore datastore;

  @Override
  public void init() {
  datastore = new Datastore();
  }
 
  /**
  * Responds with a JSON representation of Message data for all users.
  */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
   throws IOException {
    QueryResultList<Entity> results = datastore.getBatchMessages(request, response);
    String cursorString = results.getCursor().toWebSafeString();

    response.setContentType("application/json");
    List<Object> messages = new ArrayList<>();
    for (Entity entity : results) {
      try {
        String user = (String) entity.getProperty("user");
        datastore.addMessage(messages, entity, user);
      } catch (Exception e) {
        System.err.println("Error reading message.");
        System.err.println(entity.toString());
        e.printStackTrace();
      }
    }
    messages.add(cursorString);
    Gson gson = new Gson();
    String json = gson.toJson(messages);
    response.getOutputStream().println(json);
 }
}