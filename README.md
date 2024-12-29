# Introduction

This is Udemy – Django And React Build a Multi-vendor E-commerce Website ###-###

Step by Step Guide - E-commerce Website using
React and Django
SECTION ###- STORE FRONT

## Create new django project

● Install latest python version or ###5
● Create New Folder called Django React E-commerce
● In the folder, create two new folders called, backend and frontend
● CD into backend and create a virtual environment - python -m venv venv
● Activate the virtual environment - venv\Scripts\activate or
venv\bin\activate or source venv/bin/activate
● Install Django - python -m pip install Django==###2
● Create a Django project in current folder - django-admin startproject
backend .
● Install Required Packages - pip install
djangorestframework==######django-cors-headers==###0
djangorestframework-simplejwt==######PyJWT==###0
● Create requirements.txt - pip freeze > requirements.txt or pip
freeze -> requirements.txt
● Create new app userauths, store, vendor, customer - python manage.py
startapp app_name
● Create a .gitignore file and add the files to be ignored
● Install Apps in settings.py
● Run Python Manage.py Runsever

### Setup Django Admin

● Install Django Jazzmin
● Add Jazzmin to settings.py INSTALLED apps Section
● Configure Jazzmin Settings
● Configure Jazzmin UI Tweaks
● Create Superuser
● Migrate Database
● Login to the admin section.

### Configure Templates and Static Files

● Configure template configuration in TEMPLATES Section settings.py
● Create a new folder under Templates.
● Configure the static and media files in settings.py and urls.py
● Create media and static folders.
● Copy All Static Files and Add to static folder

### Setup React

● Install Node
● Create new react app using vite.js (for better performance and load time)

### `yarn create vite . --template react`

● Install primary react packages/dependencies (Check package.json)

### `yarn add axios dayjs jwt-decode js-cookie react-router-dom zustand`

● Spin up the dev server - Tada!!

### `yarn dev`

### Create Django Custom User Model and Profile

● Create Custom user and profile models in core.models

### `pip install shortuuid`

● Register Model in Admin and Add filters, Displays, etc.
● Run Migration Commands
● Test Model in Django Admin Panel

### Custom User Model and Profile Serializer

● Create Custom user and profile models in core.models
● Register Model in Admin and Add filters, Displays, etc.
● Run Migration Commands
● Test Model in Django Admin Panel

### Discuss About Django JWT Authentication

● Discuss JWT Authentication
● Setup Settings.py jwt

### Setup Login Serializer

● Create MyTokenObtainPairSerializer Class to generate and refresh token

### Setup Registration Serializer

● Create Registration Serializer Class to register users.

### Token Obtain Pair and Registrations View

    ● Create token and registration views
    ● Register Views in URLS.py
    ● Test In Browser

### Generate Robust Documentation using DRF-Yasg

    ● Generate docs using drf-yasg
    ● pip install drf-yasg
    ● Add drf_yasg to installed apps
    ● In main urls.py import the snippets for creating the yasg

### Setting Up React.JS - Login, Register and Logout

    Requirements

### Make sure you have node.js installed

### Yarn is recommended as package manager. You can simply type

    npm install --global yarn to install yarn

### Any IDE, VS Code recommended

