########################################
# Intro
########################################
# Structured Query Language: 
# BigQuery: a web service that lets you apply SQL to huge datasets

from google.cloud import bigquery

# Create a "Client" object
client = bigquery.Client()

# Construct a reference to the "hacker_news" dataset
dataset_ref = client.dataset("hacker_news", project="bigquery-public-data")

# API request - fetch the dataset, dataset: a collection of tables
dataset = client.get_dataset(dataset_ref)

# List all the tables in the "hacker_news" dataset
tables = list(client.list_tables(dataset))

for table in tables:
    print(table.table_id)

# construct a reference to the "full" table
table_ref = dataset_ref.table("full")

# API request -fetch the table
table = client.get_table(table_ref)

# Preview the first five lines of the "full" table
client.list_rows(table, max_results=5).to_dataframe()


########################################
# Select, From & Where
########################################
# Query to select all columns where pollution levels are exactly 0
zero_pollution_query = """
                       SELECT *
                       FROM `bigquery-public-data.openaq.global_air_quality`
                       WHERE value = 0
                       """ # Your code goes here

# Set up the query
safe_config = bigquery.QueryJobConfig(maximum_bytes_billed=10**10)
query_job = client.query(zero_pollution_query, job_config=safe_config)

# API request - run the query and return a pandas DataFrame
zero_pollution_results = query_job.to_dataframe() # Your code goes here

print(zero_pollution_results.head())
 
########################################
# GROUP BY
########################################
code_count_query = """
                   SELECT indicator_code, indicator_name, COUNT(1) AS num_rows
                   FROM `bigquery-public-data.world_bank_intl_education.international_education`
                   WHERE year = 2016
                   GROUP BY indicator_code, indicator_name
                   HAVING num_rows >= 175
                   ORDER BY num_rows DESC
                   """

########################################
# AS & With
########################################
# Your code goes here
speeds_query = """
               WITH RelevantRides AS
               (
                   SELECT trip_start_timestamp, trip_miles, trip_seconds
                   FROM `bigquery-public-data.chicago_taxi_trips.taxi_trips`
                   WHERE trip_start_timestamp > '2017-01-01' AND 
                         trip_start_timestamp < '2017-07-01' AND
                         trip_seconds > 0 AND trip_miles > 0
               )
               SELECT EXTRACT(HOUR FROM trip_start_timestamp) AS hour_of_day,
                      COUNT(1) AS num_trips,
                      3600 * SUM(trip_miles) / SUM(trip_seconds) AS avg_mph
               FROM RelevantRides
               GROUP BY hour_of_day
               ORDER BY hour_of_day
               """

# Set up the query
safe_config = bigquery.QueryJobConfig(maximum_bytes_billed=10**10)
speeds_query_job = client.query(speeds_query, safe_config) # Your code here

# API request - run the query, and return a pandas DataFrame
speeds_result = speeds_query_job.to_dataframe() # Your code here

# View results
print(speeds_result)

########################################
# Joining Data
########################################