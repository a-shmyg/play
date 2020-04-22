# PLAY Text Adventure Game

Website for PLAY text adventure game engine, in the style of retro 80's nerds.

<center><b> Grades estimated based on current work. </center></b>

<b> HTML : C </b>

We tried to include the XHTML tag, however after using Handlebars it does not seem to be validating. However, we also have experienced a number of issues (inlcuding the addition of semantic tags instead of div) and are highly confident in the structure of HTML pages. 
     In order to move our HTML grade to an A, we will investigate the issues with the HXTML delivery. 

<b> CSS : B </b> 

We have ensured that there are no style tags and attributs in our HTML pages, and have gained a high level of experience with stylesheets. There are some bad relative measurements, currently in px measurements, which will be changed to make it responsive.  By doing so, as we are confident with CSS style, we expect this to bring our grade to an A. 

<b> JS : B </b>

We have written a large amount of script ourselves, including the routes script and database callbacks. The slider script was self written, main issue with that was timing as javascript does not have native sleep() function. For our random quote generator, we will add a text file to pull quotes from, as we currently change it from HTMLinner method which is unsafe. We are also planning on creating a demo for our game, written ourselves in javascript. We expect this will bring us to an A. 

<b> PNG : A </b>

We have used a number of tools including filters, changing colours, and creating shapes as well as the use of layers and transparency, and the creatioin of original artwork. The main background and title fonts are all original artwork created in gimp. Following steps to reproduce:

Pexels.com for a large resolution Creative Commons license (no attribution required for personal or commercial purposes) as the space background. 3 groups of layers created, one for font, one for grid, one for background.
Grid group:
Generate a grid render.
Use perspective tool to stretch it out as if going into the distance.
Neon filter with drop shadow to create the glowing effect.
Create a horizonal path using path tool. 
Stroke path, 20px, same neon filter to create the glow.

Duplicate and rotate those two layers to make the above grid as well.

Background group:
Create a custom purple gradient.
Set the layer type to Soft Light.
This makes sure the light bleeds through and the dark is dyed purple.

Font group:
Download free for personal use 80's style font.
Create two transparent layers
Create a mask on the top layer and bottom layers for highlights, one opacity one transparency.
Set layer types to overlay.
Create two black->white gradients, due to mask this will create a highlights and shadows. 
Create another layer, set to HSV Value (to "dye" the font underneath).
Add custom linear gradient with different colours to give 80's effect.
Make a new layer group so border does not interefere with text.
Select by colour tool on the font, create a new layer.
Stroke by select on that layer to create a border.
Neon effect on border, add another metallic gradient layer and set to multiply.

Over top of everything add layer with wide radial black->transparent gradient.
This creates a soft vignette and adds more focus into the centre. 

<b> SVG : X </b>

<b> SERVER : C </b>

Our server has currently been set up by following a tutorial to set up express. We have been looking in to https and certificates as well as other issues, and will also deal with port numbers/URL validation/content negotiation and redirections to bring our grade up to an A. 

<b> DATABASE : C </b> 

We have currently written some of the callbacks for inserting and updating the data in our database, and have manually created our database as well. We update user details when they create an account, and update data based on the products that they buy. We also plan to organise our database access in to a separate server-side module to bring our grade up to an A. To prevent constructing an explicit SQL string and making vulnerable to SQL injection, we will update the way we insert data.

<b> DYNAMIC PAGES : C </b>

We have delivered dynamic pages by inserting data into templates on the server side, and have currently created a simple dynamic delivery system. We are using the handlebars templating engine to dynamically serve our HTML pages. We plan to do more of our own programming to organise it better and remove the redundancy of the headers, as we have spent a lot of time researching this we expect this will bring our grade up to an A.
