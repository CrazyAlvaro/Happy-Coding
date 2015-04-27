require 'dalli'

class Cache

  SHARDS = ["192.168.8.52", "192.168.8.53", "192.168.8.54", "192.168.8.55", "192.168.8.56", "192.168.8.57", "192.168.8.58", "192.168.8.59"]

  def initialize()
    @cache = Dalli::Client.new(random_address(), :socket_timeout => 5)
  end

  def get(key)
    return @cache.get(key, :raw => true)
  end

  def get_multi(keys)
    return @cache.get_multi(keys, :raw => true)
  end

  def set(key, string)
    @cache.set(key, string, 0, :raw => true)
  end

  def get_time(key)
    value = get(key)
    time = nil
    if (!value .nil?)
      time = Time.at_utc(value.to_i)
    end
    return time
  end

  def set_time(key, time)
    set(key, time.to_i.to_s)
  end

  private

  def random_address()
    return SHARDS[rand(SHARDS.size())] + ":11214"
  end

end
