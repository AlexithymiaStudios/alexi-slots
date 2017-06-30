# Emoji-Slots Presentation Script

## Introduction
  - Introduce Jose, Quinn, Tyler, and Alana
  - Explain the basic concept of our project.
  - Talk about user scenarios
    - Bored Web Surfer (looking for a fun and easy game that he can play at work. He needs something that persists so he can close his window when his boss walks by).
    - Gambling Fan (looking for a real Vegas experience!)
    - Commuter with Tablet (wants a fun and easy game to play on hr commute that will persist so she can come back to it next time she's on the bus)

## Create a Single User
- Instructions
  - Explain starting values
  - Explain how a pair works
- (Create your first user)

## Change Emoji Set / Game Play
- (Show off all of the emoji sets until we hit zero)
- Talk about the animations
  - Background spinning colors
  - spinning emojis
  - winning animations
- Multiple clicks on the lever don't register while the animation is going
- We bring in dynamic values at the top of the page

## Reset Your Wallet
- When you run out of money, you're directed to reset your balance. When you do this, you're forced to reset all of your stats by recreating the user object
- Money is determined by total pairs, total rounds and jackpots via a moneyblanace function

## Make a Bunch More users
 - Talk through user creation process by creating a total of four users (one for each team member)

## Change Difficulty
- Show off easy mode.
  - For medium mode, on each spin, we shuffle the emoji deck and replace 1 of the emojis with a wildcard. For easy more, two emojis are replaced
- Each user's difficulty and emoji set is persisted per user. When you select another user, it shows that user's preferences below.

## Stats
- (make sure there are four users at this point and that they have different balances)
- We rank the users by money at top of stats pages
- we use chart.js to display interactive charts for each user

## Questions?
- Go set emoji set to team
- Spin once or twice.
- Ask for questions
