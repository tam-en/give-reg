#Give Registry

The "Give Registry" allows users to request charitable donations in lieu of gifts to mark any type of occasion. Users can surf a vast database of charities, pulled from the Charity Navigator API, by category or organization name. Once they have selected a charity or charities, or entered information manually, they can create an event page that they can invite others to visit to read about their request, make a pledge, and leave a message. Types of potential events users might want to create registries for:

- Weddings or ceremonies of commitment.
- Birthdays
- Anniversaries
- Birth or adoption of a child
- Memorial
- Graduation or other life milestone

___


###give-reg database tables & associations

(foreign keys in ***bold/italic***)

| user table attributes                       | & data type                      | event table attributes                        | & data type                      |
| ------------------------------------------- | -------------------------------- | :-------------------------------------------- | -------------------------------- |
| id                                          | integer/serial/<br />primary key | id                                            | integer/serial/<br />primary key |
| firstname                                   | string                           | name                                          | string                           |
| lastname                                    | string                           | desc                                          | text                             |
| email                                       | string                           | date                                          | date                             |
| password                                    | string                           | url                                           | string                           |
| bio                                         | text                             | ***userId***                                  | integer                          |
|                                             |                                  |                                               |                                  |
| **models.user.<br />hasMany(models.event)** |                                  | **models.event.<br />hasMany(models.ask)**    |                                  |
| **models.user.<br />hasMany(models.give)**  |                                  | **models.event.<br />belongsTo(models.user)** |                                  |



####more tables . . .

| ask table attributes                           | & data types                     | give table attributes                        | & data types                     |
| ---------------------------------------------- | -------------------------------- | -------------------------------------------- | -------------------------------- |
| id                                             | integer/serial/<br />primary key | id                                           | integer/serial/<br />primary key |
| name                                           | string                           | amount                                       | decimal                          |
| desc                                           | text                             | message                                      | text                             |
| ***charityId***                                | integer                          | ***askId***                                  | integer                          |
| ***eventId***                                  | integer                          | ***userId***                                 | integer                          |
|                                                |                                  |                                              |                                  |
| **models.ask.<br />hasMany(models.give)**      |                                  | **models.give.<br />belongsTo(models.ask);** |                                  |
| **models.ask.<br />belongsTo(models.charity)** |                                  | **models.give.<br />belongsTo(models.user)** |                                  |



####and one more table . . .

| **charity table attribute** | **data type**              | **maps to api attribute**              |
| --------------------------- | -------------------------- | -------------------------------------- |
| id                          | integer/serial/primary key |                                        |
| ein                         | string                     | ein                                    |
| charityName                 | string                     | charityName                            |
| category                    | string                     | category.categoryName                  |
| cause                       | string                     | cause.causeName                        |
| tagline                     | string                     | tagLine                                |
| mission                     | text                       | mission                                |
| websiteURL                  | text                       | websiteURL                             |
| charityNavigatorURL         | text                       | charityNavigatorURL                    |
| irsSubsection               | string                     | irsClassification.subsection           |
| streetAddress1              | string                     | streetAddress1                         |
| streetAddress2              | string                     | streetAddress2                         |
| city                        | string                     | city                                   |
| state                       | string                     | stateOrProvince                        |
| postalCode                  | string                     | postalCode                             |
| country                     | string                     | country                                |
| currentRating               | string                     | currentRating.score                    |
| stars                       | string                     | currentRating.ratingImage.large        |
|                             |                            |                                        |
| deductibility               | string                     | irsClassification.deductibility        |
| dStreetAddress1             | string                     | donationAddress.streetAddress1         |
| dStreetAddress2             | string                     | donationAddress.streetAddress2         |
| dCity                       | string                     | donationAddress.city                   |
| dState                      | string                     | donationAddress.stateOrProvince        |
| dPostalCode                 | string                     | donationAddress.postalCode             |
| dCounty                     | string                     | donationAddress.country                |
|                             |                            |                                        |
|                             |                            | **models.charity.hasMany(models.ask)** |

