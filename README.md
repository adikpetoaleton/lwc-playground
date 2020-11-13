# Smart Thumbnail LWC (Selectable Items)

1. This version can only be used within an Omniscript
2. It takes a json array as its main input (see below)
3. The selected item(s) are saved in the data json of the Omniscript
4. It supports the following customization:

   + Single or Multiple selection Mode
   + SLDS icons (specific images to come in a future version)
   + Container Card Border (e.g. Parent Card of the child Thumbnails)
   + Container Card Title

**Here is the json array for the input; and the fields label need to match that structure:**
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
