require 'activerecord'
ActiveRecord::Base # autoload all modules

#class MyClass
#  def save; end
#  def save!; end
#  def new_record?; true; end
#
#  include ActiveRecord::Validations
#
#  attr_accessor :attr
#  validates_length_of :attr, :minimun => 4
#end
#
#obj = MyClass.new
#obj.attr = 'test'
#obj.valid?
#obj.attr = 'tst'
#obj.valid?
