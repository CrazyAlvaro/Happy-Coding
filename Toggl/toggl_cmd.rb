require 'net/http'
require 'curb'
require 'json'
require 'date'


# Authentication:
# * curl -v -u yechen.huang@cision.com:881108 -X GET https://www.toggl.com/api/v8/me
# * curl -v -u 504b89a4b25d3a12c627d884857c0038:api_token -X GET https://www.toggl.com/api/v8/me

# Create time entry
# curl -v -u 504b89a4b25d3a12c627d884857c0038:api_token \
#   -H "Content-Type:application/json" \
#   -d '{"time_entry":{"description":"Automation testing","created_with":"Cision Viralheat Internal API tool", "start":"2015-07-02T10:00:00-07:00","duration":28800,"wid":831391, "pid":9754285}}' \
#   -X POST https://www.toggl.com/api/v8/time_entries

#########################################
#
# User configuration
#
#########################################

# For authentication, have email,passwd/api_token
# api_token can be found at bottom of "My Profile"
EMAIL = "yechen.huang@cision.com"
PASSWORD =  ""

API_TOKEN = "504b89a4b25d3a12c627d884857c0038"

# Format: 2015-07-01
START_DATE = "2015-07-01"
END_DATE = "2015-07-10"

# Format: 12:23:33 (hour:min:sec)
# Currently only support 8 hours a day
TIMER_START = "10:00:00"
#TIMER_END   = "18:00:00"

# Each Time Entry's name
DESCRIPTION = "Automation Testing Inplementation"


#################################################################################
#
# Pre_configuration
# Please be cautious exit this part unless you know what you are doing
#
#################################################################################

# Project: Viralheat
VIRALHEAT_PROJECT_ID = "9754285"

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

# Check if there's already entry in that day
def check_day_entry_exist
  #TODO
end

def perform_entries
  days = parse_date_range
  for day in days
  end
  generate_entry(days[0])
end

def generate_entry(day)
  # execute only if no timer entry on that day
  return if check_day_entry_exist(day)?
  curl_action = Curl::Easy::http_post(
    "https://www.toggl.com/api/v8/time_entries",
    "{\"time_entry\":{\"description\":\"#{DESCRIPTION}\",\"created_with\":\"Cision Viralheat Internal API tool\", \"start\":\"#{day}T#{TIMER_START}-07:00\",\"duration\":28800,\"wid\":831391, \"pid\":#{VIRALHEAT_PROJECT_ID}}}"
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
    #break
  end
end

# Example

#authenticate_user
#parse_date_range
#generate_entry
#perform_entries
generate_entry("2015-06-29")
