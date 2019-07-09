package com.google.codeu.servlets;

import com.google.appengine.api.datastore.*;
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
  static final int PAGE_SIZE = 5;

  @Override
  public void init() {
  datastore = new Datastore();
  }
 
  /**
  * Responds with a JSON representation of Message data and cursor.
  */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
   throws IOException {
    FetchOptions fetchOptions = FetchOptions.Builder.withLimit(PAGE_SIZE);
    // If this servlet is passed a cursor parameter, let's use it.
    String startCursor = request.getParameter("cursor");
    if (startCursor != null) {
      fetchOptions.startCursor(Cursor.fromWebSafeString(startCursor));
    }

    // Grab messages and redirect to /feed.html if unsuccessful
    QueryResultList<Entity> results;
    PreparedQuery pq = datastore.getBatchMessages();
    try {
      results = pq.asQueryResultList(fetchOptions);
    } catch (IllegalArgumentException e) {
      response.sendRedirect("/feed.html");
      return;
    }

    String cursorString = results.getCursor().toWebSafeString();
    response.setContentType("application/json");
    List<Object> messages = new ArrayList<>();
    for (Entity entity : results) {
      try {
        String user = (String) entity.getProperty("user");
        messages.add(datastore.getMessage(entity, user));
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