
class User
  attr_accessor :name, :pet_name
end

class Post
end

module Smokestack
  @registry = {}

  def self.registry
    @registry
  end

  def self.define(&blcok)
    definition_proxy = DefinitionProxy.new
    definition_proxy.instance_eval(&block)
  end

  def self.build(factory_class, ovverides = {})
    instance = factory_class.new

    # Set attributes on the uesr
    factory = registry[factory_class]
    attributes = factory.attributes.merge(ovverides)

  class Factory < BasicObject
    def initialize
      @attributes = {}
    end

    attr_reader :attributes

    def method_missing(name, *args, &block)
      attributes[name] = args[0]
    end
  end

  class DefinitionProxy
    def factory(factory_class, &block)
      factory = Factory.new
      if block_given?
        factory.instance_eval(&block)
      end
      Smokestack.registry[factory_class] = factory
      #factory = lambda { puts "OK, defining a #{factory_class} factory." }
    end
  end

  definition_proxy = DefinitionProxy.new

  definition_proxy.instance_eval do
    factory User
    factory Post
  end
end

Smokestack.define do
  factory(User) do
    name("Gabe B-W")
    pet_name("Toto")
  end
end
