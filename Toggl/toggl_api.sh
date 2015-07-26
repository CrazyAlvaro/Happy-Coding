curl -v -u 504b89a4b25d3a12c627d884857c0038:api_token \
  -H "Content-Type:application/json" \
  -d '{"time_entry":{"description":"Automation testing","created_with":"Cision Viralheat Internal API tool", "start":"2015-07-02T10:00:00-07:00","duration":28800,"wid":831391, "pid":9754285}}' \
  -X POST https://www.toggl.com/api/v8/time_entries
