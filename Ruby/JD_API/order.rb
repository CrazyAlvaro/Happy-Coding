require 'net/http'
require 'json'
require 'date'
require 'digest'

SERVER_URL = "https://api.jd.com/routerjson"
APP_KEY = "E41255F1EB89F91FFCEB53AF6A60EB71"
APP_SECRET = "9b291f75876d4cf1a90d814980b74795"
ACCESSOR_TOKEN = "5b07ef06-98e9-46bc-85c5-745d46386a58"
VERSION = "2.0"

class Order
  # attr_accessor :method, :accessor_token, :app_key, :timestamp, :v,
  # attr_accessor :360buy_param_json

  ###############################
  # Initialize
  #
  ###############################
  def initialize
    @params = Hash.new

    init_system_param
    init_app_param

    uri = self.construct_uri

    res = self.send_request("#{SERVER_URL}?#{uri}")

    # Headers
    res['Set-Cookie']            # => String
    res.get_fields('set-cookie') # => Array
    res.to_hash['set-cookie']    # => Array
    puts "Headers: #{res.to_hash.inspect}"

    # Status
    puts res.code       # => '200'
    puts res.message    # => 'OK'
    puts res.class.name # => 'HTTPOK'

    # Body
    # puts res.methods.grep(/^b/)
    puts res.body if res.is_a?(Net::HTTPSuccess)
  end

  def init_system_param
    @params["method"] = "360buy.order.search"
    @params["timestamp"] = Time.now.strftime("%Y-%m-%d %H:%M:%S")
    @params["access_token"] = ACCESSOR_TOKEN
    @params["app_key"] = APP_KEY
    @params["v"] = VERSION
  end

  def init_app_param
    app_param = Hash.new

    app_param["page"] = 1
    app_param["page_size"] = 20
    app_param["start_date"] = "2015-06-01 12:00:00"
    app_param["end_date"] = "2016-06-01 12:00:00"
    app_param["order_state"] = "FINISHED_L"
    app_param["optional_fields"] = "vender_id"

    @params["360buy_param_json"] = JSON.generate(app_param)
  end

  ###############################
  # Class Methods
  #
  ###############################
  def construct_uri
    parameters = @params.sort.map do |key_value|
      "#{key_value[0]}=#{key_value[1]}"
    end

    # Concate to uri
    uri = parameters.reduce do |uri_str, param|
      uri_str = "#{uri_str}&#{param}"
    end
    #puts "uri: #{uri}"

    sign_params = parameters.reduce(:+)
    sign_params = APP_SECRET + sign_params + APP_SECRET

    # Get MD5 sign
    sign = Digest::MD5.hexdigest(sign_params).upcase!
    # puts "sign: #{sign}"

    "#{uri}&sign=#{sign}"
  end

  def send_request(url)
    encoded_url = URI.encode(url)
    puts "\nEncoded url: #{encoded_url}"
    uri = URI.parse(encoded_url)
    puts "\n parsed url: #{uri}"
    puts "\n ==? #{encoded_url == uri}"
    puts "\n eql? #{encoded_url.eql?(uri)}"


    res = Net::HTTP.get_response(uri)

    res
  end
end

inst = Order.new
