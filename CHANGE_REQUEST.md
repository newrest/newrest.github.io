# CHANGE_REQUEST

This file tracks structured change requests for the project.

## Header

- Change Request ID: `CR-2026-07-14-002`
- User request summary: Contact email update, mobile menu icon change, scroll mode, and game-start interaction polish.
- Reference materials: `AORR.md`, `MEMORY.md`, repository files, attached request text
- Current state: `HITL_REQUIRED`

## Change Items

### CR-001

- Change Item ID: `CR-001`
- User request text: Update the contact section to use `newrest@gmail.com`.
- Request summary: Replace the placeholder contact text with a real email address.
- Request category: `CONTENT`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Update only the contact section copy and mailto link.
- Impacted files: `index.html`
- Allowed change scope: Contact section only.
- Proposed target behavior: The page displays `newrest@gmail.com` as the contact address.
- Verification approach: Inspect page text and link target.
- Regression scope: Contact layout and anchor behavior.
- Risk: `LOW`
- Human-check-needed item: `none`

### CR-002

- Change Item ID: `CR-002`
- User request text: Replace the mobile menu button with a hamburger icon.
- Request summary: Use a 3-line icon for the mobile navigation toggle.
- Request category: `UI_UX`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Add icon spans inside the existing menu button and style them as a hamburger.
- Impacted files: `index.html`, `styles.css`
- Allowed change scope: Mobile menu button only.
- Proposed target behavior: The mobile toggle appears as a hamburger icon while retaining the label for accessibility.
- Verification approach: Inspect button markup and mobile rendering.
- Regression scope: Navigation toggle visibility and alignment.
- Risk: `LOW`
- Human-check-needed item: `none`

### CR-003

- Change Item ID: `CR-003`
- User request text: Add scroll mode.
- Request summary: Improve page scrolling behavior for section navigation.
- Request category: `RESPONSIVE`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Add smooth scrolling with section snap alignment.
- Impacted files: `styles.css`
- Allowed change scope: Document and section scrolling only.
- Proposed target behavior: Sections feel easier to navigate without changing the page structure.
- Verification approach: Inspect CSS and scroll behavior in browser.
- Regression scope: Overall page flow and sticky header behavior.
- Risk: `LOW`
- Human-check-needed item: `none`

### CR-004

- Change Item ID: `CR-004`
- User request text: Make the game start when the game screen is clicked.
- Request summary: A click or tap on the game area should start the game immediately.
- Request category: `GAME_CONTROL`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Start the game on canvas click and on the first pointer interaction.
- Impacted files: `game.js`
- Allowed change scope: Game input behavior only.
- Proposed target behavior: Users can tap/click the game board to start playing.
- Verification approach: Inspect pointer/click handlers and interact with the board.
- Regression scope: Existing keyboard and touch direction controls.
- Risk: `LOW`
- Human-check-needed item: `none`

### CR-005

- Change Item ID: `CR-005`
- User request text: [사람 확인 필요] ambiguous snake-rule update from the review notes.
- Request summary: The request mentions a snake change, but the exact rule is unclear.
- Request category: `GAME_LOGIC`
- Current action: `HITL_REQUIRED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Do not change snake behavior until the rule is clarified.
- Impacted files: `[사람 확인 필요]`
- Allowed change scope: None until clarified.
- Proposed target behavior: `[사람 확인 필요]`
- Verification approach: `[사람 확인 필요]`
- Regression scope: `[사람 확인 필요]`
- Risk: `MEDIUM`
- Human-check-needed item: Clarify the exact snake-rule change requested by the user.

### CR-006

- Change Item ID: `CR-006`
- User request text: Add a randomly moving enemy to the snake game, make longer snakes win collisions, and add 50 points when the player wins.
- Request summary: Extend the snake game with a simple enemy snake and length-based clash resolution.
- Request category: `GAME_LOGIC`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Add a random-moving enemy snake, compare lengths on collision, award 50 points on player wins, and keep the rest of the game flow unchanged.
- Impacted files: `game.js`, `index.html`
- Allowed change scope: Snake game logic and explanatory notes only.
- Proposed target behavior: The game includes a moving enemy, longer snakes win clashes, and player victories add a 50-point bonus.
- Verification approach: Inspect the updated logic, confirm the rules text, and run local syntax/server checks.
- Regression scope: Existing food scoring, restart flow, keyboard controls, and mobile touch controls.
- Risk: `MEDIUM`
- Human-check-needed item: `none`

### CR-007

- Change Item ID: `CR-007`
- User request text: Make the enemy win clashes when lengths are equal, and make the enemy actively try to eat food while fleeing or pressuring the player depending on relative length.
- Request summary: Improve enemy snake AI and tie-breaking behavior.
- Request category: `GAME_LOGIC`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Update the clash comparison so equal length favors the enemy, and adjust enemy movement to prefer food while fleeing or hunting based on relative length.
- Impacted files: `game.js`, `index.html`
- Allowed change scope: Snake AI, collision resolution, and explanatory game notes only.
- Proposed target behavior: Equal-length clashes go to the enemy, the enemy chases food, and the enemy behavior shifts between escape and pressure depending on length.
- Verification approach: Inspect the updated logic and run local syntax/server checks.
- Regression scope: Player movement, restart flow, score handling, and mobile controls.
- Risk: `MEDIUM`
- Human-check-needed item: `none`

### CR-008

- Change Item ID: `CR-008`
- User request text: Add dark mode to the professional website.
- Request summary: Provide a dark color scheme for the site while preserving the existing layout and content.
- Request category: `UI_UX`
- Current action: `PASSED`
- Baseline action: `Preserve existing structure and isolate the minimum change`
- Implementation approach: Add a `prefers-color-scheme: dark` override and keep the same page structure.
- Impacted files: `styles.css`
- Allowed change scope: Color tokens and theme styling only.
- Proposed target behavior: The site automatically switches to a dark theme when the browser or OS prefers dark mode.
- Verification approach: Inspect the CSS theme variables and ensure the site still loads normally.
- Regression scope: Layout, navigation, and game styling.
- Risk: `LOW`
- Human-check-needed item: `none`

## Category List

- `BUG`
- `UI_UX`
- `RESPONSIVE`
- `PERFORMANCE`
- `CONTENT`
- `DOCUMENT_BASED_CONTENT`
- `INFORMATION_ARCHITECTURE`
- `MULTI_PAGE_STRUCTURE`
- `NAVIGATION`
- `GAME_LOGIC`
- `GAME_CONTROL`
- `GAME_ENTITY`
- `GAME_EFFECT`
- `GAME_STATE`
- `ACCESSIBILITY`
- `NEW_FEATURE`
- `SPEC_CHANGE`
- `REFACTOR`
- `DEPLOYMENT`
- `SECURITY`
- `UNKNOWN`

## Workflow

1. Capture the user request.
2. Split the request into one or more change items.
3. Assign a stable `Change Item ID` to each item.
4. Classify the item by category and risk.
5. Record current state and target state.
6. Derive the minimum safe implementation plan.
7. Execute one item at a time.
8. Verify the result and record the outcome.
9. Update `MEMORY.md` with the latest deployment, commit, and active loop.
10. Mark completed items as `PASSED`, unresolved items as `HITL_REQUIRED`, and blocked items as `BLOCKED`.

## Status Values

- `CHANGE_INTAKE`
- `CHANGE_PLANNED`
- `READY`
- `ACTING`
- `VERIFYING`
- `RETRYING`
- `PASSED`
- `BLOCKED`
- `HITL_REQUIRED`
- `DEPLOY_APPROVAL_REQUIRED`
- `DEPLOYED`