### Git version control (optional but recommended)

    ● CD into frontend folder
    ● Create new project using vite.js
    Why Vite and Not Create React App?
    Using Vite to set up a React project is often a better choice than Create React App
    (CRA) for a simpler reason – speed and efficiency. Vite's development server is
    notably faster, meaning you spend less time waiting for your changes to take effect.
    It also creates smaller, more efficient code bundles, which results in faster page
    loads for your website visitors. Vite's configuration is straightforward, and it doesn't
    include unnecessary code for older browsers, which can make your site faster and
    more modern. Additionally, Vite is designed to work well with both Vue and React,
    offering you a fast and versatile tool for building web applications. Ultimately, it's
    about choosing a tool that makes your development process faster and smoother.
    npm install --global yarn
    yarn create vite . --template react
    yarn
    yarn add axios dayjs jwt-decode js-cookie
    react-router-dom@######zustand
    yarn add -D simple-zustand-devtools prettier
    yarn dev
    Let’s Continue:
    It's convenient when user information is saved in a place, like a storage
    space, so we can easily get it whenever we want. This creates a single,
    reliable source of truth. For example, if we look for a user and find nothing, it
    means the user is logged out. If we find the user's information, it means
    they're logged in. A package called Zustang will helps us do this easily.
    ● For creating a zustang user store. Create a folder in src named store &
    create a file named auth.js inside it.
    This store keeps track of user info, such as whether they're logged in or not.
    You can use a user function to find out the ID and username of the logged-in
    user. Once everything is set up, you can use DevTools to check the store's
    info in real-time.
    Now, let's create utility functions that we will require for authentication
    purpose.
    We will create utils folder inside src folder.
    We will create ###files, auth.js axios.js constants.js useAxios.js
    Let's simplify this code in auth.js:
    Login: This part needs a username and password. If the user exists in the
    database and the credentials are correct, they get logged in. We also save
    access and refresh tokens in a cookie.
    Register: Here, we need a username, password### and password### It's how a
    user signs up. We check if the username is unique, and the passwords match
    on the server. If everything goes well, the user is automatically logged in.
    Logout: This one simply logs the user out and erases their cookie.
    Other Changes: When things like auth tokens and loading state change, the
    user's status is updated. We use useEffect to make this happen. The
    jwt_decode function is used to decode an access token.
    Using useAxios.js for Managing Access Tokens
    Issue: Access tokens have a short lifespan, meaning they're valid for only a
    brief period. After they expire, users can't access private parts of the
    application.
    Solution: To address this problem, we need a way to check if the access
    token is still valid before sending a request to the server. If it's not valid, we
    should request a new token using a refresh token. Once we get a new
    access token, we can use it for API requests to private routes. If the token is
    valid, we can simply use it for the request.
    How to Implement: We can solve this issue by using the axios library, which
    provides interceptors. These interceptors allow us to examine and modify
    requests before they are sent to the server. Therefore, we should use axios
    when making calls to private APIs. Additionally, if we obtain a new access
    token, we need to update our application's state. To streamline this, we can
    utilize a React Custom Hook.
    Our Application will have ###routes
    /login
    /register
    /
    /protected — Private Route
    /logout — Log user out
    If the user is logged in, they only should be able to access the private route,
    otherwise they should be redirected to the Login Page. We require a private
    route component that will make this possible.
    Create a folder at frontend root, named layouts add these ###files in it.
    MainWrapper.jsx & PrivateRoute.jsx
    The MainWrapper is like a big container that holds the whole app together.
    It's the one that tells the app who the user is.
    PrivateRoute is like a security guard. It checks if the user is logged in. If they
    are, it lets them go to the page they want. If not, it sends them to the login
    page.
    Now that we've done the tough part, we need to use this in the app. We
    need to make pages and parts of the app.

### Password Reset (API)

    ● Create API to fetch user and send password email
    ● Configure API in url

### Password Reset (Client)

    ● Create component to send email to server
    ● Create onChange and onSubmit handlers

### Create Password (API)

    ● Create API to fetch password and related auth data
    ● Verify is user exists and token is valid
    ● Reset password
    ● Configure API in url

### Create Password (Client)

    ● Create component to create new password
    ● Form-data and send it to bak

### Configure Template In React

    ● Add Bootstrap CDN to index page
    ● Install Bootstrap and Express into project
    ### `yarn add express`
    ### `yarn add bootstrap@v5.3.3`
    ● Create Header and Footer
    ● Import the Home page
    ● Override the register, login and logout page

### Create Store Model In Django

    ● Create Store, CartOrder, CartOrderItems, Wishlist and Other required
    ● Register Models In Admin
    ● Test In Model

### Serialize Store Model In Django

    ● Serialize Models In Admin

### Create API to list Category, Product and Product Detail

    ● Write View to list all published products from the database
    ● Write another view to get and show product detail
    ● Configure views in URLs

### Create React Function for Addon

    ● On the HomePage list all products via rest api

### List Product using React

    ● On the HomePage list all products via rest api

### Get Product Detail using React

    ● On the HomePage list all products via rest api

