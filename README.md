
# Introduction

[CollabWrite](https://collaboration-tool.vercel.app/) is my and [Divyesh Jain](https://hashnode.com/@Djain2511)'s submission for the Appwrite Hackathon.

We are excited to introduce a seamless and intuitive way for you to unleash your creativity and communicate your ideas visually.With our user-friendly interface, you can effortlessly create diagrams with a touch of your finger or the precision of your mouse.

Imagine having the freedom to brainstorm ideas, map out strategies, or present complex information in a visually captivating manner. Collaboration is at the heart of our app, allowing you to work seamlessly with others in real-time. Whether you're working on a team project or seeking feedback from colleagues, our app's collaborative features ensure that everyone is on the same page.

### Description

Collabwrite is inspired by a popular tool [Excalidraw](https://excalidraw.com/), which is a versatile and intuitive web-based tool that allows users to effortlessly create diagrams, sketches, and illustrations.

At its core, Collabwrite provides a blank canvas where users can draw and sketch using a variety of tools. The interface is clean and has a chat built into it to enable people to collaborate and brainstorm ideas (Thanks to Appwrite Realtime Database).

# Tech Stack

Frontend - [**NextJS**](https://nextjs.org/)

Styling - [**TailwindCSS**](https://tailwindcss.com/)

Backend & Auth & Database - [**Appwrite**](https://appwrite.io/)

Deployment - [**Vercel**](https://vercel.com/dashboard)

# Features

-   Use the canvas to draw to your heart's content. Create plans, diagrams, flowcharts, etc.
    
-   Go solo or collab with people to work together with you.
    
-   Collabwrite provides realtime editing so multiple people can work together on a canvas remotely and edit it simultaneously.
    
-   Chat with your teammates while working on your canvas on an inbuilt chat system, ask them for ideas or even better let them edit the canvas themselves.
    
-   Finally, download your canvas and use them anywhere
    

# The general flow of the application

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686607944692/e8a5602c-6b6a-46b8-b884-5a4fbfc71042.jpeg?auto=compress,format&format=webp)

_btw the above diagram is made using_ **_Collabwrite._**

It's simple, just drag your mouse and get the shape. Oooh, it even works with touch so it's compatible with your tablets too.

# Walkthrough

Demo Login Credentials:

email : [demo1@gmail.com](mailto:demo1@gmail.com), [demo2@gmail.com](mailto:demo2@gmail.com)

password: testpassword

### Creating an account

-   Head down to [https://collaboration-tool.vercel.app/login](https://collaboration-tool.vercel.app/login)
    
-   ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686608695814/069d6eac-d5e0-4c41-b7a9-249311b9c07c.png?auto=compress,format&format=webp)
    
-   You can either create an account or log in with the demo credentials. The Signup and Sign in actions are handled by Appwrite, so your credentials are secure.
    
-   Once you have signed up you will be automatically redirected to the dashboard.
    

### Navigating inside the dashboard

-   Once signed in you will be redirected to the dashboard page
    
-   ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686608972713/6627c89f-ed4e-46c9-8ac6-f76aa5b9d038.png?auto=compress,format&format=webp)
    
-   Once on the dashboard, you will be able to see your drawing boards.
    

### Creating a new project

-   To start a new project click on '+' button.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686609215055/0a8214a7-5d4c-4ec3-bea1-9f5d751c28a6.png?auto=compress,format&format=webp)
    
-   You'll be greeted with a simple form, either to create a solo project or collaborate with others.
    
-   If you want to go solo, just enter the project name and click on **Get Started** button
    
-   Since collaboration is the core of Collabwrite, we will go through the collab route.
    
-   Once you enter the name of the project, you'll be prompted to enter the collaborator's email (who has already registered on Collabwrite).
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686657141747/bc05d2cc-5908-4318-80ca-fab2bd374a33.png?auto=compress,format&format=webp)
    
-   If the user is available their email will automatically be shown, which upon clicking will automatically send them the invite.
    
-   The other user will receive a notification to accept or decline the invite.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686609857571/bc5a35f4-9e8c-482e-a0ba-4313930263eb.png?auto=compress,format&format=webp)
    
-   Upon accepting the request the user will automatically be added to the project.
    

### Drawing on the Canvas

-   Clicking on **Get Started** will launch the minimal canvas.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686610335814/ba310246-dbae-4a6b-bf47-606471d3904d.png?auto=compress,format&format=webp)
    
-   The canvas contains drawing tools like arrows, squares, circles, lines, diamonds, text, and freehand on the top.
    
-   The colour palette is situated on the left side.
    
-   The right side contains the chat which can be minimized to use the entire canvas space. (chat is disabled in solo mode cuz whom you gonna chat with anyway)
    

### Drawing on the canvas

-   Drawing on the canvas is pretty straight forward just click on the shape then select the color and start away.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686657993688/7d289414-0b52-4a6b-93a1-a2728e52fe2d.png?auto=compress,format&format=webp)
    

### Realtime Editing

One of the core features of Collabwrite is empowering numerous collaborators to engage in real-time editing on a project, drawing inspiration from the seamless collaboration experience of Figma.

Thanks to the incredible capabilities of Appwrite's realtime database, we have seamlessly integrated this remarkable feature into Collabwrite. To witness the magic in action, we invite you to explore the captivating video demonstration below.

https://www.youtube.com/watch?v=1AIm2VsOQE4

# Appwrite Integration

First of all, the [Appwrite documentation](https://appwrite.io/docs) is just awesome. Everything is crystal clear and easy to navigate.

### Auth

Connecting authentication with appwrite was super easy

### Database

All the project data, chat data and invitation data are stored in the appwrite database. Querying becomes easy with listDocuments() and getDocument()

### Realtime

Appwrite's realtime db allowed us to implement the chat and realtime editing feature. The data changes are used to manipulate the canvas as well as the chat.

# Challenges we faced

-   Working with the HTML Canvas API was not an easy task. Although we never gave Canvas much focus, but working on this project we understood how vast the HTML Canvas API is.
    
-   Drawing complex shapes on canvas was a problem because of the lack of tracing therefore we chose to stick with important shapes
    
-   We didn't know that we would have to implement touchEvents instead of mouseEvents to get the app working on mobile phones and tablets. Once we found out we had to make whole new changes to our mouseEvent handlers.
    
-   We had to deal with unexpected mouse behaviors so that our canvas does not continuously send data to the server
    
-   Figuring out in what format should we store our canvas data was also a challenge so we decided to stick with data:image format.
    

# Public code repo

-   Github - [https://github.com/heyyakash/CollaborationTool](https://github.com/heyyakash/CollaborationTool)
    
-   Website link - [https://collaboration-tool.vercel.app/](https://collaboration-tool.vercel.app/)
    

# Video demo

Here's a speedrun

https://www.youtube.com/watch?v=1AIm2VsOQE4

# Conclusion

Appwrite played a pivotal role in bringing our project to life, serving as the backbone that allowed us to meet our ambitious goals within the allotted timeframe. Without Appwrite, our vision would have been significantly more challenging to realize. Looking ahead, we are committed to further enhancing and expanding this project, recognizing its immense potential for future growth and innovation. We extend our heartfelt gratitude to [Appwrite](https://appwrite.io/) and [Hashnode](https://hashnode.com/) for granting us this incredible opportunity to leverage their platforms, which have proven instrumental in our success thus far. Their support has been invaluable, and we are excited to continue this collaborative journey together.
