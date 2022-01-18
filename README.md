<h1>TA Portal</h1>

<p>
TA Portal is a Web Application build for College of Computer Science (CCIS) at Northeastern University during Managing Software Development (MSD) Course
Using this application, Admins(Professors, Senior Faculty) can create Teaching Assistant positions. They can also review the applications based on grades and weather a student has been TA before etc, set application status, application deadlines etc.
The users i.e., students, have to register to this portal to apply for TA Positions. Students must upload resumes and fill basic profile information and can apply for TA Positions
</p>


### Test accounts
student: sesha
faculty: faculty
admin: admin

### MongoDB commands
```shell script
show dbs; ## shows list of databases
use <dbname>;
show collections; ## shows list of table
db.taportal.user.find().pretty() ## prints a table

## Update user type to admin
 db.taportal.user.update({username: 'admin'}, {$set: {usertype: 'admin'}}, false, true)
 
```


<h2>Live instance of the project
</h2>
<p>https://ta-portal.herokuapp.com/ </p>


<h2>Youtube demo</h2>
<a href="https://youtu.be/ZEoNRj-WUsA" > Video Link</a>

<h2>Required Installations on local machine</h2>
<img src="https://excellentwebworld.com/wp-content/uploads/2017/09/images-3.jpg" height=190px>

<ol>
  <li>nodeJs</li>
  <li>MongoDB</li>
  <li>ExpressJS</li>
</ol>  





<h2>To run this on your machine, you must</h2>
<ol>
  <li>Uncomment line 33 and comment line 32 in server.js</li>
  <li>Comment lines 14 to 18 in user.service.server.js﻿</li>
  <li>You can run the project by running "node server.js"</li>
</ol>  

 
<h2>Environment Variables</h2>
<p>To enable third party log in </p>
<ol>
  <li>GOOGLE_CLIENT_ID</li>
  <li>GOOGLE_CLIENT_SECRET</li>
  <li>GOOGLE_CALLBACK_URL</li>
</ol>  


<h3>Useful Links </h2>
<ul>
  <li><a href="https://drive.google.com/file/d/0B-6TLW-AJILFZmEtV2RGZE0xdk0/view?usp=sharing">Student use cases with diagrams</a></li>
  <li><a href="https://drive.google.com/file/d/0B-6TLW-AJILFY2UzMVZ4U192YTA/view?usp=sharing">Faculty user use cases with diagrams</a></li>
  <li><a href="https://drive.google.com/file/d/0B-6TLW-AJILFMDRNZVJZQTBnaEk/view?usp=sharing">Admin user use cases with diagrams</a></li>
  <li><a href="https://drive.google.com/file/d/0B-6TLW-AJILFaDZQeVI4aFcwUFE/view?usp=sharing">Project Description</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFVnFLWVZIY3pOQVE">Project setup on local machine</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFa3J0clFxSFMtN3M">Sequence Diagrams</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFUWZmTVFFQnVzcUE">MongoDB</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFWEVobUttYTVsUWc">Mobile Friendly usage</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFNDh6N0JVOHBtcWc">Pushing to AWS</a></li>
  <li><a href="https://drive.google.com/open?id=0B-6TLW-AJILFTlRWZ0dWLXdHLWc">UML Diagram</a></li>
</ul>


<h2>Copyright</h2>
<p style="font-size:50%;">Copyright 2016, Sesha Sai Srivatsav, All rights reserved.</p>
 

<p style="font-size:50%;">Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

<p style="font-size:50%;">The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.</p>
