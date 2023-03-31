# Elanco Farming Dashboard by Group 16
## Database
The farming dashboard relies on a phpMyAdmin database which can be created from farmdb.sql
## Crop Recommendations
The crop recommendations work by taking a _**start date**_ and for each crop, 
it looks at all the plot data _from that start date to the date when that crop will have finished growing._
For each data point which is out of the ideal range for that crop, a counter is incremented, 
and after checking all the dates in the range needed, the _rating for that crop is calculated by 
dividing the value on the counter by the crop's growth time._

**Crops with a lower rating are better.**

It makes the assumption that future years will follow the same trends as 2022.
## Technologies Used
The project uses vanilla css and javascript, except for the use of [Chart.js](https://www.chartjs.org/) for graphing.

