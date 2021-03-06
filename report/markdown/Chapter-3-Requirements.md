# Requirements

  The existing solutions have provided a basis for identifying the potential problems the system must overcome. Along with other sources and other base requirements a set of more formal requirements are listed below.

### Requirement 1
  The application must store notes about the application in various separate "files" within the system

  brief reason for why this is a requirement
### Requirement 2
  The "files" stored within the system must be able to store code and also notes in a format more easily read by humans.
### Requirement 3
  The application should be easily accessible from multiple operating systems not necessarily Microsoft Windows.
### Requirement 4
  The application should have the ability to view the results of queries executed on the system in table form.

  (Optional)
  The ability to detect the type of result and view it in a more suitable form. The more suitable form could be anything from a graph to folder structure to a specific viewer for xml documents.

### Requirement 5
  The application should have a mechanism for organizing related files in a hierarchy. Files that are about a part of the system should be stored in the same place in the system.
### Requirement 6
  The application should save the previous versions of the files stored within. These versions should allow editing and saving over newer versions if needed.
### Requirement 7
  The application should allow for multiple files to be open at once and viewed at the same time. This can be done in a free sized window mode or windows listed vertically or horizontally.
### Requirement 8
  The application should allow for searching for strings in files.

  (Optional)
  The ability to view in each of the search results, where the matched text is. And the ability to open the file from the search results.
### Requirement 9
  The application should allow for the easy comparison of the results of the queries. Historic results of the queries should be shown as a diff or side by side with newly executed

## Use cases of the system

  The use cases of the system will detail how the system is to be used by its users. The primary users of the system as discussed is the developers of the projects themselves. This restriction of the users of the system and their  interaction with it makes the system more simple to design as there are less interaction to model in the system.

### Use case 1
  Developer wants to document information about a development.

### Use case 2
  Developer needs to view all documents regarding a project stored in the system.

### Use case 3
  Developer needs to find reference to a particular item within the system but is unfamiliar with the specific location or other detail

### Use case 4
  Developer has to find specific details of a system previously worked on in order to maintain it.

### Use case 5
  Developer wants to view and compare previous versions of some code within the database

### Use case 6
  Developer want to view the history of the notebook. There is a particular entity of the system e.g. table that they want to view the history. i.e. how the entity has evolved in the past.

### Use case 7
  The developer wants to find the places a particular entity is used within the system to better understand how the changes planned could effect the system as a whole. AKA (impact analysis)[https://en.wikipedia.org/wiki/Change_impact_analysis].
  * cite impact analysis*
## Development priority of requirements
  Discussion of importance of requirements identified above, put into order and possibly identify partial fulfillment ideas
