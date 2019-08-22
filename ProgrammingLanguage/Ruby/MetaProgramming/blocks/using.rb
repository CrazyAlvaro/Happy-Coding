module Kernel
  def using(resource)
    begin
      yield
    ensure
      # Have to ensure this resource.dispose get running
      resource.dispose
    end
  end
end
