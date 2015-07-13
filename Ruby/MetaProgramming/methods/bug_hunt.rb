###############################################################################
#
# method_missing
#
###############################################################################


class Roulette
  def method_missing(name, *args)
    person = name.to_s.capitalize
    #whitespace separated array, also avoid infinite calling Roulette.method_missing
    super unless %w[Bob Frank Bill].include? person
    #number = 0  #cause infinite loop calling method_missing if not defined here
    3.times do
      number = rand(10) + 1
      puts "#{number}..."
    end
    "#{person} got a #{number}"
  end
end

number_of = Roulette.new
puts number_of.Frank
