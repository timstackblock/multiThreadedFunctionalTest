# multiThreadedFuctionalTest
Playwright test cases for testing the load on https://platform.hiro.so/ by logging in multiple users.

### Prerequisites
- npm installed and Node v16.*
- The test cases assumes that the users have signed up and verified there email address.
- Google Chrome

### Steps to run
1. Make sure you have installed the node_modules
2. Run the command: ``` npm run test```
3. To add/remove user emails, change this file: https://github.com/imeerdev/multiThreadedFuctionalTest/blob/master/tests/mocks/index.ts

### Test cases
All the test cases are inside the folder `tests/`. All test case files follows the conventional structure of `.spec.ts`
