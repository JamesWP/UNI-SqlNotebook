
# Evaluation and Future developments

## Testing the project
  Testing is an important part of developing an application. The application in order to achieve its goals must function correctly and testing and verification ensures that each part of the system operates and does so correctly.

  The system was designed to be easily tested. The data store's interface which provides the methods that the application uses was tested at the beginning of each run of the application. The application would initialize and then perform the testing procedure. The testing procedure contained a simulation of a user performing some tasks, creating pages and adding content etc..

  After the system had finished running the user's commands the resulting UI could be checked against the expected output and in this way regression could be detected early. The javascript console also provides an excellent way to monitor the application for errors at runtime and debug to find the cause of the error.

## Evaluation

  For the application to be successful the requirements and use cases need to be evaluated against the application. The application will be successful if each of the requirements are met and the use cases can be shown to be completed by the users.

  For my evaluation I showed the application to the users and asked them to complete some simple tasks. The users had not seen the application before and also had not seen any of the data stored before. This test would show me how easy the application was to learn and also provide feedback on how real users interacted with the UI to find the information stored in the system.

  The testers were only told a bare minimum of what the application was supposed to do. The application should allow for the organization of data and code for a sql application.

  Overall the testers were all able to find the various functionality of the application by navigating the familiar UI features like the burger menu, "x" for closing windows etc... finding the save options was similarly found by all users.

  The tools for executing and saving the results from queries were also quickly learned by the users. This feature requires the most "clicks" in the application and so could be viewed as the most complicated feature however, the users rarely got lost and the actions flowed naturally to the users.

  The testers also made some comments on what features they would like to see in the future for the application. These future features will be discussed below.

## Future developments
  The application as it is can be used for daily work by sql developers and meets the requirements set out initially. However there are some features that did not fit into the schedule of remaining time. These features were not essential to completing a functional working application however, they would make the application more useful.

### Multiple database engines
  Currently the application only supports Microsoft SQL Server however with the addition of more middleware and a configurable settings window the application could be made to talk to any database server.

  This would enable the users to work on multiple systems across multiple database providers. It would also open the application to the users that solely use one of those databases.

### Query explanation
  The middleware supports a method to explain the objects referenced in a query. This functionality could be used to provide code completions and also more data when the objects are hovered on.

  The metadata could also be saved in the file when the page is saved. This would then be available when the page was loaded. This could provide extra context when looking into old queries.

### Different result formats
  The results from the queries are shown in a table. The results of queries are just arrays of n-tuples but they could represent more complex items like pi charts or folder hierarchies.

  There could be some automatic classification of results to decide the best way to display the results. Or failing that fall back onto manual selection for the results presentation.

### Resizable windows

  The workspace shows the open pages and there controls. Currently the application sizes these to have all the same width however, this might not be optimal for some files. The developer has no control over how they are presented. It would be a valuable feature of the system to be able to reorder and resize the windows for each open page. This would make the system more customizable for each user.
