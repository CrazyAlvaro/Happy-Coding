########################################
# Creating, Reading and Writing
########################################
import pandas as pd
import sqlite3

fruits = pd.DataFrame(data={"Apples": 30, "Bananas": 21},index=[0]) 

fruit_sales = pd.DataFrame([[35,21],[41,34]], index=["2017 Sales", "2018 Sales"], columns=["Apples", "Bananas"])

reviews = pd.read_csv(file, index_col=0)

animals.to_csv("cows_and_goats.csv")

conn = sqlite3.connect('../input/pitchfork-data/database.sqlite')

music_reviews = pd.read_sql_query("SELECT reviewid, artist FROM artists;", conn)

########################################
# Indexing, Selecting And Assigning
########################################
reviews = pd.read_csv("path")
reviews.loc[0:99, ["country", "variaty"]]
reviews.loc[reviews.country == "Italy"]
reviews.loc[reviews.country.isin(["Australia"]) & (reviews.points > 90)]

########################################
# Summary functions and maps workbook
########################################
reviews.points.median()
reviews.points.unique()

# Return counts of unique values 
reviews.country.value_counts()
reviews.price - reviews.price.mean() # standardize

# return the row label of the maximun value
idx = (reviews.points/reviews.price).idxmax
reviews.loc[idx, 'title']

# Count the tropical/fruity occurence in description, then construct a Series
t_count = reviews.description.map(lambda desc: "tropical" in desc).sum()
f_count = reviews.description.map(lambda desc: "fruity" in desc).sum()
pd.Series([t_count, f_count], index=["tropical", "fruity"])

def to_star(row):
    points = row["points"]
    if row["country"] == "Canada":
        return 3
    elif points >= 95:
        return 3
    elif points >= 85:
        return 2
    else:
        return 1

star_ratings = reviews.apply(to_star, axis="columns")

########################################
# Grouping and Sorting
########################################

# Get each group's size
reviews.groupby("taster_twitter_handle").size()

# Get each price group's max points, sort by price
reviews.groupby("price")["points"].max().sort_index()

# Get each variety group's price aggregate by min and max
reviews.groupby("variety").price.agg(["min", "max"])
# Sort by min then max to break ties in Descending order
reviews.groupby("variety").price.agg(["min", "max"]).sort_values(by=["min", "max"], ascending=False)

# Get each taster's mean points
reviews.groupby("taster_name").points.mean()

# Get each country's variety's size, sort in Descending order
reviews.groupby(["country", "variety"]).size().sort_values(ascending=False)


########################################
# Data types and missing data reference
########################################
reviews.price.dtype
reviews.dtypes

# As data type
reviews.points.astype('float64')

# Missing data
reviews[reviews.country.isnull()]
reviews.region_2.fillna("Unknown")

reviews.taster_twitter_handle.replace("A","B")

########################################
# Renaming and combining
########################################
reviews.shape
reviews.rename(columns={"A": "A_new", "B":"B_new"})

reviews.rename_axis("wines", axis="rows")

# append two dataframe
reviews.append(reviews)

# join two dataframes
df.merge 
df.join