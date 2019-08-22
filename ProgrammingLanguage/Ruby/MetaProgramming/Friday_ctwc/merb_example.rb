class MyController < Merb::Controller
  include Merb::Cache::CacheMixin

  cache :my_action

  def action
  end
end
