/* COUNT */
SELECT total-low AS low_null,
       total-high AS high_null,
       total-count_of_date AS date_null
  FROM (
  SELECT COUNT(low) AS low,
         COUNT(high) AS high,
         COUNT(date) AS count_of_date,
         COUNT(1) AS total
    FROM tutorial.aapl_historical_stock_price
  ) AS a
  
/* SUM */
SELECT SUM(open)/COUNT(open) AS avg_open
  FROM tutorial.aapl_historical_stock_price
  
/* MIN/MAX */
SELECT MIN(low) AS min_price,
       MAX(close-open) AS max_increase
  FROM tutorial.aapl_historical_stock_price
  
/* AVG */
SELECT AVG(volume)
  FROM tutorial.aapl_historical_stock_price
  
/* GROUP BY */
SELECT year, month, 
       SUM(volume) AS total_traded
  FROM tutorial.aapl_historical_stock_price
  GROUP BY year, month
  ORDER BY year, month
  
SELECT year,
       AVG(close-open) AS price_change
  FROM tutorial.aapl_historical_stock_price
  GROUP BY 1
  ORDER BY 1
  
SELECT year,
       month,
       MAX(high) AS monthly_high,
       MIN(low)  AS monthly_low
  FROM tutorial.aapl_historical_stock_price
  GROUP BY 1,2
  ORDER BY 1,2

/* HAVING */
SELECT year,
       month,
       MAX(high) AS month_high
  FROM tutorial.aapl_historical_stock_price
  GROUP BY 1, 2
  HAVING MAX(high) > 400
  ORDER BY 1, 2
  
/* DISTINCT */
SELECT DISTINCT year
  FROM tutorial.aapl_historical_stock_price
ORDER BY 1

--- DISTINCT in Aggregation SUM/COUNT .. is SLOW
SELECT COUNT(DISTINCT month) AS count_month
  FROM tutorial.aapl_historical_stock_price
  GROUP BY year

SELECT COUNT(DISTINCT month) AS count_distinct_month,
       COUNT(DISTINCT year) AS count_distinct_year
  FROM tutorial.aapl_historical_stock_price
  
/* CASE */
SELECT player_name,
       state,
       CASE WHEN state = 'CA' THEN 'yes'
            ELSE NULL END AS is_from_ca
  FROM benn.college_football_players
  ORDER BY 3
  
SELECT player_name,
       height,
       CASE WHEN height > 85 THEN 'over 86'
            WHEN height > 80 AND height <= 85 THEN '80-85'
            WHEN height > 70 AND height <= 80 THEN '70-80'
            ELSE '70 or under' END AS height_group
  FROM benn.college_football_players

SELECT *,
       CASE WHEN year = 'JR' OR year = 'SR' THEN player_name
       --- WHEN year IN ('JR', 'SR') THEN 
       END AS junior_or_senior
  FROM benn.college_football_players


SELECT CASE WHEN year = 'FR' THEN 'FR'
            WHEN year = 'SO' THEN 'SO'
            WHEN year = 'JR' THEN 'JR'
            WHEN year = 'SR' THEN 'SR'
            ELSE 'No Year Data' END AS year_group,
            COUNT(1) AS count
  FROM benn.college_football_players
 GROUP BY 1 --- GROUP BY year_group
 
SELECT CASE WHEN state IN ('CA','OR','WA') THEN 'West Coast'
            WHEN state = 'TX' THEN 'Texas'
            ELSE 'Other' END AS region,
            COUNT(1) AS three_hundred_lb_plus_player
  FROM benn.college_football_players
WHERE weight > 300
GROUP BY 1

SELECT CASE WHEN year IN ('FR', 'SO') THEN 'underclass'
            WHEN year IN ('JR', 'SR') THEN 'upperclass'
            ELSE 'No Year Data' END AS year_group,
       SUM(weight) AS combined_weight
  FROM benn.college_football_players
WHERE state = 'CA'
GROUP BY 1

SELECT state,
       COUNT(CASE WHEN year = 'FR' THEN 1 ELSE NULL END) AS fr_count,
       COUNT(CASE WHEN year = 'SO' THEN 1 ELSE NULL END) AS so_count,
       COUNT(CASE WHEN year = 'jr' THEN 1 ELSE NULL END) AS jr_count,
       COUNT(CASE WHEN year = 'sr' THEN 1 ELSE NULL END) AS sr_count,
       COUNT(1) AS total_player
  FROM benn.college_football_players
GROUP BY state
ORDER BY total_player DESC

SELECT CASE WHEN school_name <= 'n' THEN 'A-M'
            WHEN school_name > 'n' THEN 'N-Z'
            ELSE 'Not Recognized School_Name' END AS school_category,
       COUNT(1) AS player_count
  FROM benn.college_football_players
 GROUP BY 1
