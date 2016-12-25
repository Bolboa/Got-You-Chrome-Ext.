# Got-You-Chrome-Ext.
Want to do justice to those pesky little runts at the office that keep leaving pranks on your work computer while you're out for lunch?
Well say no more friend, this app will help you catch them in the act. They will think twice before messing with you next time.

##How To Use
* When the extension is first fired, there will be some instructions and input fields to enter an email and a password. This is necessary because the extension will connect to the user's email account. If the user has already done this step before, they can click on "Use same crendentials", and the extension will fetch the credentials used last from HTML5 local storage.

![Alt text](/images/step1.PNG)

* Once the user has submitted the credentials, the extension will try to connect to the user's email, if successful, it will then send an email to the user entitled "Thank You!". The user will then be redirected to the setup page.

* When the user clicks on setup, the extension will access the webcam. It is important that, once the button is clicked, the user should not move the mouse and just leave the computer as is. The extemsion injected a script to the page that waits until the mouse is moved, once it is moved, the webcam will take a picture of the culprit.

![Alt text](/images/step2.PNG)

* Once the mouse is moved, the webcam will take a picture of the culprit.

![Alt text](/images/step3.gif)

* The culprit was caught! He might think he can simply close the extension to remove the evidence, but precautions have been taken to prevent that. If the user checks their email, they will see the image in their inbox.

![Alt text](/images/step4.PNG)

##APIs
* Chrome API
* WebRTC

##Technologies
* React-Redux
* Go (server)
