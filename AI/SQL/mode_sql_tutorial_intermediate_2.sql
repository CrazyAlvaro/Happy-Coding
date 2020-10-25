/* SQL Joins */
SELECT pl.school_name, pl.player_name, pl.position, pl.weight
  FROM benn.college_football_players pl
  WHERE pl.state = 'GA'
 ORDER BY pl.weight DESC
 
/* INNER JOIN */
SELECT pl.player_name, pl.school_name, tm.conference
  FROM benn.college_football_players pl 
  JOIN benn.college_football_teams tm 
    ON pl.school_name = tm.school_name
  WHERE tm.division = 'FBS (Division I-A Teams)'
  
/* OUTER JOIN */

/* LEFT JOIN */
--- Tutorial
SELECT companies.permalink AS companies_permalink,
       companies.name AS companies_name,
       acquisitions.company_permalink AS acquisitions_permalink,
       acquisitions.acquired_at AS acquired_date
  FROM tutorial.crunchbase_companies companies
  JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
--- INNER JOIN 只要符合条件 就返回，所以即使有多条记录也无所谓

SELECT companies.permalink AS companies_permalink,
       companies.name AS companies_name,
       acquisitions.company_permalink AS acquisitions_permalink,
       acquisitions.acquired_at AS acquired_date
  FROM tutorial.crunchbase_companies companies
  LEFT JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
--- FROM A LEFT JOIN B, contains ALL A and matched B !!!
--- SO Acquisitions_permalink could be NULL

SELECT COUNT(companies.permalink) AS companies_rowcount,
       COUNT(acquisitions.company_permalink) AS acquisition_rowcount
  FROM tutorial.crunchbase_companies companies
  JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
    
SELECT COUNT(companies.permalink) AS companies_rowcount,
       COUNT(acquisitions.company_permalink) AS acquisition_rowcount
  FROM tutorial.crunchbase_companies companies
  LEFT JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink

SELECT companies.state_code AS state,
       COUNT(DISTINCT companies.permalink) AS company_count,
       COUNT(DISTINCT acquisitions.company_permalink) AS acquied_count
  FROM tutorial.crunchbase_companies companies
  LEFT JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
 WHERE companies.state_code IS NOT NULL ---AND acquisitions.company_state_code IS NOT NULL
 GROUP BY 1
 ORDER BY 3 DESC
 
/* RIGHT JOIN */
SELECT companies.state_code AS state,
       COUNT(DISTINCT companies.permalink) AS company_count,
       COUNT(DISTINCT acquisitions.company_permalink) AS acquied_count
  FROM tutorial.crunchbase_acquisitions acquisitions
  RIGHT JOIN tutorial.crunchbase_companies companies
    ON companies.permalink = acquisitions.company_permalink
 WHERE companies.state_code IS NOT NULL ---AND acquisitions.company_state_code IS NOT NULL
 GROUP BY 1
 ORDER BY 3 DESC
 
/* SQL JOINS Using WHERE or ON */
SELECT companies.permalink AS companies_permalink,
       companies.name AS companies_name,
       acquisitions.company_permalink AS acquisitions_permalink,
       acquisitions.acquired_at AS acquired_date
  FROM tutorial.crunchbase_companies companies
  LEFT JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
   AND acquisitions.company_permalink != '/company/1000memories'
 ORDER BY 1
 
 --- AND acquisitions.company_permalink !='...' is evaluated before JOIN 
 
SELECT companies.permalink AS companies_permalink,
       companies.name AS companies_name,
       acquisitions.company_permalink AS acquisitions_permalink,
       acquisitions.acquired_at AS acquired_date
  FROM tutorial.crunchbase_companies companies
  LEFT JOIN tutorial.crunchbase_acquisitions acquisitions
    ON companies.permalink = acquisitions.company_permalink
 WHERE acquisitions.company_permalink != '/company/1000memories'
    OR acquisitions.company_permalink IS NULL
 ORDER BY 1
 
 --- WHERE is evaluated after JOIN 
 
 --- PRACTICE PROBLEM
