# Smart Thumbnails LWC - Version 1.0

This is basically a nice looking Selectable Items Component with a flip side card to display additional details.

The _SmartThumbnails_ bundle is the one that will show up as a LWC Component inside the Vlocity Omniscript Designer components palette.

The _SmartThumbnail_ bundle is the child called by the SmartThumbnails and it won't display inside the Vlocity Omniscript Designer components palette.

1. This version can only be used within an Omniscript
2. It takes a json array as its main input (see below)
3. The selected item(s) are saved in the data json of the Omniscript
4. It supports the following customization:

   + Single or Multiple selection Mode
   + SLDS icons
   + Container Card Border (e.g. Parent Card of the child Thumbnails)
   + Container Card Title

5. Here is the json array for the input; and the fields label need to match that structure
```
   "whateverNodeNameHere": [
      {
         "id": 1,
         "title": "10-12-2020",
         "subtitle": "09:30",
         "detail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
         "id": 2,
         "title": "11-12-2020",
         "subtitle": "16:00",
         "detail": "Cras eget sem at turpis congue gravida leo."
      }
   ]
```
# Next to come

   + Possibility to add specific images for each item of the json array instead of a unique SLDS Icon
   + Possibility to specify the look and feel
   + Possibility to specify between Horizontal or Vertical Layout
   + Possibility to embbed this component within a Vlocity Card
