
def event(name, &block)
  @events[name] = block
end

def setup(&block)
  # another way @setups << block
  @setups.push(block)
end

Dir.glob('*events.rb').each {|file|
  # reset hash and array each time load a file
  @events = Hash.new    # @events = {}
  @setups = Array.new   # @setups = []
  load file
  @events.each{|key, event_proc|
    @setups.each {|setup_proc|
      setup_proc.call
    }
    puts "ALERT: #{key}" if event_proc.call
  }
}

# book's solution
puts "\n=========== Book's Solution ==============\n\n"
Dir.glob('*events.rb').each do |file|
  @setups = []
  @events = {}
  load file
  @events.each_pair do |name, event|
    env = Object.new
    @setups.each do |setup|
      env.instance_eval &setup
    end
    puts "ALERT: #{name}" if env.instance_eval &event
  end
end
