# MEMORY

This file tracks the working state and guardrails for the GitHub Pages professional website project.

## Goal

- Complete a GitHub Pages-ready professional website.
- Support responsive desktop and mobile layouts.
- Implement a `Games` tab.
- Implement a snake game controllable by keyboard and mobile touch.
- Perform the first GitHub Pages deployment.
- Reflect any Step 1 `[게임 추가 기능:]` requirement in the game loop. If the requirement is not confirmed, mark it as `[사람 확인 필요]`.

## Required Deliverables

- `index.html` in the project root
- `styles.css`
- `script.js`
- Separate `game.js` if needed
- Required images and static assets
- `AORR.md`
- `MEMORY.md`

## Current Scope

- Static HTML, CSS, JavaScript
- Professional website content
- Responsive layout
- `Games` tab
- Snake game
- GitHub Pages deployment

## Out of Scope

- Backend server
- Database
- Login and sign-up
- Payments
- User personal-data collection
- External APIs without explicit approval
- Framework migration without explicit approval

## Current State

- Current status: deployed on GitHub Pages with baseline site and review polish changes; local enemy clash feature implemented and pushed
- Completed loops: repository inspection, `AORR.md` creation, `Self-Correcting TDD Loop` design, baseline scaffold loop, deployment, review polish, enemy clash feature
- Next loop: browser-level verification or follow-up clarification on the remaining ambiguous snake-rule note
- Current retry count: 0
- Current error fingerprint: none
- Blocker: none
- Last normal state: `READY`
- Current Git commit: `9ecb9d0`
- Current deployed URL: `https://newrest.github.io`
- Latest successful deploy: `537de24` / `Apply review polish changes`
- Latest user-visible change request: randomly moving enemy, length-based clash resolution, and player +50 bonus
- Active change request state: `PASSED` for CR-006; `HITL_REQUIRED` remains only for CR-005

## Guardrails

- Do not delete existing personal content without confirmation.
- Do not invent unverified career or project information.
- Do not delete or weaken tests.
- Do not print tokens.
- Do not store tokens in HTML, CSS, or JavaScript.
- Do not commit tokens to Git.
- Do not commit `github_token.txt`.
- Do not commit `env_settings.txt`.
- Do not add backend features.
- Do not perform large-scale refactors.
- Do not remove features just to make tests pass.

## Acceptance Criteria

- Root `index.html` exists.
- The site loads normally from a local static server.
- CSS and JavaScript load normally.
- No console errors remain.
- Desktop and mobile layouts are normal.
- `Games` tab navigates correctly.
- Snake game runs correctly.
- Keyboard controls work correctly.
- Mobile touch controls work correctly.
- Score and restart work correctly.
- GitHub Pages returns HTTP 200.
- The deployed site behaves the same as the local site for the same supported features.

## Retry Policy

- Maximum 3 retries per single error.
- Stop if the same error fingerprint repeats twice.
- Fix only one root cause per retry.
- Re-run the same verifier after each retry.

## HITL Conditions

- Personal profile content is unclear.
- Existing content must be removed.
- Requirements conflict.
- GitHub repository permissions are insufficient.
- GitHub Pages settings must change.
- An external service is required.
- Retry limit is reached.

## Tool Policy

- Codex owns work control, file edits, and test execution.
- Prefer Claude Code CLI as an independent verifier when available.
- Record the actual Claude model name used.
- Never allow token values to appear in execution logs.

## Execution Log Template

- Loop ID
- Start time
- Goal
- Start state
- Hypothesis
- Act
- Changed files
- Verifier
- Test results
- Exit code
- Error fingerprint
- Retry count
- End state
- Next action
- Human-check-needed items

## Operational Notes

- The repository currently contains `README.md`, `AORR.md`, and this file only.
- The project has moved from planning into implementation and the first GitHub Pages deployment is live.
- Any future implementation work must preserve the guardrails above.

## Execution Log

### Loop 01

- Loop ID: `LOOP-001`
- Start time: `2026-07-14`
- Goal: Build the safest baseline static website structure for GitHub Pages.
- Start state: `READY`
- Hypothesis: A minimal home/about/projects/games scaffold with responsive navigation will satisfy the safest first loop without touching the snake game.
- Act: Created `index.html`, `styles.css`, and `script.js` with root navigation, responsive menu toggle, and a visible `Games` section.
- Changed files: `index.html`, `styles.css`, `script.js`, `MEMORY.md`
- Verifier: `git diff --check`, file-content inspection, attempted PowerShell static server check, attempted Claude Code CLI review
- Test results: Root files and links are present; `git diff --check` passed; `index.html` includes stylesheet/script links, viewport meta, and `Games` section; local server attempt failed because `HttpListener` was not supported in this execution environment; Claude Code CLI review timed out
- Exit code: `0` for file and diff checks, `124` for Claude Code CLI review timeout, local server verifier returned an environment error inside the command
- Error fingerprint: `environment-http-listener-not-supported`, `claude-review-timeout`
- Retry count: `0`
- End state: `READY`
- Next action: Verify the enemy feature in a browser or clarify the remaining ambiguous snake-rule note
- Human-check-needed items: `[사람 확인 필요]` personal profile content, `[사람 확인 필요]` Claude model name actually resolved by CLI
### Loop 02