### Add Product to Cart (API)

    ● Create new django api to add product to cart
    ● Configure API in URLs

### Get User Country and Location

    ● Create a new folder in view called plugin
    ● THen create a new file called UserCountry.jsx
    ● Write and export function to get user country

### Get Logged In User Data

    ● Create a new folder in view called plugin
    ● THen create a new file called UserCountry.jsx
    ● Write and export function to get user country

### Create and Set User Cart ID

    ● Create a new folder in view called plugin
    ● THen create a new file called UserCountry.jsx
    ● Write and export function to get user country

### Add Product to Cart (Client Product Detail)

    ● Write function to handle color, size and input change
    ● Create new function to addToCart()

### Add Product to Cart (Client Product List)

    ● Write function to handle when a color, size or input button is clicked or
    changed
    ● Update the state with the required values
    ● Send the data to the addToCart() data

### Fetch Cart Total Items Count (API)

    ●

### Fetch Cart Total Items Count (Client)

    ● Write function to handle when a color, size or input button is clicked or
    changed
    ● Update the state with the required values
    ● Send the data to the addToCart() data

### Cart List View (Client)

    ● In src>views>shop create a new file called Cart.jsx
    ● Import cart.html template to the new Cart.jsx
    ● Import needed plugins and packages
    ● Write code to fetch cat data from the api and display it in template

### Update Cart

    ● In Cart.jsx write code run to get cart data
    ● Update cart by sending data back to the addToCart() function

### Fetch Catch Total (API)

    ● In store.views, write an API view to get cart total
    ● Register this views in urls
    ● Test API

### Fetch Catch Total (Clients)

    ● In Cart.jsx, fetch the cart total via the CartDetail Api View
    ● Update the jsx with the new data

### Remove From Cart (API)

    ● Write API to delete item from cart
    ● Check if user is authenticated or not
    ● Configure the url
    ● Test with RestMan

### Shipping Details (Client)

    ● Write a function to get all shipping address and set it to the state

### Create Order View (API)

    ● Write a function to get payload from frontend and create a new order
    ● Calculate the required information and validate data

### Create Order (Client)

    ● Using react, create a new function to create order
    ● Make all shipping and personal information required

### Checkout Page (API)

    ● Create a new checkout view api to list get the user order based on the order
    oid
    ● COnfigure the URL

### Checkout Page (Client)

    ● Create a new checkout page in react, configure the checkout page url
    ● Fetch the order details from the checkout view API
    ● Populate the template with the required Information

### Coupon (API)

    ● Write a function to get vendor coupon and remove the discount from the
    item
    ● Configure URL

### Coupon (Client)

    ● Using react, apply coupe discount

### Stripe Payment (Client and API)

    ● Using react, make a stripe payment on the frontend and send the data to
    backend for validation.
    ● Implement Webhook to get event data in real-time
    ● Validate payment and set order status if payment is successful

### Success Page (API)

    ● Write a view to fetch completed and paid order
    ● Configure the API

### Success Page (Client)

    ● Using React, create a success page after payment
    ● Configure the URL
    ● Fetch the order data from API
    ● Populate the JSX Template

### Invoice (Client)

    ● Using React, create an invoice page after payment
    ● Configure the URL
    ● Fetch the order data from API
    ● Populate the JSX Template

### Send Order Email (API)

    ● Setup Mailing System
    ● Send order confirmation and summary to buyer
    ● Send Order Items Email to Vendor
    ● COnfirm that email is sent
    ● Test

### Paypal Payment (Client and API)

    ● Using react, make a flutter wave payment on the frontend and send the data
    to backend for validation.
    ● Implement Webhook to get event data in real-time
    ● Validate payment and set order status if payment is successful

### Create Review (API)

    ● Write API to get data from payload
    ● Use data to get user and product
    ● Create a new review using the payload data
    ● Test API

### Create Review (Client)

    ● Create a createReview State
    ● Create a handleReviewChange
    ● Configure Input Fields, Forms and button
    ● Create new form-data, append the value and send to api

### List Review (API)

    ● Create a view ListAPIView to fetch reviews based on product id
    ● Configure view in URLs
    ● Test In Browser