___

###Views

| file name           | **path**                                  | contents                                                     |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| home.ejs            | '/'                                       | - landing page with overview of site purpose and links to login and signup.<br />- appropriate attribution to Charity Navigator |
| login.ejs           | '/auth/login'                             | login form page                                              |
| signup.ejs          | '/auth/signup'                            | form to setup a new account                                  |
| profile.ejs         | '/profile/:id'<br />(user.id)             | - user info (update option) <br />- list of events already organized w/ details, links to their pages, button to edit <br />- list of any pledges user has made to events <br /> |
| eventsetup.ejs      | '/events/<br />eventsetup'                | - form for setting up or updating an event<br />- form to include message to potential givers<br />- options for specifying a charity beneficiary:<br />    - link to page to view <br />- option to delete event |
| event.ejs           | '/events/<br />event/:id'<br />(event.id) | - (public-facing landing page for event) <br />- info on event and organizer info on ask(s) <br />- form for pledging donations for an event (requires being signed in) |
| eventsearch.ejs     | '/events/<br />eventsearch'               | display all events in the events table                       |
| charities.ejs       | '/charities/<br />charities.ejs'          | display all charities in the local charity table . . . fixed height div with checkbox next to each, button on top to add selected charities to a fundraising event.<br /><br />button is pressed:<br /><br />if no charities selected, flash msg "please select one or more charities to add them to a fundraising event"<br /><br />if charities are selected . . . <br />if (!user) flash msg "please login or sign up to select charities" and redirect to login page (retain selection data to then redirect to event setup page?<br />if ((user) && (!event)) redirect to eventsetup page, populating charity field<br />if (user) && (event)) redirect to eventsetup page in progress, populating charity field |
| charity-search.ejs  | 'charities/charity-search.ejs'            | form for searching the charity navigator database            |
| charity-results.ejs | 'charities/charity-results.ejs'           | display search results in fixed-height div / scroll and checkbox next to each charity, button on top to add selected charity(ies) to a fundraising event . . .  similar logic to above? |
|                     |                                           |                                                              |
|                     |                                           |                                                              |
|                     |                                           |                                                              |
| layout.ejs          |                                           | nav: - if not logged in: search events, login, signup, about<br />- if logged in: search events, my dashboard, add event, about, logout<br /> |

---
# Charity Navigator 

Working with the API:

The base URL for the Data API is:

**https://api.data.charitynavigator.org/v2**



## Authentication

All requests sent to the Data API require two query parameters for authentication:

- `app_id` is the identity of the application, which you can share freely as needed.
- `app_key` is a password for the application that you should protect carefully.



# Organizations to use for seeding

American Cancer Society, EIN 131788491

American Red Cross, EIN 530196605



#Stretch goal notes

- make the amount of a pledge visible/invisible per user choice
- add goal attribute to ask table
- calculate pledge total per ask (display on event page & on user dashboard)
- allow event organizer to add administrators
- update messages for event (message its own table with attributes for message text, date, and foreign key to event.id)
- event/:id page includes information on who has given and how much has been raised
- eventsetup.ejs: features to close pledges.
- feature that allows event organizer to invite pledges via e-mail, or at least enter e-mails of invitees that will add an invitation flag of some kind to the profile page of that user if they are already in the system (e.g., under the submitted email address)
- some way for event organizer to thank pledgers?
- default image for various events, or allow user to pick?
- make sure charities in local database update w/ data from Charity Navigator? Can display the createdAt/updatedAt dates from local table?
- more than one user administering an event . . . perhaps structured as eventCreator with that user optionally designating multiple co-administrators with certain privileges
- give from more than one user (e.g., family member)
- charity-search page: allow users to search on cause name. Bonus points for dynamically pulling list from API for a drop-down menu. Even more bonus points for autofill. 

