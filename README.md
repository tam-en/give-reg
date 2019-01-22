# Give Registry 

**This app is a work in progress and is not yet functional.** See "Changes still required for basic functionality."

The "Give Registry" allows users to request charitable donations in lieu of gifts to mark any type of occasion. It's an alternative to the kind of traditional "gift registry" used by wedding and baby shower organizers. But the Give Registry can be used for any kind of event, including

- Weddings or ceremonies of commitment.
- Birthdays
- Anniversaries
- Birth or adoption of a child
- Memorial
- Graduation or other life milestone

Users can create "events" to which they attach one or more "asks," which are requests in lieu of material goods. Asks can be user defined ("help me weed my garden") or specify a specific charity, which they can search for using a vast database of charitie, pulled from the Charity Navigator API. 



------

### give-reg database tables & associations

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



#### more tables . . .

| ask table attributes                           | & data types                     | give table attributes                        | & data types                     |
| ---------------------------------------------- | -------------------------------- | -------------------------------------------- | -------------------------------- |
| id                                             | integer/serial/<br />primary key | id                                           | integer/serial/<br />primary key |
| name                                           | string                           | amount                                       | decimal                          |
| desc                                           | text                             | message                                      | text                             |
| ***charityEIN***                               | string                           | ***askId***                                  | integer                          |
| ***eventId***                                  | integer                          | ***userId***                                 | integer                          |
|                                                |                                  |                                              |                                  |
| **models.ask.<br />hasMany(models.give)**      |                                  | **models.give.<br />belongsTo(models.ask);** |                                  |
| **models.ask.<br />belongsTo(models.charity)** |                                  | **models.give.<br />belongsTo(models.user)** |                                  |



#### and one more table . . .

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

------

### Planned views

| **file name**       | **path**                               | **contents**                                                 |
| ------------------- | -------------------------------------- | ------------------------------------------------------------ |
| home.ejs            | '/'                                    | landing page with overview of site purpose and links to login and signup. - appropriate attribution to Charity Navigator |
| login.ejs           | '/auth/login'                          | login form page                                              |
| signup.ejs          | '/auth/signup'                         | form to setup a new account                                  |
| profile.ejs         | '/profile/:id' (user.id)               | user info (update option)  - list of events already organized w/ details, links to their pages, button to edit  - form for starting a new event |
| event.ejs           | '/events/ eventsetup'                  | form for setting up or updating an event - list of current ask(s) for event - form to add a quick ask - options to add a charitable ask (button for api search or local table search) |
| event-public.ejs    | '/events/ event-public/:id' (event.id) | (public-facing landing page for event)  - info on event and organizer info on ask(s)  - form for pledging donations for an event (requires being signed in) |
| eventsearch.ejs     | '/events/ eventsearch'                 | display all events in the events table                       |
| charity-pick.ejs    | '/charities/ charity-pick.ejs'         | display all charities in the local charity table    button is pressed:   if no charities selected, flash msg "please select one or more charities to add them to a fundraising event"   if charities are selected . . .  if (!user) flash msg "please login or sign up to select charities" and redirect to login page (retain selection data to then redirect to event setup page? if ((user) && (!event)) redirect to eventsetup page, populating charity field if (user) && (event)) redirect to eventsetup page in progress, populating charity field |
| charity-search.ejs  | 'charities/charity-search.ejs'         | form for searching the charity navigator database            |
| charity-results.ejs | 'charities/charity-results.ejs'        | display search results in fixed-height div / scroll and checkbox next to each charity, button on top to add selected charity(ies) to a fundraising event . . .  similar logic to above? |
| profile-edit.ejs    | profile/profile-edit.ejs               | page/form for adjusting profile settings.                    |
|                     |                                        |                                                              |
|                     |                                        |                                                              |
| layout.ejs          |                                        | nav: - if not logged in: search events, login, signup, about - if logged in: search events, my dashboard, add event, about, logout |

### Charity Navigator

Working with the API:

The base URL for the Data API is:

**https://api.data.charitynavigator.org/v2**

All requests sent to the Data API require two query parameters for authentication:

- `app_id` is the identity of the application, which you can share freely as needed.

- `app_key` is a password for the application that you should protect carefully.

  

### Changes still required for basic functionality

1. Event.ejs page needs a "current asks" list, populated with a "findAll" on the "asks" table that pulls all asks where the eventId equals the id of the current event.
2. Currently 12 of the 16 routes required for the core program functionality are working, but the following four are not:

- Post route for the "quick ask" feature on the events/event.ejs page to add a basic ask to an event. Should re-render the event.ejs page, adding the ask to the "current asks" list.
- Need to add a button/route from event.ejs page to take user to a "charity-pick" page populated with the "popular charities" from the local charities table (charities from the Charity Navigator database picked by other users ).
- Need a route to a charity to an add. This must be triggered by a button on the charities/charity-pick.ejs pages.
- Need a route similar to the one described above, triggered by a button the the charities/ein.ejs page.
- Fix bug that causes and error if date is not submitted on the profile-edit.ejs page. 

### Other changes still required for MVP

- Much better formatting

### Changes required for version 2

- Add "give" functionality so that users can search others' events and create a "give" (i.e., a pledge) to fulfill one of the "ask" requests.
- public-facing Event page 
  
  

# Stretch goal notes (version 10?)

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