### List Review (Client)

    ● Fetch product review via ListAPIView
    ● Set the values to the state
    ● Iterate over the review and render the data in the jsx template
    ● Test

### Search (API )

    ● Create a new function to search products based on query
    ● Configure new view in urls.py

### Search (CLient)

    ● Create a new search component
    ● In store header, create search handlers, append query in url
    ● Send data to backend and return data to frontend.
    SECTION ###- BUYER DASHBOARD

### Account Page

    ● Configure Customer Template and Components
    ● Fetch User Profile and Show Data in Sidebar
    ● Configure the Account Page

### Order Page (API)

    ● Create new api to list orders
    ● Configure the API endpoint

### Order Page (Client)

    ● Fetch Orders From API
    ● Configure the Account Page

### Order Detail Page (API)

    ● Create new api to get single order
    ● Configure the API endpoint

### Order Detail Page (Client)

    ● Fetch Orders Detail From API
    ● Configure the Order Detail Page

### Add To Wishlist (API)

    ● Create new api to get create a wishlist
    ● Configure the API endpoint

### Add To Wishlist (Client)

    ● Create a new function in plugin directory for addToWishlist
    ● Write the function to add items to wishlist
    ● Configure the required button to call the function

### List Wishlist (API)

    ● Create new api to get list items from wishlist for a user
    ● Configure the API endpoint

### List Wishlist (Client)

    ● Create a new wishlist component
    ● Fetch Wishlist Items from API
    ● Map through fetched items and display data in jsx template

### Create Notification (API)

    ● Create a new function to send notifications

### Customer List Notification (API)

    ● Create a new class to list customer notification
    ● Configure URL endpoints

### Customer List Notification (Client)

    ● Create a new class to list customer notification
    ● Configure URL endpoints

### Update Customer Account Detail (API)

    ● Create a new class to list customer notification
    ● Configure URL endpoints

### Update Customer Account Detail (Client)

    ● Create a new class to list customer notification
    ● Configure URL endpoints
    SECTION ###- VENDOR DASHBOARD

### Dashboard Page (API)

    ● Write API to fetch Vendor Stats
    ● Write API to fetch Orders and Products
    ● Configure API Endpoint in URLs.py
    ● Test In Browser

### Dashboard Page (Client)

    ● Configure Customer Template and Components
    ● Fetch Stats, Products and Orders From API

### Dashboard Charts.JS (API)

    ● Create API to fetch generate chart data for products and order
    ● Configure endpoint

### Dashboard Charts.JS (Client)

    ● Fetch Chart-data for orders and products
    ● Populate Line chart with data

### Products Page (API)

    ● Write API to fetch vendors product
    ● Configure URL

### Products Page (Client)

    ● Create product page and register url in App.js
    ● Fetch Products from API
    ● Display items in jsx template

### Add New Product (Client)

    ● Create a new component for add product form
    ● Register Component in App.js
    ● Write code to create fields dynamically
    ● Write code to remove dynamic fields
    ● Compile data to be sent to backend
    ● Create new form-data and appends necessary data
    ● Post to backend API

### Add New Product (API)

    ● Create a new CreateView APi
    ● Override the perform_create method
    ● Parse data received from frontend payload
    ● Loop through items and save necessary items to the database
    ● Override the save nested data to save the new nested data

### Update Product (Client)

    ● Create a new component for update product form
    ● Register Component in App.js
    ● Import most re-useable code from AddProduct.js
    ● Compile data to be sent to backend for update
    ● Create new form-data and appends necessary data
    ● Post to backend API

### Update Product (API)

    ● Create a new UpdateView APi
    ● Override the update method
    ● Delete other nested data in the database
    ● Loop through new or old items and save necessary items to the database
    ● Override the save nested data to save the new nested data

### Delete Product (API)

    ● Create a new DestroyView APi
    ● Fetch Product that is to be delete
    ● Delete the product using delete method

### Delete Product (Client)

    ● Create a new DestroyView APi
    ● Fetch Product that is to be delete
    ● Delete the product using delete method

### Filter Product (API)

    ● Create a new function to filter product
    ● Get Param from url that was sent from react
    ● Use Param to filter product
    ● Return the filtered product