SELECT cpny.name AS companies_name,
        cpny.status AS companies_status,
        COUNT(DISTINCT invst.investor_name) AS unique_investors_num
  FROM  tutorial.crunchbase_companies cpny
  LEFT JOIN tutorial.crunchbase_investments invst 
    ON cpny.permalink = invst.company_permalink
 WHERE cpny.state_code = 'NY'
 GROUP BY 1, 2
 ORDER BY 3 DESC
 
--- cpny.state_code = 'NY' "IN WHERE" is much faster than in "AND cpny.state_code = 'NY'"
--- WHY??? Planner choose different routes, AND may filter first which cost a lot, 
--- While WHERE filter after join

SELECT CASE WHEN invst.investor_name IS NULL THEN 'NO INVESTOR'
            ELSE invst.investor_name END AS investor,
       COUNT(DISTINCT cpny.permalink) AS number_companies
  FROM tutorial.crunchbase_companies cpny
  LEFT JOIN tutorial.crunchbase_investments invst 
    ON cpny.permalink = invst.company_permalink
  GROUP BY 1
  ORDER BY 2 DESC

/* FULL OUTER JOIN */

--- PRACTICE ---
SELECT COUNT(CASE WHEN cp.permalink IS NOT NULL AND acq.company_permalink IS NULL
                  THEN cp.permalink ELSE NULL END) AS company_only,
       COUNT(CASE WHEN cp.permalink IS NOT NULL AND acq.company_permalink IS NOT NULL
                  THEN cp.permalink ELSE NULL END) AS both,
       COUNT(CASE WHEN cp.permalink IS NULL AND acq.company_permalink IS NOT NULL
                  THEN acq.company_permalink ELSE NULL END) AS acquisition_only
  FROM tutorial.crunchbase_companies cp
  FULL JOIN tutorial.crunchbase_acquisitions acq 
    ON cp.permalink = acq.company_permalink

/* UNION */
SELECT *
  FROM tutorial.crunchbase_investments_part1

 UNION (ALL)

 SELECT *
   FROM tutorial.crunchbase_investments_part2
   
--- UNION ALL to include all duplicated data 

--- Strict Rule, 1 same number of coluns 2 must have same data types
--- While column name don't have to be the same

--- PRACTICE
SELECT company_permalink,
       company_name,
       investor_name
  FROM tutorial.crunchbase_investments_part1
 WHERE company_name ILIKE 'T%'

 UNION ALL

 SELECT company_permalink,
        company_name,
        investor_name
   FROM tutorial.crunchbase_investments_part2
  WHERE company_name ILIKE 'M%' 

--- 2
SELECT 'P1' AS part,
       cc.status,
       COUNT(DISTINCT p1.investor_name) AS investor_count
  FROM tutorial.crunchbase_companies cc
  LEFT JOIN  tutorial.crunchbase_investments_part1 p1
   ON p1.company_permalink = cc.permalink
  GROUP BY part, status
   
 UNION ALL

 SELECT 'P2' AS part,
        cc.status,
        COUNT(DISTINCT p2.investor_name) AS investor_count
   FROM tutorial.crunchbase_companies cc 
   LEFT JOIN tutorial.crunchbase_investments_part2 p2
    ON p2.company_permalink = cc.permalink
   GROUP BY part, status
   
/* JOIN with Comparison Operators */

/* Joins on Multiple Keys */
--- Run Faster

/* Self Joins */
SELECT DISTINCT japan_investments.company_name,
       japan_investments.company_permalink
  FROM tutorial.crunchbase_investments_part1 japan_investments
  JOIN tutorial.crunchbase_investments_part1 gb_investments
    ON japan_investments.company_name = gb_investments.company_name
   AND gb_investments.investor_country_code = 'GBR'
   AND gb_investments.funded_at > japan_investments.funded_at
 WHERE japan_investments.investor_country_code = 'JPN'
 ORDER BY 1
 -- receive investment from Great Britain following an investment from Japan
 
