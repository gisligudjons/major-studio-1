Hey Yall!

Quantitative Visualization

General:
For this quantitative project. I made a Spiral Graph that showcases the use of Wigs in Portraits in the Smithsonian. 
This Readme file will contain the project info and the story of how I made the visualization.

First:

Tala um Smithsonian

For the first week of classes I made three sketches of three ideas I had that would visualize some quantitative dataset from the Smithsonian. One of those ideas was a funny looking spiral graph of an interesting and niche subject that people seemed to like. 
Picture 1: Shows all of the scetches in a single photp
![IMG_0344](https://user-images.githubusercontent.com/73747671/132769152-e50b12ef-f2bd-423f-bf44-389fe3cee8ac.jpg)
The goal here is to show the use of wigs in a creative timeline manner that also shows the scale of use. Wigs were at one time a sign of wealth and prosperiety, and of social class. A fascinating look at the combination of fashion and class distinction. Spiral Plots like these are versatile way of showing showing fairly large data sets, usually to show trends over a large time period. The data set is not very large, but large enough. About 140 points.

Second:
Making the spiral. The next weeks went mostly towards making the spiral itself. How do I do it? the answer will probably not shock you: A lot of Googling. 

Picture:
<img width="797" alt="Screenshot 2021-09-29 at 23 43 52" src="https://user-images.githubusercontent.com/73747671/135383656-d4d37f96-cff4-4fd0-9aa6-e3ba85fc824a.png">



Third:
The goal of the visualization is to show a timeline of the use of wigs in portraits. The main goal then is to get the date of every picture.
Aquiring the data: Unfortunately or possibly fortunately, most of the data was not stored in the API yet and most of it did not have CCO enabled media. So I made a simple Python Script that simply aquires the data from the Smithsonian collections website, See photo:

Myndin hér:
<img width="950" alt="Screenshot 2021-09-29 at 23 46 51" src="https://user-images.githubusercontent.com/73747671/135383868-a224b01a-924b-44dc-a139-d358ee8129a4.png">


The script exports the data as a CSV file. And with some simple CSV cleaning up I was able to get a CSV file that has 3 columns: Count, Decade, Centuries. But the data needed by the spiral i based my design on needed to be in an JSON file. So I started googling again how I can simply change my csv file to a JSON file. I even asked my Mentor! She simply sent me a link to an CSV to JSON converter and I happily used that. 
Ok, I have my data, I have my spiral, and I have put it together

Fourth:
Making the HTML and CSS and putting it all together.






