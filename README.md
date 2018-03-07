# UdaciCards APP

To install and start the APP, run the following commands in this directory:

* `npm install`
* `npm start`


## Application features


### Main View

The main view shows a list of created decks which includes the name of each deck and the number of cards.


Pressing on a deck in the list will route to an individual deck view.

### Individual deck view

The individual deck view includes:

The deck title
Number of cards in the deck
Option to start a quiz for that deck
Option to add a new question to the deck

Pressing the 'Start a Quiz' or 'Create New Question' button properly routes to the correct views for those activities.

## Adding new deck

The view includes a form for creating a new deck - which should just be an input for the title and a 'Create Deck' button.

Pressing the button correctly creates the deck and routes the user to the Individual Deck view for the new deck.

### New card view

The New Question view includes a form with fields for a question and answer, and a submit button.

Submitting the form correctly adds the question to the deck.

### Quiz view

The Quiz view starts with a question from the selected deck.
The question is display, along with a button to show the answer.
Pressing the 'Show Answer' button displays the answer.
Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
The view displays the number of questions remaining.
When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

## Notifications

Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.

The app works correctly in either Android OR iOS devices (or emulator).

 Tested on physical device iOS 10 iphone 6. Seemed working correctly.


**Thank you for downloading please let me know in pm if you have any suggestions about the app**
# udaciCards