- Loop ID: `LOOP-002`
- Start time: `2026-07-14`
- Goal: Build the safest baseline static website structure for GitHub Pages and add the first functional snake game scaffold.
- Start state: `READY`
- Hypothesis: A preserved single-page profile layout with a visible Games section and a playable snake core is the safest next step toward the full requested site.
- Act: Expanded `index.html` with `Home`, `About`, `Projects`, `Experience`, `Research`, `Contact`, and `Games`; added `game.js`; extended `styles.css`; connected `script.js` to a mobile menu and `game.js` to the game board.
- Changed files: `index.html`, `styles.css`, `script.js`, `game.js`, `MEMORY.md`
- Verifier: `git diff --check`, file-content inspection, attempted PowerShell local static HTTP check, text search of key hooks
- Test results: `git diff --check` passed; required navigation and game hooks are present; local HTTP attempt failed because the ad-hoc PowerShell server returned malformed HTTP headers / protocol violations; no browser console run yet; Claude Code CLI review was not repeated in this loop
- Exit code: `0` for `git diff --check`; local HTTP verifier failed inside the command with protocol-violation errors
- Error fingerprint: `environment-local-http-server-header-protocol`
- Retry count: `0`
- End state: `READY`
- Next action: fix or replace the local server verifier, then do browser-level checks and refine personal content placeholders
- Human-check-needed items: `[사람 확인 필요]` personal profile content, `[사람 확인 필요]` Step 1 additional game feature, `[사람 확인 필요]` Claude model name actually resolved by CLI

### Change Request Notes

- Current request handling file: `CHANGE_REQUEST.md`
- Current request workflow state: `HITL_REQUIRED`
- Active request scope: clear the remaining ambiguous snake-rule note
- Rollback note: if a change request conflicts with the deployed site, prefer preserving the deployed baseline and record the conflict as `HITL_REQUIRED`

### Loop 03

- Loop ID: `LOOP-003`
- Start time: `2026-07-14`
- Goal: Apply the first reviewed change-request batch to the deployed static site.
- Start state: `ACTING`
- Hypothesis: The safest response to the review notes is to implement only the clear UI/content/input polish items and leave ambiguous snake-rule changes unresolved.
- Act: Updated the contact section to `newrest@gmail.com`, converted the mobile menu button to a hamburger icon, added section scroll snapping, and made the game start on game-board click/tap.
- Changed files: `index.html`, `styles.css`, `game.js`, `CHANGE_REQUEST.md`, `MEMORY.md`
- Verifier: `git diff --check`, source search for updated selectors and handlers
- Test results: Requested contact, menu, scroll, and click-start hooks are present; no browser run yet in this turn; ambiguous snake-rule change remains unresolved
- Exit code: `0` for `git diff --check`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED` for CR-001 through CR-004, `HITL_REQUIRED` for CR-005
- Next action: clarify the ambiguous snake-rule note or run browser-level checks
- Human-check-needed items: `[사람 확인 필요]` exact snake-rule change requested in the review notes
### Loop 04

- Loop ID: `LOOP-004`
- Start time: `2026-07-14`
- Goal: Add a randomly moving enemy to the snake game and resolve clashes by snake length.
- Start state: `ACTING`
- Hypothesis: A small enemy snake with length-based collision resolution can be added without disturbing the existing keyboard, touch, and restart flows.
- Act: Added a randomly moving enemy snake, collision resolution based on snake length, a +50 point bonus for player wins, and a short rules note in the game section.
- Changed files: `game.js`, `index.html`, `CHANGE_REQUEST.md`, `MEMORY.md`
- Verifier: `git diff --check`, bundled Node syntax check, bundled Python static server check
- Test results: `game.js` passed syntax check; `git diff --check` reported only line-ending warnings; local static server returned HTTP `200 OK`
- Exit code: `0`
- Error fingerprint: `none`
- Retry count: `0`
- End state: `PASSED`
- Next action: browser-level visual/gameplay verification or follow-up clarification if the remaining snake rule needs refinement
- Human-check-needed items: `[?щ엺 ?뺤씤 ?꾩슂]` remaining ambiguous snake-rule note from the earlier review request