### Filter Product (Client)

    ● Create a new function to handle Product Filter
    ● Pass the url param dynamically
    ● Make a get request to an API server

### Order List (API - Already Exists)

    ● Create a new Order List api for vendor or used existing API
    ● Configure the view in the url
    ● Test

### Order List (Client)

    ● Fetch the new orders via the order list api view
    ● Set the values to the state
    ● Iterate over the orders and render the data in the jsx template
    ● Test

### Order Detail(API)

    ● Create a new Order RetrieveApiView
    ● Configure the view in the url
    ● Test

### Order Detail(Client)

    ● Create a new component for vendor order details
    ● Use the customer order detail page
    ● Get and set order item in state
    ● Render Order
    ● Iterate over the order items and render the data in the jsx template
    ● Test

### Earning(API)

    ● Create a new Earning ListApiView
    ● Configure the view in the url
    ● Test

### Monthly Earning(API)

    ● Create a new Monthly Earning List (fbv so we can use it for chart)
    ● Configure the view in the url
    ● Test

### Earning(Client)

    ● Fetch the new earning data via the earning list api view
    ● Set the values to the state
    ● Render Required Data in the frontend

### Review List (API)

    ● Create new LIst API View to fetch all vendors reviews
    ● Register this view in the url

### Review Detail (API)

    ● Create new Retrieve API View to fetch specific vendor review
    ● Register this view in the url

### Review List (Client)

    ● Create a new component to fetch all vendors reviews
    ● Set review to state
    ● Render review in the template

### Review Detail (API)

    ● Create a new component to fetch all vendors reviews
    ● Set review to state
    ● Render review in the template

### Review Reply (Client)

    ● Create a new handlers to change reply and submit
    ● Create a new form to submit reply
    ● Attach the reply function to form

### List Coupon (API)

     ● Create a new view to list vendor created coupon
     ● Register View in URL

### Create Coupon (API)

     ● Create new view to get data from frontend and create new coupon
     ● Register View in URL

### Detail Coupon (API)

     ● Create a new view to get vendor single coupon
     ● Register View in URL

### Coupon Stats (API)

     ● Create new view to get coupon stats
     ● Create new Coupon Summary Serializer
     ● Register view in URL

### Coupon List (Client)

     ● Create a new component to list coupon
     ● Fetch coupons via CouponList api endpoint
     ● Set fetched coupon data to state
     ● Render coupons in template

### Coupon Create (Client)

     ● In the coupon list component, create a new modal to create coupon.
     ● Create coupon handle
     ● Create form-data
     ● Post data to coupon create api then fetched updated data

### Coupon delete (Client)

     ● In the coupon list component, create a new handler for coupon delete
     ● Create a delete handler
     ● Send a delete request to the detail view to delete coupon
     ● Fetch updated data

### Coupon Update(Client)

     ● Create a new component for updating coupon.
     ● Get param from url
     ● Make a get request to the coupon detail view
     ● Fetch and set coupon to state
     ● Update the input field with the updated coupon data
     ● Make a patch request to the coupon detail view and fetch updated data

### Notification Unseen (API)

     ● Create a new List View to fetch all vendor unseen notifications
     ● Configure view in URL

### Notification Seen (API)

     ● Create a new List View to fetch all vendor seen notifications
     ● Configure view in URL

### Notification Summary Stats(API)

     ● Create a new List View to fetch all vendor notifications summary
     ● Configure view in URL

### Notification Unseen List (Client)

     ● Create a new component to list notifications
     ● Fetch notifications via NotificationsList api endpoint
     ● Set fetched notifications data to state
     ● Render notifications in template

### Notification Seen List (Client)

     ● Create a new modal to list seen notifications
     ● Fetch notifications via NotificationsList api endpoint
     ● Set fetched notifications data to state
     ● Render notifications in template

### Mark Notification As Seen (API)

     ● Create a new function to mark notification as seen
     ● Make a get request to the endpoint in the server that marks notification as
     seen.
     ● Configure the button that marks notifications as seen.

### Vendor Settings (API )

     ● Create a new function to mark notification as seen
     ● Make a get request to the endpoint in the server that marks notification as
     seen.
     ● Configure the button that marks notifications as seen.
