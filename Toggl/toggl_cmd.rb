require 'net/http'
require 'curb'
require 'json'
require 'date'
require 'uri'

####################################################################################################
# Example
#
#require 'net/http'
#require 'JSON'
#
#wsid = # your workspace id
#api_token = #your api token
#
#uri = URI("https://toggl.com/reports/api/v2/weekly?workspace_id=#{wsid}&since=2014-03-01&until=2014-03-05&user_agent=api_example_test")
#
#req = Net::HTTP::Get.new(uri)
#req.basic_auth api_token, 'api_token'
#
#http = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true)
#resp = http.request(req)
#
#puts resp.body
#puts JSON.parse(resp.body)
#
# End Example
####################################################################################################


# Authentication:
# * curl -v -u yechen.huang@cision.com:881108 -X GET https://www.toggl.com/api/v8/me
# * curl -v -u 504b89a4b25d3a12c627d884857c0038:api_token -X GET https://www.toggl.com/api/v8/me

# Create time entry
# curl -v -u 504b89a4b25d3a12c627d884857c0038:api_token \
#   -H "Content-Type:application/json" \
#   -d '{"time_entry":{"description":"Automation testing","created_with":"Cision Viralheat Internal API tool", "start":"2015-07-02T10:00:00-07:00","duration":28800,"wid":831391, "pid":9754285}}' \
#   -X POST https://www.toggl.com/api/v8/time_entries

####################################################################################################
#
# User configuration
#
####################################################################################################

# For authentication, have email,passwd/api_token
# api_token can be found at bottom of "My Profile"
EMAIL = "yechen.huang@cision.com"
PASSWORD =  ""

API_TOKEN = "504b89a4b25d3a12c627d884857c0038"

# Format: 2015-07-01
START_DATE = "2015-07-31"
END_DATE = "2015-08-04"

# Format: 12:23:33 (hour:min:sec)
# Currently only support 8 hours a day
TIMER_START = "10:00:00"
#TIMER_END   = "18:00:00"

# Each Time Entry's name
DESCRIPTION = "Automated Testing"


#################################################################################
#
# Pre_configuration
# Please be cautious to edit this part unless you know what you are doing
#
#################################################################################

# Project: Viralheat
VIRALHEAT_PROJECT_ID = "9754285"
WORKSPACE_ID = "831391"

def authenticate_user
  curl_action = Curl::Easy::new("https://www.toggl.com/api/v8/me")
  curl_action.http_auth_types = :basic

  curl_action.username = API_TOKEN
  curl_action.password = "api_token"

  curl_action.username = EMAIL
  #curl_action.password = PASSWORD

  curl_action.perform

  if(curl_action.response_code == 200 )
    json_response = JSON.parse(curl_action.body_str)
    puts JSON.pretty_generate(json_response)
  else
    puts "Authentication Failed"
    puts curl_action.header_str
  end
end

# Retrieve START_DATE and END_DATE
# Return all weekdays between the two
def parse_date_range
  start_day = Date.parse(START_DATE)
  end_day = Date.parse(END_DATE)
  days = []
  current_day = start_day
  while current_day < end_day do
    if current_day.saturday? or current_day.sunday?
      current_day = current_day.next_day
      next
    else
      days.push(current_day)
      current_day = current_day.next_day
    end
  end
  puts days
  days
end

def perform_entries
  days = parse_date_range
  puts "Totaly need processing: #{days}"
  for date in days
    generate_entry(date) unless entry_exist?(date)
  end
end

def generate_entry(date)
  puts "processing current date: #{date}"
  curl_action = Curl::Easy::http_post(
    "https://www.toggl.com/api/v8/time_entries",
    "{\"time_entry\":{\"description\":\"#{DESCRIPTION}\",\"created_with\":\"Cision Viralheat Internal API tool\", \"start\":\"#{date}T#{TIMER_START}-07:00\",\"duration\":28800,\"wid\":#{WORKSPACE_ID}, \"pid\":#{VIRALHEAT_PROJECT_ID}}}"
  ) do |curl|
    curl.http_auth_types = :basic
    curl.username = API_TOKEN
    curl.password = "api_token"
    curl.headers['Content-Type'] = "application/json"
  end


  if(curl_action.response_code == 200 )
    json_response = JSON.parse(curl_action.body_str)
    puts JSON.pretty_generate(json_response)
  else
    puts "Failed with entry creation"
    puts curl_action.header_str
  end
end

#curl -v -u 1971800d4d82861d8f2c1651fea4d212:api_token  -X GET "https://www.toggl.com/api/v8/time_entries?start_date=2013-03-10T15%3A42%3A46%2B02%3A00&end_date=2013-03-12T15%3A42%3A46%2B02%3A00"
def entry_exist?(date)
  start_date = date
  end_date = date + 1

  puts "Start: #{start_date} End: #{end_date}"

  curl_action = Curl::Easy::http_get(
    "https://www.toggl.com/api/v8/time_entries?start_date=#{start_date}T00%3A00%3A00%2D07%3A00&end_date=#{end_date}T00%3A00%3A00%2D70%3A00"
  ) do |curl|
    curl.http_auth_types = :basic
    curl.username = API_TOKEN
    curl.password = "api_token"
    curl.headers['Content-Type'] = "application/json"
  end

  if(curl_action.response_code == 200 )
    json_response = JSON.parse(curl_action.body_str)
    puts JSON.pretty_generate(json_response)
    puts "json value size: #{json_response.length}"
  else
    puts "Failed with get entry information"
    puts curl_action.header_str
  end

  json_response.length > 0
end

def get_user_id
  curl_action = Curl::Easy::http_get(
    "https://www.toggl.com/api/v8/me",
  ) do |curl|
    curl.http_auth_types = :basic
    curl.username = API_TOKEN
    curl.password = "api_token"
    curl.headers['Content-Type'] = "application/json"
  end

  #TODO: store to instance variable @user_info
  if(curl_action.response_code == 200 )
    json_response = JSON.parse(curl_action.body_str)
    puts json_response["data"]["id"]
    #puts JSON.pretty_generate(json_response)
    json_response["data"]["id"].to_i
  else
    puts "Failed with get user information"
    puts curl_action.header_str
  end
end

# Example

#authenticate_user
#parse_date_range
#generate_entry
#generate_entry("2015-06-29")

perform_entries
